import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import {Lock, Mail, User,Loader, ArrowBigRight} from "lucide-react"
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const isLoading=false
    const error=false
  const [ formData, setFormData ] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
   <div className="flex justify-center items-center">
     <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5,delay:.5 }}
      className="max-w-md w-full mt-11 bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-2xl text-white font-bold mb-6 text-center bg-gradiant-to-right from-orange-400 to-red-500  bg-clip-text ">
          Log In
        </h2>
        <form onSubmit={handleSubmit}>
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
     <p className="mt-4 text-white text-center hover:text-xl cursor-pointer">
 
 Don't have an Account?
  <Link to="/signup">
  <span className="ml-1 inline-flex items-center">
    Signup
    <ArrowBigRight className="ml-1" />
  </span>
  </Link>
</p>

      </div>
    </motion.div>
   </div>
  );
};

export default LoginPage;
