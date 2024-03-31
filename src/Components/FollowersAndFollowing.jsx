import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from 'react-query';

const Userlists = ({userInfo ,  userList }) => {
  console.log("useList : " + userList)
  const queryClient = useQueryClient();
  
  // Function to retrieve token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  }

  const followUserMutation = useMutation((id) => fetch(`http://localhost:8000/followuser/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }));

  const unfollowUserMutation = useMutation((id) => fetch(`http://localhost:8000/unfollowuser/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }));
  const isUser =(id) =>{
      return (id != localStorage.getItem('userId'))
  }
  const isUserFollowed = (userId) => {
    return userInfo.follows.find(user => user._id === userId);
  };

  const onToggleFollow = async (id, isFollowed) => {
    try {
      if (isFollowed) {
        await unfollowUserMutation.mutate(id);
      } else {
        await followUserMutation.mutate(id);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {userList.map((user) => (
        <div key={user._id} className='flex items-center justify-between bg-white mb-1 p-4 w-full'>
          <div className='flex items-center'>
            <img src={`http://localhost:8000/assets/${user.image}`} alt='' className='h-[60px] w-[60px]' />
            <Link to={`/UserProfile/${user._id}`} className='ml-4'>
              {user?.username}
            </Link>
          </div>
          { isUser(user._id) && <p
            onClick={() => onToggleFollow(user._id, isUserFollowed(user._id))}
            className={`cursor-pointer ${isUserFollowed(user._id) ? 'text-red-500' : 'text-blue-500'}`}
          >
         {isUserFollowed(user._id) ? 'Unfollow' : 'Follow back'}
          </p> }
        </div>
      ))}
    </div>
  );
};

export default Userlists;
