import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate=useNavigate();
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20 '>
      <p className='text-2xl text-bold cursor-pointer' onClick={()=>navigate('/')}>TextToImage</p>
      <p className='flex-1 border-l border-gray-400 text-sm text-gray-500 max-sm:hidden pl-4'>Copyright @pritamhalder_CsStudent | All right reserved.</p>
      <div className='flex gap-2.5'>
        <img className='cursor-pointer' src={assets.facebook_icon}alt="" />
        <img className='cursor-pointer' src={assets.twitter_icon}alt="" />
        <img className='cursor-pointer' src={assets.instagram_icon}alt="" />


      </div>
    </div>
  )
}

export default Footer
