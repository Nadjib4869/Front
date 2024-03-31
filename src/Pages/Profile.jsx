import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Navbar from '../Components/CustomNavbar';
import LikedEvents from '../Components/LikedEvents';
import Events from '../Components/UserEvents';
import Userlists from '../Components/FollowersAndFollowing';
import Loading from '../Components/Loading';
import Notfound from './notfound';

export default function Profile() {
    const { id } = useParams();
    const { data: userInfo, isLoading: userLoading, isError: userError } = useQuery(['userData', id], fetchUserData);
    console.log(userInfo)
    const [showLiked, setShowLiked] = useState(false);
    const [showEvents, setShowEvents] = useState(true);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    function fetchUserData() {
        return fetch(`http://localhost:8000/users/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .catch(error => {
                throw new Error(error.message);
            });
    }

    const handleLikedClick = (e) => {
        e.preventDefault();
        setShowLiked(true);
        setShowEvents(false);
        setShowFollowers(false);
        setShowFollowing(false);
    };

    const handleEventsClick = (e) => {
        e.preventDefault();
        setShowEvents(true);
        setShowLiked(false);
        setShowFollowers(false);
        setShowFollowing(false);
    };

    const handleFollowersClick = (e) => {
        e.preventDefault();
        setShowFollowers(true);
        setShowEvents(false);
        setShowLiked(false);
        setShowFollowing(false);
    };

    const handleFollowingClick = (e) => {
        e.preventDefault();
        setShowFollowing(true);
        setShowEvents(false);
        setShowLiked(false);
        setShowFollowers(false);
    };

    if (userLoading) return <div className="relative h-screen w-screen"><Loading/></div>
    if (userError) return <Notfound/>


    return (
        <div className='wrapper overflow-x-hidden bg-[#E1E1E1]'>
            <div className='h-screen'>
                <Navbar />
                <span className='flex justify-center h-rest gap-x-6'>
                    <div className='mt-8'>
                        <div className='h-80 w-[440px] rounded-lg p-4 px-6 border border-[#bdbdbd] bg-white'>
                            <div className='flex flex-col items-center justify-center mb-6'>
                                <img src={`http://localhost:8000/assets/${userInfo.image}`} alt="" className='h-[130px] w-[140px] rounded-full' />
                                <h2 className='mb-5 text-[#414141]'>{userInfo?.username}</h2>
                            </div>
                            <hr className='border border-[#00000080]' />
                            <div className='flex justify-between mt-1 text-[#414141]'>
                                <p>Email</p>
                                <p>{userInfo?.email}</p>
                            </div>
                            <div className='flex justify-between text-[#414141]'>
                                <p>Phone Number</p>
                                <p>{userInfo?.phoneNumber}</p>
                            </div>
                        </div>
                        { userInfo?.description &&  (<div className='overflow-auto wrapper h-[170px] w-[440px] bg-white border border-[#bdbdbd] rounded-lg px-4 py-2 mt-4'>
                            <h2 className='mb-1 font-semibold'>Description</h2>
                            <p className='w-full overflow-y-auto break-words outline-none' placeholder='Your Description...'>{userInfo?.description}</p>
                        </div>)}
                    </div>
                    <section className='flex-col w-1/2 mt-8'>
                        <div className='h-[60px] rounded-lg p-2 flex items-center justify-evenly border border-[#bdbdbd] bg-white'>
                            <a href="" className={`${showLiked ? 'pt-[17px] pb-3 border-b-4 border-[#0047ff]' : ''}`} onClick={handleLikedClick}>Liked</a>
                            <a href="" className={` ${showEvents ? 'pt-[17px] pb-3 border-b-4 border-[#0047ff]' : ''}`} onClick={handleEventsClick}>Events</a>
                            <a href="" className={` ${showFollowers ? 'pt-[17px] pb-3 border-b-4 border-[#0047ff]' : ''}`} onClick={handleFollowersClick}>Followers</a>
                            <a href="" className={` ${showFollowing ? 'pt-[17px] pb-3 border-b-4 border-[#0047ff]' : ''}`} onClick={handleFollowingClick}>Following</a>
                        </div>
                        {showLiked && <LikedEvents data={userInfo} />}
                        {showEvents && <Events isUser={true} data = {userInfo} />}
                        {showFollowers && <Userlists userInfo = {userInfo} userList={userInfo?.followers} />}
                        {showFollowing && <Userlists userInfo = {userInfo} userList={userInfo?.follows} />}
                    </section>
                </span>
            </div>
        </div>
    );
}
