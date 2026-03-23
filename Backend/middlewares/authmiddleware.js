import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    try {
        const {token}=req.cookies;
        if(!token){
            return res.json({success:false,message:"Not Authorized,login again"})
        }

        // 2. Verify token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.userId=tokenDecode.id;
        }else{
            return res.json({success:false,message:"Not Authorized"})
        }

        next();
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
    })}
}
