
import { motion } from "framer-motion"
import Input from "../component/Input"

import { useState } from "react"
import { Lock,Mail,Loader } from "lucide-react"
import { Link } from "react-router-dom"
const LoginPage = () => {
    
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const  isLoading=false;
    function handleSignUp(e){
        e.preventDefault()
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
            <h2 className="text-5x1 font-bold mb-7 text-center 
            bg-gradient-to-r from-red-400 to-pink-400 
            text-transparent bg-clip-text">Welcome</h2>
            <form onSubmit={handleSignUp}>

<Input icon={Mail} type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
<Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

  <motion.button 

   className="text-4x1 font-bold mb-6 text-center 
   bg-gradient-to-r from-red-400 to-pink-400 
   text-transparent bg-clip-text"type="submit" >{isLoading?<Loader className="w-6 h-6 animate-spin text-center"/>: "Login"} </motion.button>
            <div className="flex items-center mb-6">
            </div>
   <Link to='/forgot-password' className="text-sm text-red-400 hover:underline">Forgot Password</Link>
   <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center's">
            <p className="text-sm text-gray-400"> Dont have an account?
                <Link to="/signup" className="text-red-400 hover:underline"> Sign Up</Link>

            </p>
            
        </div>
            </form>
        </div>
        
        
    </motion.div>
  )
}

export default LoginPage