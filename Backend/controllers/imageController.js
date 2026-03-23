import userModel from "../models/userModel.js";
import FormData from 'form-data'
import axios from 'axios'

export const generateImage=async(req,res)=>{
    try {
        const userId=req.userId;
        const {prompt}=req.body

        const user= await userModel.findById(userId)
        if(!user || !prompt){
            return res.json({success:false,message:"missing details"})
        }
        if (user.creditBalance === 0 || user.creditBalance < 0){
            return res.json({success:false,message:"No credit balance",creditBalance:user.creditBalance})
        }

        const formData=new FormData()
        formData.append('prompt',prompt)
        const {data}= await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                     ...formData.getHeaders()
                },    
                responseType:'arraybuffer'
            }
        )

        const base64Img=Buffer.from(data,'binary').toString('base64')
        const resultImage=`data:image/png;base64,${base64Img}`

        await userModel.findByIdAndUpdate(userId,{creditBalance:user.creditBalance-1})

        res.json({success:true,message:"Image generated successfully",creditBalance:user.creditBalance-1,image:resultImage})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}