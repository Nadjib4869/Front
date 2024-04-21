import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/CustomNavbar';
import UserIcon from '../Assets/images/userIcon.svg';
import ImageCropper from '../Components/ImageCropper';
import { useProfileImage } from '../Components/ProfileImageContext';
import axios from 'axios';

const EditProfile = () => {
  const [charCount, setCharCount] = useState(0);
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const profileImage = useProfileImage();
  const navigate = useNavigate();
  console.log(profileImage);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      username,
      phoneNumber,
      email,
      description,
      image : profileImage,
    })
    try {
      const response = await axios.put(
        'http://localhost:8000/UpdateYourInfos',
        {
          username,
          phoneNumber,
          email,
          description,
          image : profileImage,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        navigate(`/profile/${localStorage.getItem('userId')}`);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error as needed
    }
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(profileImage);
  };

  const [modalOpen, setModalOpen] = useState(true);
  const [userIcon, setUserIcon] = useState(UserIcon);

  const updateAvatar = (imgSrc) => {
    setUserIcon(imgSrc);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='wrapper w-full h-screen overflow-y-auto bg-[#E1E1E1]'
    >
      <Navbar />
      <main className='py-4 mx-32 my-20 max-xl:mx-0 space-y-4 bg-white rounded-lg px-[200px] max-lg:px-[100px] max-sm:px-10 min-h-adjust'>
        <h1 className='flex justify-center text-3xl text-blue-950 font-semibold'>
          Edit Profile
        </h1>
        <ImageCropper
          userIcon={image} // Pass the image state as userIcon prop
          updateAvatar={updateAvatar}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          onChange={handleImageChange}
          name='image'
          closeModal={() => setModalOpen(false)}
        />

        <div className='flex flex-col'>
          <p className='ml-4'>Username</p>
          <input
            value={username}
            type='text'
            name='username'
            placeholder='User123'
            className='bg-[#D9D9D9] rounded-lg py-2 px-4 outline-none'
            onChange={handleNameChange}
          />
        </div>
        <div className='flex flex-col'>
          <p className='ml-4'>Phone Number</p>
          <input
            value={phoneNumber}
            type='tel'
            name='phoneNumber'
            placeholder='+213*********'
            pattern='[+][0-9]*$'
            title='Number in international format'
            className='bg-[#D9D9D9] rounded-lg py-2 px-4 outline-none'
            onChange={handlePhoneChange}
          />
        </div>
        <div className='flex flex-col'>
          <p className='ml-4'>Email Address</p>
          <input
            value={email}
            type='email'
            name='email'
            placeholder='user123@gmail.com'
            className='bg-[#D9D9D9] rounded-lg py-2 px-4 outline-none'
            onChange={handleEmailChange}
          />
        </div>
        <div className='flex flex-col'>
          <p className='ml-4'>Profile Description</p>
          <div className='bg-[#D9D9D9] rounded-lg'>
            <textarea
              value={description}
              name='description'
              className='w-full h-[100px] py-2 px-4 outline-none wrapper text-wrap rounded-lg bg-[#D9D9D9]'
              placeholder='Description...'
              maxLength={500}
              onChange={handleDescriptionChange}
              style={{ resize: 'none' }}
            />
            <p className='text-[#414141] flex justify-end mr-2'>
              {charCount}/500
            </p>
          </div>
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='w-32 p-1 mt-4 text-white transition duration-300 ease-in-out  bg-blue-500 rounded-lg hover:scale-[1.01]'
          >
            Save
          </button>
        </div>
      </main>
    </form>
  );
};

export default EditProfile;
