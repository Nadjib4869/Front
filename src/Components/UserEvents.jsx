import AddBtn from '../Assets/images/add.svg'; 
import { useQuery , useMutation , useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import image from '../Assets/images/hero.png'

const CreateNewEvent = () => {
  return (
    <div className=" flex flex-col justify-center items-center w-[280px] h-[250px]">
      <Link to="/createEvent">
        <img
        src={AddBtn}
        alt="Add Button"
        className="transition duration-300 ease-in-out transform cursor-pointer hover:scale-110"
      /></Link>
    </div>
  );
};
const deleteEvent = async (eventId, token) => {
    const response = await fetch(`http://localhost:8000/cancelEvent/${eventId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
  };
  const ShowingEventCard = ({ data, token , isUser }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const id = data._id ;
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/yourPosts/${id}`);
        const eventData = await response.json();
        console.log("Fetched data:", eventData);
    
        return { event: eventData };
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        throw error;
      }
    };
    
    const { data: events, isLoading, isError } = useQuery(['posts', id], fetchPosts);
    
    const [userEvent, setCardsData] = useState([]);

    useEffect(() => {
      if (events) {
        setCardsData(events.event);
      }
    }, [events]);
    console.log(userEvent);
    const handleCardClick = (id) => {
      navigate(`/EventPage/${id}`);
    };
  
    const deleteEventMutation = useMutation((eventId) => deleteEvent(eventId, token));
  
    const handleDelete = (id) => {
      deleteEventMutation.mutate(id);
    };
    const handleEdit = (id)=>{
      navigate(`/EditEvent/${id}`);
    }
    console.log(data)
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
      return data?.likedEvents.find(event => event._id === id);
    }
    return (
        <>
          {userEvent.map((card) => (
              <div className='flex flex-col w-[280px]' key={card._id}>
                    <div className="cards1" onClick={() => handleCardClick(card._id)} >
                    <img className='w-[280px] h-[220px]' src={`http://localhost:8000/assets/${card.image}`} alt="image" />
                <div className="absolute top-0 left-0 bg-white pt-0.5 pb-0.5 pe-2 ps-2"><p className="text-base font-medium">{card.price}</p></div>
                <div className="flex justify-between items-center pt-2 pb-2 ps-1 pe-2">
                <div className="basis-1/6 font-medium text-md text-center">
                  <div>{new Date(card.date).getDate()}</div>
                  <div>{new Date(card.date).toLocaleString('default', { month: 'short' })}</div>
                  <div>{new Date(card.date).getFullYear()}</div>
                </div>
                    <div className="basis-3/6 ps-1">
                        <h3 className="text-md font-medium text-center">{card.title}</h3>
                        <h4 >{data?.username}</h4>
                    </div>
                    <div className="basis-2/6"> <span className="font-medium ps-4">{data?.followers?.length} </span>Followers</div>
                </div>
                <div className="absolute top-2 right-2 bg-white hover:scale-[1.1] transition duration-500 p-1 rounded-3xl z-10">
                { !Liked(card._id) && <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 14" fill="none" onClick={()=>{handleLike(card._id);}}>
                        <path d="M11.6458 0.699707C10.1567 0.699707 8.84484 1.44425 8.1003 2.61425C7.35575 1.44425 6.04393 0.699707 4.55484 0.699707C2.21484 0.699707 0.300293 2.61425 0.300293 4.95425C0.300293 9.17334 8.1003 13.4633 8.1003 13.4633C8.1003 13.4633 15.9003 9.2088 15.9003 4.95425C15.9003 2.61425 13.9858 0.699707 11.6458 0.699707Z" fill="#C2C2C2"/>
                  </svg>}
                  { Liked(card._id) && <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 14" fill="none" onClick={()=>{handleDislike(card._id);}}>
                        <path d="M11.6458 0.699707C10.1567 0.699707 8.84484 1.44425 8.1003 2.61425C7.35575 1.44425 6.04393 0.699707 4.55484 0.699707C2.21484 0.699707 0.300293 2.61425 0.300293 4.95425C0.300293 9.17334 8.1003 13.4633 8.1003 13.4633C8.1003 13.4633 15.9003 9.2088 15.9003 4.95425C15.9003 2.61425 13.9858 0.699707 11.6458 0.699707Z" fill="#ff0000"/>
                  </svg> }
                </div>
                    </div>
                    {isUser && 
                    <div className='space-x-6'>
                      <button className='bg-red-600 rounded-xl font-semibold text-lg text-white pt-2 pb-2 w-32 pe-4 ps-4 mt-4 hover:scale-[1.01] hover:shadow-xl' onClick={() => handleDelete(card._id)}>Cancel </button>
                      <button className='bg-blue-600 rounded-xl font-semibold text-lg text-white pt-2 pb-2 w-32 pe-4 ps-4 mt-4 hover:scale-[1.01] hover:shadow-xl' onClick={() => handleEdit(card._id)}>Edit</button>
                      </div> }
              </div>
            ))}  
        </>
    );
};

const UserEvents = ({ isUser, data }) => {
    const token = localStorage.getItem('token');
    
    return (
      <section className="flex flex-col py-4">
        <div className='w-full'>
          <h3 className="text-lg font-semibold">Upcoming</h3>
          <div className="grid mb-4 gap-x-32 grid-cols-3 max-[1469px]:grid-cols-2 max-[1469px]:gap-x-16 max-[1105px]:grid-cols-3 max-[996px]:grid-cols-2 max-md:gap-0 max-[588px]:grid-cols-1 max-md:ml-4 max-[588px]:ml-10 max-[354px]:ml-0">
            <ShowingEventCard data={data} token={token} isUser={isUser} />
            {isUser && <CreateNewEvent />}
          </div>
        </div>
        <div className='w-full'>
          <h3 className="text-lg font-semibold">Passed</h3>
          <div className="grid mb-4 gap-x-32 grid-cols-3 max-[1469px]:grid-cols-2 max-[1469px]:gap-x-16 max-[1105px]:grid-cols-3 max-[996px]:grid-cols-2 max-md:gap-0 max-[588px]:grid-cols-1 max-md:ml-4 max-[588px]:ml-10 max-[354px]:ml-0">
            <ShowingEventCard data={data} token={token}  />
          </div>
        </div>
      </section>
    );
  };
  
  export default UserEvents;