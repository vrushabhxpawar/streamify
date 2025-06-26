import { LoaderIcon } from 'lucide-react';

const ChatLoader = () => {
  return (
    <div className='h-screen flex flx-col items-center justify-center p-4 gap-3'>
        <LoaderIcon className='animate-spin text-primary size-10'/>
        <p className='text-center font-mono text-lg mt-4'>Connecting to chat...</p>
    </div>
  )
}

export default ChatLoader;
