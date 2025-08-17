import { useLocation, Link } from 'react-router-dom';
import useAuthuser from '../../hooks/useAuthuser.js';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { logout } from '../lib/api.js';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react'; // Adjust the import based on your icon library
import ThemeSelector from './ThemeSelector.jsx'; // Assuming you have a ThemeSelector component

const Navbar = () => {
  const {authUser} = useAuthuser();
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat');

  const queryClient = useQueryClient();

  const { mutate : logoutMutation } = useMutation({
    mutationFn : logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
  })

  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-end w-full gap-3'>
            {/* LOGO only on chat page */}
            {isChatPage && (
              <div className='pl-5'>
                <Link to="/" className='flex items-center gap-2.5'>
                  <ShipWheelIcon className='size-9 text-primary' />
                  <span className='text-3xl font-bold  font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Streamify</span>
                </Link>
              </div>
            )}

            <div className='flex items-center sm:gap-4 ml-auto'>
              <Link to={'/notifications'}>
                <button className='btn btn-ghost btn-circle'>
                  <BellIcon className='h-6 w-6 text-base-content opacity-70' />
                </button>
              </Link>
            </div>

            <ThemeSelector />


            <div className='avatar'>
              <Link to="/update">
              <div className='size-8 rounded-full hover:cursor-pointer'>
                <img src={authUser?.profilePic} alt='User Avatar' />
              </div>
              </Link>
            </div>
            
            <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
              <LogOutIcon className='h-6 w-6 text-base-content opacity-70' />
            </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
