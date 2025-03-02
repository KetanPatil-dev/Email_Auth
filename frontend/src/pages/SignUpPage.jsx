
import { motion } from "framer-motion"
import Input from "../component/Input"

import { useState } from "react"
import { Lock, Mail, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth.store.js"

const SignUpPage = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate();
    const {signup}=useAuthStore()
    const handleSignUp=async(e)=>{
        e.preventDefault();
        try{
            await signup(email,password,name)
            console.log(signup)
       
            navigate("/verify-email");
        } catch(error){
            console.log(error)
        }
    }
    
  return (
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:20}}
    transition={{duration:0.5}}
    className="max-w-md w-full bg-gray-800 
    bg-opacity-50 backdrop-filter backfrop-blur-x1 
    rounded-2x1 shadow-x1 overflow-hidden"
    >
        <div className="p-8">
            <h2 className="text-3x1 font-bold mb-6 text-center 
            bg-gradient-to-r from-red-400 to-pink-400 
            text-transparent bg-clip-text">Create Account</h2>
            <form onSubmit={handleSignUp}>
<Input icon={User} type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} />
<Input icon={Mail} type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
<Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
  <button
  
   className="text-3x1 font-bold mb-6 text-center 
            bg-gradient-to-r from-red-400 to-pink-400 
            text-transparent bg-clip-text"type="submit" >Sign Up </button>
            </form>
        </div>
        
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center's">
            <p className="text-sm text-gray-400"> Already have an account?
                <Link to="/login" className="text-red-400 hover:underline"> Login</Link>

            </p>
            
        </div>
    </motion.div>
  )
}

export default SignUpPage