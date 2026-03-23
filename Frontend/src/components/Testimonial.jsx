import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import {motion} from 'framer-motion'

const Testimonial = () => {
  return (
    <div 
      initial={{opacity:0.2, y:100}}
      transition={{duration:1}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
    
    
      className='flex flex-col justify-center items-center my-20 py-12'>
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2 '>Customer testimonials</h1>
      <p className='text-lg text-gray-600  mb-12'>What our customers say about us</p>

      <div className='flex flex-wrap gap-6'>
        {testimonialsData.map((item,index)=>(
            <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md  
            w-80 m-auto cursor-pointer hover:scale-[1.05] transition-all'>
                <div>
                    <img className='rounded-full w-14' src={item.image} alt="" />
                    <h2 className='text-xl font-semibold mt-2 '>{item.name}</h2>
                    <p className='text-gray-500 mb-4'>{item.role}</p>
                    <div className="flex mb-4">
                        {Array(item.stars).fill().map((ele,i)=>(
                            <img key={i} src={assets.rating_star} alt="" />
                        ))}
                    </div>
                    <p className='text-center text-sm text-gray-600'>{item.text}</p>
                </div>
                
            </div>
        ))}

      </div>

      
    </div>
  )
}

export default Testimonial
