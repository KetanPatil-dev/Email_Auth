import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Loader, Lock } from 'lucide-react'
import Input from '../components/Input'
import {motion} from "framer-motion"
import { toast } from 'react-toastify'
import {useNavigate, useParams} from "react-router-dom"
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'

const ResetPassword = () => {
  const {token}=useParams()
  const navigate=useNavigate()

  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const {isLoading,resetPassword}=useAuthStore()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(password!==confirmPassword){

      toast.error("Passwords do not match")
      return;
    }
    await resetPassword(token,password)
    setTimeout(()=>{
      navigate("/")
    },2000)
  }
  return (
    <div className='flex justify-center  mt-11'>
    <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text'>
					Forgot Password
				</h2>

			 
					<form onSubmit={handleSubmit}>
						<p className='text-gray-300 mb-6 text-center'>
							Change your Password Below </p>
						<Input
							icon={Lock}
							type='password'
							placeholder='Enter new Password'
							value={password}
							onChange={(e)=>setPassword(e.target.value)}
							required
						/>
            <Input
            icon={Lock}
            type="password"
            placeholder="Confirm new Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            />
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold rounded-lg shadow-lg hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
							type='submit'
						>
               
							{isLoading ? <Loader className='text-gray-500 size-6 animate-spin mx-auto' /> : "Reset Password"}
						</motion.button>
					</form>
				 
			</div>
		</motion.div>
</div>
	
  )
}

export default ResetPassword