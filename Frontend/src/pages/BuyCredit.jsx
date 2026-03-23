import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import {motion} from 'framer-motion'

const BuyCredit = () => {
  const {user}=useContext(AppContext)
  return (
    <motion.div 
      initial={{opacity:0.2 ,y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      className=' min-h-[80vh]  text-center  pt-14  mb-10 '>
      <button className='px-10 py-2 border border-black text-black rounded-full cursor-pointer'>Buy Credit</button>
      <h1 className='text-center text-3xl  font-medium mb-6 mt-2 pt-4 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap justify-center gap-6'>
        {plans.map((plan,index)=>(
          <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 
          hover:scale-105 transition-all duration-500  '>
            <p className='text-xl text-black font-medium text-center'>TextToImage</p>
            <p className='font-semibold'>{plan.id}</p>
            <p className='text-lg mb-4'>{plan.description}</p>
            <p className='mt-6'> <span className='text-3xl font-medium text-red-500'>₹ {plan.price}</span>/ {plan.credits}</p>
            <button className=' w-full  py-2 bg-black text-white rounded-md 
            cursor-pointer mt-4 min-w-52 '>{user ? 'Buy Now' : 'Get Started'}</button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
