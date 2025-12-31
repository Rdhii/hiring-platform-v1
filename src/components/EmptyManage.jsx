import React from 'react'

export default function EmptyManage() {
  return (
    <div className='mt-6 space-y-6 px-5'>
        <h1 className='font-bold'>Front End Developer</h1>
        <div className='border flex flex-col items-center gap-6 py-44 rounded-lg border-gray-300'>
            <img src="../../public/Artwork.svg" alt="empty manage" />
            <div className='flex flex-col items-center gap-1.5'>
                <p className='font-medium'>No candidates found</p>
                <p className='text-sm text-gray-500'>Share your job vacancies so that more candidates will apply.</p>
            </div>
        </div>
    </div>
  )
}
