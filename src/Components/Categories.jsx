import { useState, useEffect } from "react";
import { Link} from 'react-router-dom';
import { useQuery  ,useQueryClient   } from 'react-query';
import search from '../Assets/images/search.svg';
import cat1 from '../Assets/images/Business.svg';
import cat2 from '../Assets/images/Cultural.svg';
import cat4 from '../Assets/images/Politics.svg';
import image from '../Assets/images/hero.png'
import cat5 from '../Assets/images/Sports.svg';
import cat6 from '../Assets/images/Educational.svg';
import cat7 from '../Assets/images/Health&Care.svg';
import notFound from '../Assets/not-found.png';
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const categoriesData = [
  ['Business', cat1],
  ['Cultural', cat2],
  ['Art', cat2],
  ['Politics', cat4],
  ['Sports', cat5],
  ['Educational', cat6],
  ['Health & Care', cat7],
];
const fetchPosts = async () => {
  try {
    const response = await fetch('http://localhost:8000/randomEvents');
    const eventData = await response.json();
    console.log("Fetched data:", eventData);

    return { event: eventData }; // Wrap the data in an object with the 'event' property
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};



export default function Categories() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');
  const { data: events, isLoading, isError } = useQuery(['posts'], fetchPosts);
  const navigate = useNavigate();
  const [click, setclick] = useState(false);
  const [data, setCardsData] = useState([]);
  const  id  = localStorage.getItem('userId');
  const { data: userInfo, isLoading: userLoading, isError: userError } = useQuery(['userData', id], fetchUserData);
  
  async function fetchUserData() {
    try {
      const response = await fetch(`http://localhost:8000/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
}
console.log(userInfo)
  useEffect(() => {
    if (events) {
      setCardsData(events.event);
    }
  }, [events]);
  console.log(data);
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search Input:', searchInput);
    const filteredEvents = data.filter((event) => {
      const searchTerm = searchInput.toLowerCase();
      return (
        (event.title && event.title.toLowerCase().includes(searchTerm))
      );
    });
    setCardsData(filteredEvents);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  
  const handleLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/likeEvent/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to like the event');
      }
      // If the request is successful, invalidate the 'posts' query to trigger a refetch
      queryClient.invalidateQueries('posts');
    } catch (error) {
      console.error('Error liking event:', error);
    }
  };
  

  const handleDislike = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/dislike/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to like the event');
      }
      // If the request is successful, invalidate the 'posts' query to trigger a refetch
      queryClient.invalidateQueries('posts');
    } catch (error) {
      console.error('Error liking event:', error);
    }
  };
  const Liked = (id) =>{
    return userInfo?.likedEvents.find(event => event._id === id);
  }
  if (isLoading) {
  return (
    <div className="relative h-screen w-screen">
      <Loading />
    </div>
  );
}

  return (
  <>
    <div className='categories_box h-full space-y-11'>
    <div className='relative flex justify-center items-center'>
      <div className='relative w-2/5 max-sm:w-3/5 mt-7'>
        <img className='absolute top-2.5 left-2 h-5' src={search} alt="" />
        <input
          className='pl-10 md:pl-14 px-4 py-2 w-full transition-colors duration-1000 ease-in-out outline-none text-slate-900 placeholder-slate-700 placeholder-sm bg-slate-300 rounded-3xl hover:shadow-lg'
          type="text"
          placeholder='Enter Event Name'
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
      <h2 className='font-bold text-center text-4xl text-[#001C51]'>Categories</h2>
      <span className='flex flex-wrap items-center justify-center justify-items-stretch gap-x-[7px] gap-y-4 sm:gap-x-4 md:gap-x-6 lg:gap-x-10 xl:gap-x-16'>
        {categoriesData.map(([title, url], index) => (
          <div key={index} className='flex flex-col items-center'>
            <div className='p-6 transition duration-200 ease-in-out delay-200 bg-white rounded-full cursor-pointer ellipse hover:shadow-lg hover:-translate-y-1'>
              <img src={url} alt={title} />
            </div>
            <p className='mt-1'>{title}</p>
          </div>
        ))}
      </span>
    </div>
    <h1 className="pt-8 pb-8 text-3xl font-bold text-center text-indigo-950" >Upcoming Events</h1>
    <div className="relative">
        { data  ? (
          <div className="grid grid-cols-3 max-[1070px]:grid-cols-2 max-[711px]:grid-cols-1 justify-items-center mt-16 mb-16" >
            { data.map((card) => (
              <div className="cards" key={card._id}>
                          <img  src={`http://localhost:8000/assets/${card.image}`} alt="" />
                          <div className="absolute top-0 left-0 bg-white pt-0.5 pb-0.5 pe-2 ps-2"><p className="text-base font-medium">{card.price} </p></div>
                          <div onClick={()=>{ if (!token) {setclick(true)} else {navigate(`/eventpage/${card._id}`)}}} className="flex cursor-pointer  justify-between items-center pt-4 pb-4 ps-1 pe-2">
                              <div className="basis-1/6 font-medium text-xl text-center">{card.date}</div>
                              <div className="basis-3/6 ps-1">
                                  <h3   className="text-xl font-medium ">{card.title}</h3>
                                  <h4 >{card.organizer?.username}</h4>
                              </div>
                              <div className="basis-2/6"> <span className="font-medium">{card.organizer?.followers.length} </span>Followers</div>
                          </div>
                          <div
                            onClick={() => {
                              if (!token) {
                                setclick(true);
                              } 
                            }} className="absolute z-40 top-2 right-2 bg-white hover:scale-[1.1] transition duration-500 p-1 rounded-3xl ">
                            { !Liked(card._id) && <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 14" fill="none" onClick={()=>{handleLike(card._id);}}>
                                  <path d="M11.6458 0.699707C10.1567 0.699707 8.84484 1.44425 8.1003 2.61425C7.35575 1.44425 6.04393 0.699707 4.55484 0.699707C2.21484 0.699707 0.300293 2.61425 0.300293 4.95425C0.300293 9.17334 8.1003 13.4633 8.1003 13.4633C8.1003 13.4633 15.9003 9.2088 15.9003 4.95425C15.9003 2.61425 13.9858 0.699707 11.6458 0.699707Z" fill="#C2C2C2"/>
                            </svg>}
                            { Liked(card._id) && <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 14" fill="none" onClick={()=>{handleDislike(card._id);}}>
                                  <path d="M11.6458 0.699707C10.1567 0.699707 8.84484 1.44425 8.1003 2.61425C7.35575 1.44425 6.04393 0.699707 4.55484 0.699707C2.21484 0.699707 0.300293 2.61425 0.300293 4.95425C0.300293 9.17334 8.1003 13.4633 8.1003 13.4633C8.1003 13.4633 15.9003 9.2088 15.9003 4.95425C15.9003 2.61425 13.9858 0.699707 11.6458 0.699707Z" fill="#ff0000"/>
                            </svg> }
                          </div> 
                </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-fit ">
            <img className="w-60 h-60 " src={notFound} />
            <h1 className="text-5xl font-bold text-gray-800 pt-10 pb-10">Oooops,</h1>
            <p className="text-lg text-gray-600">There is no result for your search.</p>
            <p className="text-lg text-gray-600 space-x-2 pb-10">Come on, try again !</p>
          </div>
        )}

        <div className={`${ click  ? 'fixed inset-0 z-50 flex backdrop-blur-md justify-center items-center w-screen h-screen' : 'hidden' }`}>
            <div className=" bg-gray-200 shadow-xl rounded-lg w-[500px] h-[230px] max-[520px]:w-[400px] max-[415px]:w-[300px]">
            <h1 className="flex justify-end pr-2 cursor-pointer text-xl" onClick={()=>{setclick(false)}}>×</h1>
             <div className="flex flex-col m-4 justify-center items-center">
             <h1 className="text-2xl font-bold text-center pt-4 pb-4"> You need an account.</h1>
                <Link className=" font-semibold bg-blue-500  pb-1 shadow-md rounded-md mb-2 text-center text-white text-lg w-32 hover:scale-[1.05] " to="/Login" >login</Link>
                <Link className=" font-semibold bg-gold2 pb-1 shadow-md rounded-md text-center text-white text-lg w-32 hover:scale-[1.05] " to="/SignUp" > Signup</Link>
             </div>
            </div>
        </div>
    </div>
  </>
   );
}
