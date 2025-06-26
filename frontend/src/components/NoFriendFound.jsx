import { UserSearch } from 'lucide-react'
import React from 'react'

const NoFriendFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center bg-base-100'>
      <div className=' size-16 rounded-full bg-base-300 flex items-center justify-center mb-4'>
          <UserSearch  className='size-8 text-base-content opacity-40'/>
        </div>
        <h3 className='font-semibold text-lg mb-2'>No Friends yet</h3>
        <p className='text-base-content opacity-70 text-base'>
          connect with language partners to start practicing together!
        </p>
    </div>
  )
}

export default NoFriendFound
