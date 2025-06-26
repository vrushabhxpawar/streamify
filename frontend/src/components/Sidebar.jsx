import { Link, useLocation } from 'react-router-dom';
import useAuthuser from '../../hooks/useAuthuser.js';
import { BellIcon, HomeIcon, ShipWheel, UsersIcon } from 'lucide-react';

const Sidebar = () => {

  const { authUser } = useAuthuser();
  const location = useLocation();
  const currentPath = location.pathname;


  return (
    <aside className='w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0'>
      { /* LOGO */ }
        <div className='p-5 border-b border-base-300'>
          <Link to="/" className='flex items-center gap-2.5'>
          <ShipWheel className='size-9 text-primary'/>
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Streamify</span>
          </Link>
        </div>

      { /* NAVIGATION LINKS */ }
      <nav className='flex-1 p-4 space-y-1'>
        { /* HOME PAGE LINK */}
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath ==='/' ? 'btn-active' : ''}`}>
          <HomeIcon  className='size-5 text-base-content opcaity-70'/>
          <span>Home</span>
        </Link>
        { /* FRIENDS PAGE LINK */}
         <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath ==='/friends' ? 'btn-active' : ''}`}>
          <UsersIcon className='size-5 text-base-content opcaity-70'/>
          <span>Friends</span>
        </Link>
        { /* NOTIFICATION PAGE LINK */}
         <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath ==='/notifications' ? 'btn-active' : ''}`}>
          <BellIcon  className='size-5 text-base-content opacity-70'/>
          <span>Notifications</span>
        </Link>
      </nav>

      { /* USER PROFILE SECTION */ }
      <div className='p-4 border-t border-base-300 mt-auto'>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='w-10 rounded-full'>
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className='flex-1'>
            <p className='font-semibold text-sm'>{authUser?.fullname}</p>
            <p className='text-xs text-success flex items-center gap-1'>
              <span className='size-2 rounded-full bg-success inline-block'>
              </span>
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
