import {Link} from 'react-router-dom'
export default function Footer () {
   const token = localStorage.getItem('token');
  return (
    <div>
     <div className=" flex justify-between bg-footer p-16 border-b border-gold">
        <h1 className="text-3xl font-bold text-white me-16">NAME</h1>
        <div className="flex gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="23" viewBox="0 0 30 23" fill="none">
            <path d="M0 0V3.71911L14.8765 11.1573L29.7529 3.71911V0H0ZM0 7.43823V22.3147H29.7529V7.43823L14.8765 14.8765L0 7.43823Z" fill="white"/>
        </svg>
        <p className="text-white text-base ">event.hub@gmail.dz</p>
        </div>
        <div className="flex gap-4">
           { !token && <Link to="/SignUp" className="bg-gold hover:bg-gold2  rounded-2xl font-medium pe-5 ps-5 h-8 flex items-center" ><p>Sign Up</p></Link>}
           { !token && <Link to="/Login" className="bg-white hover:bg-gray-200 rounded-2xl font-medium pe-6 ps-6 h-8 flex items-center" ><p>Log in</p></Link>}
        </div>
     </div>
     <div className="bg-footer2 pt-8 pb-8 ps-16 pe-16  ">
        <div className='text-white text-base flex justify-around items-center  '>
            <Link to="/Explore" className='hover:underline'>Explore</Link>
            <Link to="/Contact" className='hover:underline'>Contact</Link>
            <Link to="/About" className='hover:underline'>About</Link>
            <Link to="/TermOfUse" className='hover:underline'>Term Of Use</Link>
            <Link to="/FAQ" className='hover:underline'>FAQ</Link>
        </div>
     </div>
    </div>
  )
}
