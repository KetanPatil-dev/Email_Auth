import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import {Lock, Mail, User,Loader, ArrowBigRight} from "lucide-react"
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const SignupPage = () => {
    const navigate=useNavigate()
   const {isLoading,error,signup}=useAuthStore()
  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData)
    navigate("/verify-email")
  };
  return (
   <div className="flex justify-center items-center">
     <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5,delay:.5 }}
      className="max-w-md w-full mt-11 bg-gray-950 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
            <Input icon={User} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <Input icon={Mail}  type="email" name="email" placeholder="mail.ketan027@gmail.com" value={formData.email} onChange={handleChange}/>
            <Input icon={Lock}  type="password" name="password" placeholder="******" value={formData.password} onChange={handleChange}/>
            {error && <p className="text-red-500 font-semibold" >{error}</p>}
            <PasswordStrengthMeter password={formData.password}/>
        
<motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-orange-600
						hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
					</motion.button>
        </form>
     <p className="mt-4 text-white text-center hover:text-gray-400 cursor-pointer">
  Already have an Account?
  <Link to="/login">
  <span className="ml-1 inline-flex items-center">
    Login
    <ArrowBigRight className="ml-1" />
  </span>
  </Link>
</p>

      </div>
    </motion.div>
   </div>
  );
};

export default SignupPage;
