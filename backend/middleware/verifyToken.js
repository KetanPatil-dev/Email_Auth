import jwt from "jsonwebtoken"

export const verifyToken= (req,res,next)=>{
    const token= req.cookies.token
    if(!token ) return res.status(400).json({success:false,message:"Unauthorized-no token Provided"})
        try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.userId=decoded.userId;
    next()
            
        } catch (error) {
            console.error("ERROR",error)
        }
}