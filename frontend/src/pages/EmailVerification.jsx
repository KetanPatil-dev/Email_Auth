import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "lucide-react";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const handleChange = (index, value) => {
    const newCode=[...code];
    //handle pastetd element
    if(value.length>1)
    {
        const pastedCode=value.slice(0,6).split("")
        for(let i=0;i<6;i++){
            newCode[i]=pastedCode[i]|| ""
        }
        setCode(newCode);
        // Focus on the last non-empty input or the first empty one
        const lastFilledIndex = newCode.findLastIndex((digit)=>digit!=="");
        const focusIndex=lastFilledIndex<5?lastFilledIndex+1:5;
        inputRef.current[focusIndex].focus()
    } else{
        newCode[index]=value;
        setCode(newCode);
        if(value && index<5){
            inputRef.current[index+1].focus()
        }
    }
  };
  function handleSubmit(e){
    e.preventDefault();
    const verificationCode=code.join("");
    console.log(`Verification code Submitted: ${verificationCode}`)
  }
  const handleKeyDown = (index, e) => {
    if(e.key==="Backspace"&& !code[index] && index>0)
    {
        inputRef.current[index-1].focus()
    }
  };
  useEffect(()=>{
    if(code.every(digit=>digit!=="")){
        handleSubmit(new Event("submit"))
    }
  })
  return (
    <div
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop
    -filter backdrop-blur-x1 rounded-2x1 shadow-x1 overflow-hidden"
    >
      <h2
        className="text-3x1 font-bold mb-6 text-center bg-gradient-to-r
        from-orange-400 to-emerald-500 text-transparent bg-clip-text"
      >
        Verify Your Email
      </h2>
      <p className="text-center text-gray-300 mb-6">
        Enter your 6-digit code sent to your Email
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRef.current[index] = el)}
              type="text"
              maxLength="6"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2x1 font-bold 
                    bg-gray-700 text-white border-2 border-gray-rounded-1g
                    focus:border-red-500 focus:outline-none
                    "
            />
          ))}
        </div>
        <button className="text-3x1 font-bold mb-6 text-center 
            bg-gradient-to-r from-red-400 to-pink-400 
            text-transparent bg-clip-text"type="submit">Verify Email</button>
            
      </form>
    </div>
  );
};

export default EmailVerification;
