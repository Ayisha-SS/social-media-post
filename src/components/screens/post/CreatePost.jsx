import React from 'react'
import Logo from '../../includes/navBar/Logo'

function CreatePost() {
  return (
    <>
      <div className='py-4 border-b border-b-solid border-b-purple-500 shadow-md'>
        <div className='wrapper'>
          <Logo/>
        </div>
      </div>

      <div className='wrapper py-16 flex flex-col items-center justify-center'>
        <div className='border border-slate-500 bg-slate-300 p-5 w-[70%] '>
          <form action="" className='flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
              <label htmlFor="title" className='text-base font-medium '>Title</label>
              <input type="text" className='rounded-lg h-10 px-2 focus:outline-none'/>
            </div>
            <div className='flex flex-col gap-3'>
              <label htmlFor="description" className='text-base font-medium'>Description</label>
              {/* <input type="text" /> */}
              <textarea name="" id="description" className='rounded-lg h-60 px-2 focus:outline-none'></textarea>
            </div>
            <div className='flex flex-col gap-3 '>
              <label htmlFor="imageUpload" className='text-base font-medium'>Upload an Image</label>
              <input type="file" id="imageUpload" className='rounded-lg h-10 px-2 flex items-center justify-center focus:outline-none'/>
            </div>
          </form>
        </div>
        <div className='flex gap-2 pt-5'>
          <button className='text-base text-slate-900 py-2 px-5 bg-slate-400 rounded-full'>Cancel</button>
          <button className='text-base text-slate-900 py-2 px-7 bg-blue-600 rounded-full'>Save</button>
        </div>
      </div>
    </>
  )
}

export default CreatePost