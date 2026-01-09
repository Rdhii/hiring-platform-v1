import React from 'react'

export default function Login() {
  return (
    <div className='mx-117 my-51'>
        <img src="logo-rakamin.png" className='w-35' />
        <div className='p-10 space-y-4 shadow-lg'>
            <h1 className='text-xl font-semibold'>Masuk ke Rakamin</h1>
            <div className='flex flex-col gap-2'>
                <label className='text-sm text-[#404040]'>Alamat Email</label>
                <input placeholder='Masukan email' className='px-4 py-2 rounded-lg border border-gray-300' />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-sm text-[#404040]'>Kata Sandi</label>
                <input type='email' placeholder='Masukan kata sandi' className='px-4 py-2 rounded-lg border border-gray-300' />
            </div>
            <button className='bg-[#FBC037] text-[#404040] font-semibold w-full py-1.5 rounded-lg'>Masuk</button>
        </div>
    </div>
  )
}
