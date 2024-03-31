import { useNavigate } from 'react-router-dom';

const ShowingEventCard = ({ data }) => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/EventPage/${id}`);
  };
  const Liked = (id) =>{
    return data?.likedEvents.find(event => event._id === id);
  }
  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center mt-4 mb-4">
      {data?.likedEvents.
      map((card) => (
        <div className="cards2" onClick={() => handleCardClick(card._id)} key={card._id}>
          <img src={`http://localhost:8000/assets/${card.image}`} alt="image"/>
                <div className="absolute top-0 left-0 bg-white pt-0.5 pb-0.5 pe-2 ps-2"><p className="text-base font-medium">{card.price}</p></div>
                <div className="flex justify-between items-center pt-4 pb-4 ps-1 pe-2">
                    <div className="basis-1/6 font-medium text-lg text-center">{card.date}</div>
                    <div className="basis-3/6 ps-1">
                        <h3 className="text-lg font-medium">{card.title}</h3>
                        <h4 >{card.organizer?.username}</h4>
                    </div>
                    <div className="basis-2/6"> <span className="font-medium ps-4">{card.organizer?.followers?.length} </span>Followers</div>
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
      ))}
    </div>
  );
};



  const LikedEvents = ({data}) => {
    return (
      <section className="flex flex-col py-4 gap-y-8">
      <div>
        <h3 className="text-lg font-semibold">Liked Events</h3>
        <div className="">
          <ShowingEventCard data={data} />
        </div>
      </div>
      </section>
  );
  };
  
  export default LikedEvents;