import { BellIcon, BellOff } from 'lucide-react'
import React from 'react'

const NoNotificationsFound = () => {
  return (
    <div className='flex flex-col items-center justify-center py-16 text-center bg-base-100'>
        <div className='size-16 rounded-full bg-base-300 flex items-center justify-center mb-4'>
          <BellOff  className='size-8 text-base-content opacity-40'/>
        </div>
        <h3 className='text-lg font-semibold mb-2'>No Notifications yet</h3>
        <p className='text-base'>
          When you receive friend request or message, they'all appear here. 
        </p>
    </div>
  )
}

export default NoNotificationsFound;
