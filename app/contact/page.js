import React from 'react'
import { ContactHelpQuery } from '../utils/crudcontact'

const Contact = () => {
  return (
    <>
    <div className='bg-pink-400 py-4'>
      <div className='w-[calc(100%-40px)] lg:w-[calc(100%-30%)] m-auto h-auto shadow-xl border-t-4 border-l-2 border-r-2 border-black rounded-lg flex shadow-black  '>
        <div className='bg-white rounded-l-lg px-4 w-1/2'>
          <h1 className='font-bold text-2xl mt-4 mb-2 text-pink-400 '>Let&apos;s Get In Touch</h1>
          <img src="https://blog.ahsuite.com/wp-content/uploads/2023/07/10-Tips-to-Build-a-Strong-Freelance-Portfolio.png" alt="no image found"  className=' rounded-full w-[350px] h-[350px] object-contain '/>
          <h4 className='font-bold text-xl '>Connect With Us</h4>
          <div className='flex py-4 items-center gap-3 flex-wrap'>
            <img src="/images/facebook.png" className='bg-pink-600 text-white w-10 h-10 cursor-pointer px-2 py-2 rounded-md' alt="no image found"  />
            <img src="/images/youtube.png" className='bg-pink-600 text-white w-10 h-10 cursor-pointer px-2 py-2 rounded-md' alt="no image found"  />
            <img src="/images/pinterest.png" className='bg-pink-600 text-white w-10 h-10 cursor-pointer px-2 py-2 rounded-md' alt="no image found"  />
            <img src="/images/x.png" className='bg-pink-600 text-white w-10 h-10 cursor-pointer px-2 py-2 rounded-md' alt="no image found"  />
          </div>
        </div>
        <div className='px-2 md:px-4 w-full'>
          <form action={ContactHelpQuery}>
            <div className='w-full'>
              <h2 className='font-bold text-white text-2xl mt-4 mb-4'>Contact Us</h2>
              <div className='px-6 w-full'>
                <div className='flex border border-white rounded-3xl px-2 md:px-4 py-2 gap-2 mb-6'>
                  <label className='text-white font-bold' htmlFor="">Name</label> <input type="text" name="username" id="" className='bg-transparent px-2 md:px-4 outline-none text-black text-[16px] w-full ' required />
                </div>
                <div className='flex border border-white rounded-3xl px-4 py-2 gap-2 mb-6'>
                  <label className='text-white font-bold' htmlFor="">Email</label> <input type="email" name="email" id="" className='bg-transparent px-2 md:px-4 outline-none text-black text-[16px] w-full 'required />
                </div>
                <div className='flex border border-white rounded-3xl px-4 py-2 gap-2 mb-6'>
                  <label className='text-white font-bold' htmlFor="">Phone</label> <input type="phone" name="phone" id="" className='bg-transparent px-1 md:px-3 outline-none text-black text-[16px] w-full ' required/>
                </div>
                <div className=' border border-white rounded-3xl px-4 py-2 gap-2 mb-6'>
                  <label className='text-white font-bold block' htmlFor="">Message</label><textarea className='bg-transparent px-2 md:px-4 outline-none text-black text-[16px] w-full h-[224px] sm:h-[122px] ' name="message" id=""></textarea>
                </div>
                <div>
                  <button className='bg-white px-4 py-1 font-bold text-black rounded-md'>Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact
