import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'

export default function Resume() {
  return (
    <div className='min-h-screen flex items-center justify-center p-4 border'>
        <div className='w-full max-w-md rounded-lg p-10 border'>
            <div className='flex items-center gap-4'>
                <ArrowLeftIcon className='size-5 border border-gray-300 rounded-lg shadow-xl p-1' />
                <p>Apply Front End at Rakamin</p>
            </div>
        </div>
    </div>
  )
}
