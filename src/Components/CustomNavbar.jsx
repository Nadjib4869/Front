import {useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import UserIcon from '../Assets/images/userIcon.svg'
import Doorbell from '../Assets/images/Doorbell.svg'
import Active from '../Assets/images/Active.svg'
import { useProfileImage } from './ProfileImageContext';
import { useQuery, useQueryClient } from 'react-query';
import logo from "../Assets/Logo.png";

const CustomNavbar = () => {
  const token = localStorage.getItem('token'); 
  const Navigate = useNavigate();
  const queryClient = useQueryClient();
  const [toogleDropdown, setToogleDropdown] = useState(false);
  const [notificationToogleDropdown, setNotificationToogleDropdown] = useState(false);
  const { data: userData, isLoading, isError } = useQuery(['userData'], fetchUserData);
  console.log(userData?.notification);
  
  async function fetchUserData() {
    const token = localStorage.getItem('token');
    if (token){
      try {
      const response = await fetch('http://localhost:8000/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }}
    
  }
  const handleLogout = () => {
    localStorage.clear();
    Navigate('/login');
  };
  const [notifications, setNotifications] = useState(userData?.notification);

  const handleNotificationClick = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, newNote: false } : notification
      )
    );
  };
  const {profileImage} = useProfileImage();
  return (
    <nav className='flex justify-between items-center max-[734px]:px-3 p-9 h-[74px] bg-white border border-[#9f9f9f]'>
            <div className=''>
              <a href={'/'}>
                <img src={logo} alt="Logo" className='h-10 w-18' />
              </a>
            </div>
            <ul className='flex gap-20 max-[670px]:hidden'>
            <Link to={'/'}>
              <li>
                <a className='border-black hover:border-b-2'>
                  Explore
                </a>
              </li>
            </Link>
            {[
            ['About', '/About'],
            ['Contact', '/Contact'],
            ].map(([title,url], index)=> (
            <li key={index}><a href={url} className='border-black hover:border-b-2'>{title}</a></li>
            ))}
            </ul>
            {token && userData ? (
            <ul className="flex gap-24 max-[500px]:gap-16">
                <li className='flex gap-12 mt-2'>
                    <img 
                    src={Doorbell} 
                    alt="" 
                    onClick={()=>setNotificationToogleDropdown((prev) => !prev)}
                    className='transition duration-300 ease-in-out transform cursor-pointer h-7 w-7 hover:scale-110' 
                  />
                  {notificationToogleDropdown && 
                    <div className='wrapper text-[#393939] absolute z-20 overflow-y-auto top-14 right-24 rounded-lg bg-[#E1E1E1] w-[230px] max-h-[229px] flex flex-col items-center'>
                      <p className='left-0 w-full pb-1 pl-3 border-b border-slate-100'>Notifications</p>
                      {notifications && notifications.length > 0 ? (notifications.map((notification) => (
                          <span
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification.id)}
                            className='flex flex-row items-center justify-center w-full border rounded-lg cursor-pointer border-slate-100'
                          >
                            {notification.message && <img src={Active} alt="" />}
                            <img className='w-10 h-10 mr-2' src={UserIcon} alt="" />
                            <div className='flex flex-col'>
                              <p>{notification.message}</p>
                              <p>{notification.date}</p>
                            </div>
                          </span>
                        ))
                      ) : (
                        <p>No notifications</p>
                      )}
                    </div>
                  }
                </li>
                <li>
                  <img 
                    className='w-12 h-12 rounded-full cursor-pointer'
                    src={`http://localhost:8000/assets/${userData.image}`} 
                    alt=''
                    onClick={() => setToogleDropdown((prev) => !prev)}
                  />
                  {toogleDropdown && 
                  <div className='absolute z-20 top-2 right-24 rounded-lg bg-[#E1E1E1] w-[230px] h-[250px] flex flex-col gap-4 items-center'>
                    <span className='flex flex-row items-center justify-center my-2 mt-4 mr-11'>
                      <img 
                        className='w-10 h-10 rounded-full cursor-pointer'
                        src={`http://localhost:8000/assets/${userData.image}`} 
                        alt=''
                      />
                      <p>{userData?.username}</p>
                    </span>
                    <Link
                      to={`/Profile/${userData?._id}`}
                      className='font-medium text-gray-700 text font-inter hover:text-gray-500'
                      onClick={() => setToogleDropdown(false)}
                    >
                      View Account
                    </Link>
                    <Link
                      to='/CreateEvent'
                      className='font-medium text-gray-700 text font-inter hover:text-gray-500'
                      onClick={() => setToogleDropdown(false)}
                    >
                      Create Event
                    </Link>
                    <Link
                      to={`/EditProfile/${userData?._id}`}
                      className='font-medium text-gray-700 text font-inter hover:text-gray-500'
                      onClick={() => setToogleDropdown(false)}
                    >
                      Edit Profile
                    </Link>
                    <button
                      type='button'
                      onClick={() => { setToogleDropdown(false);
                        handleLogout();
                      }}
                      className='font-medium text-gray-700 text font-inter hover:text-gray-500'
                    >
                      Log Out
                    </button>
                  </div>
                  }
                </li>
            </ul>
            ):(
              <div className='space-x-3 max-[765px]:space-x-1'>
                <Link className='px-6 py-1 pb-2 bg-yellow-500 rounded-3xl hover:bg-yellow-600 max-[752px]:px-4 max-[340px]:px-2' to="/signup">
                  Sign Up
                </Link>
                <Link className='py-1 pb-2 bg-blue-500 text-white rounded-3xl px-7 hover:bg-blue-700 max-[752px]:px-4 max-[340px]:px-2' to="/login">
                  Log In
                </Link>
              </div>
            )}
    </nav>
  )
}

export default CustomNavbar