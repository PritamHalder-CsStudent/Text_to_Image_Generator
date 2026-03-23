import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'

const Description = () => {
  return (
    <motion.div 
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      
      className='flex flex-col justify-center items-center my-24 p-6 md:px-28 '>
      <h1 className='text-3xl font-semibold mb-2 '>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Turn your imagination into visual art</p>

      <div className='flex flex-col  gap-5 md:gap-14 md:flex-row'>
        <img className='w-80 xl:w-95 rounded-lg' src={assets.sample_img_1} alt="" />
        <div className='mt-8'>
            <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing the AI-Power Text to Image Generator</h2>
            <p className='text-gray-600 mb-4'>Transform text descriptions into stunning visuals with our advanced AI technology.
                Imagine it, descripe it, and watch it come to life instantly
            </p>
            <p className='text-gray-600'>Simply type in a text prompt and watch our AI generate a unique image in seconds.
                Powered by state-of-the-art AI, our generator brings your ideas to life with stunning detail and creativity.
            </p>

        </div>
      </div>
    </motion.div>
  )
}

export default Description
