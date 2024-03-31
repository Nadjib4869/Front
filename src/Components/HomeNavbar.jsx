import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const Navigate = useNavigate();
  const navigationItems = [
    ['Explore', ''],
    ['About', ''],
    ['Contact', ''],
  ];
  const { data: userData, isLoading, isError } = useQuery(['userData'], fetchUserData);
  
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

  return (
    <nav className='absolute z-40 flex justify-between w-full py-4 px-14'>
      <div className='text-white'>
        <img src="" alt="Logo" />
      </div>
      <span className='space-x-20 text-slate-300'>
        {navigationItems.map(([title, url], index) => (
          <Link key={index} to={url} className='hover:border-b-2 hover:text-white'>
            {title}
          </Link>
        ))}
      </span>
      {token && userData ? (
        <img
          className='w-12 h-12 cursor-pointer rounded-full'
          src={`http://localhost:8000/assets/${userData.image}`} // Assuming user's image is stored in userData
          alt=''
          onClick={() => setToggleDropdown((prev) => !prev)}
        />
      ) : (
        <div className='space-x-3'>
          <Link className='px-6 py-1 bg-yellow-500 pb-2 rounded-3xl hover:bg-yellow-600 ' to="/signup">
            Sign Up
          </Link>
          <Link className='py-1 bg-white rounded-3xl pb-2 px-7 hover:bg-slate-300 ' to="/login">
            Log In
          </Link>
        </div>
      )}
      {token && toggleDropdown && (
        <div className='absolute top-2 right-28 rounded-lg bg-white w-[230px] h-[250px] flex flex-col gap-4 items-center'>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error fetching user data</p>
          ) : (
            <>
              <span className='flex flex-row items-center justify-center my-2 mt-4 mr-11'>
                <img
                  className='w-10 h-10 mr-2 cursor-pointer rounded-full'
                  src={`http://localhost:8000/assets/${userData.image}`} // Assuming user's image is stored in userData
                  alt=''
                />
                <p>{userData?.username}</p> {/* Assuming user's username is stored in userData */}
              </span>
              <Link
                to={`/Profile/${userData?._id}`} // Assuming user's ID is stored in userData
                className='font-medium text-gray-700 text font-inter hover:text-gray-500'
                onClick={() => setToggleDropdown(false)}
              >
                View Account
              </Link>
              <Link
                to='/CreateEvent'
                className='font-medium text-gray-700 text font-inter hover:text-gray-500'
                onClick={() => setToggleDropdown(false)}
              >
                Create Event
              </Link>
              <Link
                to={`/EditProfile/${userData?._id}`} // Assuming user's ID is stored in userData
                className='font-medium text-gray-700 text font-inter hover:text-gray-500'
                onClick={() => setToggleDropdown(false)}
              >
                Edit Profile
              </Link>
              <button
                type='button'
                onClick={handleLogout}
                className='font-medium text-gray-700 text font-inter hover:text-gray-500'
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
