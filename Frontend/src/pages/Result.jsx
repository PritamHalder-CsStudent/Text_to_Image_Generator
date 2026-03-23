import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'
import { AppContext } from '../context/AppContext'

const Result = () => {

  const [image,setImage]=useState(assets.sample_img_1)
  const [isImageloaded, setIsImageLoaded]=useState(false)
  const [isloading,setIsLoading]=useState(false)
  const [input,setInput]=useState("")
  const {generateImage}=useContext(AppContext)

  const submitHandeler=async(e)=>{
    e.preventDefault()
    setIsLoading(true)
    if(input){
      const image=await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }
    }

    setIsLoading(false)

  }

  return (
    <motion.form 
      initial={{opacity:0.2 ,y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}

    onSubmit={submitHandeler}   
    className='flex flex-col min-h-[90vh] justify-center items-center'>
      <div>
        <div className='relative'>
          <img src={image} width={300} alt="" className='max-w-sm-rounded' />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500
          ${isloading ?' w-full transition-all duration-[10s]' : 'w-0' }`}/>
        </div>
        { isloading ?
        <p className='text-gray-500'>Loading.....</p>
        :
        <p></p>
        }
      </div>
      {!isImageloaded &&
      <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>
        <input type="text" onChange={(e)=>setInput(e.target.value)}   value={input}    placeholder='Describe what you want to generate' 
        className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20'/>
        <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full '>Generate</button>
      </div>
      }

      {isImageloaded&&
      <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
        <p onClick={()=>setIsImageLoaded(false)}
        className='bg-transparent border border-zinc-900 px-10 py-3 
         text-black rounded-full cursor-pointer'>Generate Another </p>
        <a download className='bg-zinc-900 px-10 py-3 rounded-full' href={image}>Download</a>
      </div>
      }
    </motion.form>


  )
}

export default Result
