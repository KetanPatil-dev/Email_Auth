import jwt from "jsonwebtoken"

export const VerifiyToken=async(req ,res,next)=>{
    try {
        const token= req.cookies.token
        if(!token) return res.status(401).json("Invalid Token")

            const decoded= jwt.verify(token,process.env.JWT_SECRET)
            if(!decoded) return res.status(401).json("Invalid Token")
        console.log(decoded)
        req.userId=decoded.userId
        next()
    } catch (error) {
       console.log("Verify Token",error) 
    }
}