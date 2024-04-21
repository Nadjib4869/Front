import { useState, useEffect } from 'react';
import { useQuery ,useMutation } from 'react-query';
import Navbar from '../Components/CustomNavbar';
import Like from '../Assets/images/like.svg';
import UserIcon from '../Assets/images/userIcon.svg';
import Report from '../Assets/images/Flag.svg';
import EmptyLike from '../Assets/images/Heart.svg';
import { Link, useParams } from 'react-router-dom';
import Notfound from './notfound';
import Loading from '../Components/Loading';
// Function to fetch event details
const fetchEvent = async (eventId) => {
    const response = await fetch(`http://localhost:8000/posts/${eventId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
    const eventData = await response.json();
    return eventData;
  };
  
  
const EventPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showReportPopup, setShowReportPopup] = useState(false);
  const { id } = useParams();

  const { data: event, isLoading ,  isError } = useQuery(['event', id], () => fetchEvent(id));

  console.log('Event:', event);
  if (isLoading) return <div className="relative h-screen w-screen"><Loading/></div>
  if (isError) {
    return <Notfound />;
  }
  const toggleReportPopup = () => {
    setShowReportPopup(!showReportPopup);
  };
  const sendFeedback = async (message) => {
    try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await fetch(`http://localhost:8000/AddFeedBack/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            body: JSON.stringify({ message }),
        });
        if (!response.ok) {
            throw new Error('Failed to submit feedback');
        }
        console.log('Feedback submitted successfully');
        window.location.reload();
        // Optionally, you can update the UI after feedback submission
    } catch (error) {
        console.error('Error submitting feedback:', error);
    }
};

const sendInterest = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/Interested/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to register interest');
        }
        console.log('Interest registered successfully');
        // Optionally, you can update the UI after interest registration
    } catch (error) {
        console.error('Error registering interest:', error);
    }
};
const handleInterest = () => {
    sendInterest();

};
const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const message = e.target.value;
    sendFeedback(message);
};

const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleFeedbackSubmit(e);
    }
};
const redirectToProfile = (id) =>{
    return id == localStorage.getItem('userId');
}
const ReportForm = async (selectedReason) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/sendReport/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ reason: selectedReason }), // Send the selected reason in the expected format
        });
        if (!response.ok) {
            throw new Error('Failed to send report');
        }
        console.log('Report sent successfully');
        // Optionally, you can handle success scenario here
    } catch (error) {
        console.error('Error sending report:', error);
    }
};

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedOption = document.querySelector('input[name="report"]:checked');

            if (selectedOption) {
                // Access the value of the selected radio button
                const selectedValue = selectedOption.name;
                console.log("Selected option:", selectedValue);
                ReportForm(selectedValue);
                // Now you can use the selected value as needed, such as submitting it to a server or performing some other action
            }
        
    };

    return (
        <>
    {event  && (<span className={`h-screen ${showReportPopup ? 'brightness-50' : ''}`}>
        { localStorage.getItem('username') != 'admin' && <Navbar/>}
        <main className='min-h-rest bg-[#E9E9E9]'>
            <div className={`flex flex-col items-center justify-center mb-5 h-fit p-16 max-sm:px-0 max-sm:pt-0 max-sm:pb-8 bg-[#D9D9D9]`}>
                <span className='relative z-0 max-sm:w-full'>
                    <div className='absolute flex items-center justify-center w-full h-full'>
                        <h1 className='text-6xl font-bold text-white'>{event.title}</h1>
                    </div>
                    <img className='sm:rounded-lg w-[700px] max-sm:w-full object-cover h-[380px]' src={`http://localhost:8000/assets/${event.image}`} alt="" />
                    <img className='absolute right-0 cursor-pointer bottom-0' src={Like} alt="" />
                    <div className='absolute flex flex-row justify-between p-2 space-x-[600px] max-[820px]:space-x-[580px] max-[790px]:space-x-[550px] max-md:space-x-[520px] max-[730px]:space-x-[480px] max-[690px]:space-x-[450px] max-[670px]:space-x-[490px] max-sm:space-x-[240px]'>
                        <div className='flex flex-row'>
                            <img className='' src={EmptyLike} alt="" />
                            <p className='text-sm'>{event.likes}</p>
                        </div>
                        <div className='right-0 flex flex-row cursor-pointer' onClick={toggleReportPopup}>
                            <img className='cursor-pointer' src={Report} alt="" />
                            <button className='text-sm'>Report</button>
                        </div>
                    </div>
                </span>
                
            </div>
            <div className='flex flex-row justify-between max-md:flex-col p-4 px-16 max-md:gap-y-7'>
                <div className='w-full max-md:order-2'>
                    <div className='w-[500px] flex flex-col space-y-2 max-md:w-full'>
                        <div className='flex items-center justify-start ps-5 bg-white rounded-lg h-16'>
                            <p>{event.date}</p>
                        </div>
                        <div className='flex items-center justify-start bg-white rounded-lg '>
                            <p className='px-4 py-5 overflow-auto max-h-35 wrapper'>
                            {event.description}
                            </p>
                        </div>
                        <div className='flex items-center justify-between px-2 bg-white rounded-lg h-16'>
                            <div className='flex flex-row items-center space-x-2'>
                                <img className='rounded-full h-9 w-9 ' src={`http://localhost:8000/assets/${event.organizer.image}`} alt="" />
                            { redirectToProfile(event.organizer._id) ? (
                                    <Link to={`/Profile/${event.organizer._id}`}>
                                    {event.organizer?.username}
                                    </Link>
                                ) : (
                                    <Link to={`/UserProfile/${event.organizer._id}`}>
                                    {event.organizer?.username}
                                    </Link>
                                )
                                }
                                                        </div>
                            <p>{event.organizer?.followers.length} Followers</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col space-y-2 max-md:order-1 max-md:items-center'>
                    <Link className='bg-[#2157BE] text-white px-8 py-1 rounded-xl' to={event.link} >Get Ticket</Link>
                    <p  className='bg-[#D20D00] text-white px-8 py-1 rounded-xl'  onClick={handleInterest}>Interested</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center mt-32 max-lg:mt-20 max-md:mt-7'>
                <div className='w-[1200px] max-xl:px-32 max-lg:px-60 max-md:px-72 max-sm:px-[425px]'>
                    <div className='bg-gray-400 h-[50px] w-full rounded-t-lg flex justify-center items-center'>
                        Comments                    
                    </div>
                    <div className='mb-10 Container w-full'>
                        <div className='bg-white border-[#BDBDBD] border-2 w-full rounded-b-lg'>
                            <form  onSubmit={handleFeedbackSubmit}>
                                <textarea name='feedback' className='ps-8 pt-4 pe-8 pb-4 w-full h-[60px] outline-none' placeholder='Type your feedback...' onKeyPress={handleKeyPress} />
                            </form>
                            {event.feedbacks.map((comment) => (
                                <div className=' border-2 border-[#E9E9E9] p-5 ' key={comment.id}>
                                    <div className='flex flex-row justify-between'>
                                        <span className='flex flex-row'>
                                            <img className='rounded-full h-9 w-9' src={UserIcon} alt="" />
                                            <div className='flex flex-col mt-1 space-y-[-4px] ml-1'>
                                                <p>{comment.username}</p>
                                                <p className='text-xs font-light'>{comment.time}</p>
                                            </div>
                                        </span>
                                    </div>
                                    <div className='px-10 py-3'>
                                        <p>{comment.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </span>)}
    {showReportPopup && (
        <div className='fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full max-lg:w-'>
            <form  onSubmit={handleSubmit} className="flex flex-col justify-center bg-white rounded-3xl py-2 h-[600px] w-[900px]">
                <h2 className='flex items-center font-bold text-2xl mb-4 justify-center'>Report Event</h2>
                <span className='p-4 ml-16 space-y-2 max-[500px]:ml-4'>
                    <h2 className='font-semibold'>Reasons of Report :</h2>
                    <div className='ml-2 space-y-3'>
                        <div className='space-x-2'>
                            <input className='cursor-pointer' type="radio" name="Harmful Content" id="spam1" />
                            <label htmlFor="spam1">Harmful Content</label>
                        </div>
                        <div className='space-x-2'>
                            <input className='cursor-pointer' type="radio" name="Illegal Content" id="spam2" />
                            <label htmlFor="spam2">Illegal Content</label>
                        </div>
                        <div className='space-x-2'>
                            <input className='cursor-pointer' type="radio" name="Spam" id="spam3" />
                            <label htmlFor="spam3">Spam</label>
                        </div>
                        <div className='space-x-2'>
                            <input className='cursor-pointer' type="radio" name="Hateful Content" id="spam4" />
                            <label htmlFor="spam4">Hateful Content</label>
                        </div>
                        <div className='space-x-2'>
                            <input className='cursor-pointer' type="radio" name="Violence" id="spam5" />
                            <label htmlFor="spam5">Violence</label>
                        </div>
                        <div className='space-x-2'>
                            <input className='cursor-pointer' type="radio" name="Copyright or Trademark Infringement" id="spam6" />
                            <label htmlFor="spam6">Copyright or Trademark Infringement</label>
                        </div>
                        <div className='space-x-2'>
                            <input className='cursor-pointer' type="radio" name="Canceled Event" id="spam7" />
                            <label htmlFor="spam7">Canceled Event</label>
                        </div>
                    </div>
                </span>
                <div className='flex justify-end mr-6'>
                    <button className='bg-[#0046CE] text-white px-11 py-1 rounded-xl' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )}
    {!event && <Notfound/>}
        </>
    );
};

export default EventPage;
