'use client'

import React from 'react'
import {motion} from 'framer-motion'
import stringToColor from '@/lib/stringToColor';
import { MousePointer2 } from 'lucide-react';
function FollowPointer({
    x,y,info
}:{
    x:number;
    y:number;
    info:{
        name:string;
        email:string;
        avatar:string
    }
}) {
    const color = stringToColor(info.email || '1')
  return (
    <motion.div
    className='h-4 w-4 rounded-full absolute z-50'
    style={
        {
            top:y,
            left:x,
            pointerEvents:"none"
        }
    }
    initial={{
        scale:1,
        opacity:1
    }}
    animate={{
        scale:1,
        opacity:1
    }}
    exit={{
        scale:0,
        opacity:0
    }}
    >
        {/* <svg
    stroke={color}
    fill={color}
    strokeWidth="1"
    viewBox="0 0 16 16"
    className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-[${color}]`}
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.087L5.57 10.694l.803 8.652a.5.5 0 0 1-.006-.916l11.728-5.657a.5.5 0 0 1 .556.103z" />

  </svg> */}
  <div className=''>

  <MousePointer2 className="w-6 h-6"
          style={{
            color,
          }}/>
  </div>
  <motion.div 
  style={
    {
        backgroundColor:color,
    }
}
initial={{
    scale:0.5,
    opacity:0
}}
animate={{
    scale:1,
    opacity:1
}}
exit={{
    scale:0.5,
    opacity:0
}}
className='px-2 py-2 bg-neutral-200 text-white font-bold whitespace-nowrap min-w-max text-xs rounded-full'
>
    {info.name || info.email}
  </motion.div>
  </motion.div>
  )
}

export default FollowPointer

// import React from 'react';
// import { motion } from 'framer-motion';
// import stringToColor from '@/lib/stringToColor';
// import { MousePointer2 } from 'lucide-react';

// function FollowPointer({
//   x,
//   y,
//   info,
// }: {
//   x: number;
//   y: number;
//   info: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }) {
//   const color = stringToColor(info.email || '1');

//   return (
//     <motion.div
//       className="absolute z-50 pointer-events-none"
//       style={{
//         top: y,
//         left: x,
//         transform: 'translate(-10px, -50%)', // Adjusts position by translating it left
//       }}
//       initial={{
//         scale: 1,
//         opacity: 1,
//       }}
//       animate={{
//         scale: 1,
//         opacity: 1,
//       }}
//       exit={{
//         scale: 0,
//         opacity: 0,
//       }}
//     >
//       <div className="flex flex-col items-center">
//         <MousePointer2
//           className="w-6 h-6"
//           style={{
//             color,
//           }}
//         />
//         <motion.div
//           style={{
//             backgroundColor: color,
//           }}
//           initial={{
//             scale: 0.5,
//             opacity: 0,
//           }}
//           animate={{
//             scale: 1,
//             opacity: 1,
//           }}
//           exit={{
//             scale: 0.5,
//             opacity: 0,
//           }}
//           className="px-2 py-1 text-white font-bold whitespace-nowrap text-xs rounded-full mt-1"
//         >
//           {info.name || info.email}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// }

// export default FollowPointer;





