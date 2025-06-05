import React from 'react'
import {animate, motion} from "framer-motion"

const FloatingShapes = ({color,size,top,left,delay}) => {
  return (
    <motion.div className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl ${top} ${left}`} style={{top,left}} animate={{y:["0%","100%","0%"],x:["0%","100%","0%"],rotate:[0,360]}} transition={{duration:15,repeat:Infinity,ease:"Linear",delay:delay}}>FloatingShapes</motion.div>
  )
}

export default FloatingShapes