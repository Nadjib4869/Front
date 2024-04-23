import {Link} from 'react-router-dom'
import logo from "../Assets/Logo.png";
import { Link as ScrollLink } from 'react-scroll';


export default function Footer () {
   const token = localStorage.getItem('token');
  return (
    <span>
     <div className="flex justify-center p-16 border-b sm:items-center sm:justify-between bg-footer border-gold">
        <img src={logo} alt="Logo" className='h-10 w-18' />
        <div className="hidden sm:flex sm:gap-1">
         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="23" viewBox="0 0 30 23" fill="none">
               <path d="M0 0V3.71911L14.8765 11.1573L29.7529 3.71911V0H0ZM0 7.43823V22.3147H29.7529V7.43823L14.8765 14.8765L0 7.43823Z" fill="white"/>
         </svg>
         <p className="text-base text-white ">event.hub@gmail.dz</p>
        </div>
        <div className="hidden sm:flex sm:gap-4">
           { !token && <Link to="/SignUp" className="flex items-center h-8 font-medium bg-gold hover:bg-gold2 rounded-2xl pe-5 ps-5" ><p>Sign Up</p></Link>}
           { !token && <Link to="/Login" className="flex items-center h-8 font-medium bg-white hover:bg-gray-200 rounded-2xl pe-6 ps-6" ><p>Log in</p></Link>}
        </div>
     </div>
     <div className="flex-col items-center justify-center pt-8 pb-8 bg-footer2 ps-16 pe-16 max-sm:flex max-sm:gap-y-4 sm:justify-around">
         <div className='max-sm:mt-10'>
            { !token && (
               <>
               <div className="flex gap-4 sm:hidden">
                  <Link to="/SignUp" className="flex items-center h-8 font-medium bg-gold hover:bg-gold2 rounded-2xl pe-5 ps-5">
                     <p>Sign Up</p>
                  </Link>
                  <Link to="/Login" className="flex items-center h-8 font-medium bg-white hover:bg-gray-200 rounded-2xl pe-6 ps-6">
                     <p>Log in</p>
                  </Link>
               </div>
               <div className="flex gap-1 sm:hidden max-sm:mt-20">
               <svg xmlns="http://www.w3.org/2000/svg" width="30" height="23" viewBox="0 0 30 23" fill="none">
                  <path d="M0 0V3.71911L14.8765 11.1573L29.7529 3.71911V0H0ZM0 7.43823V22.3147H29.7529V7.43823L14.8765 14.8765L0 7.43823Z" fill="white"/>
               </svg>
               <p className="text-base text-white ">event.hub@gmail.dz</p>
            </div>
            </>
            )}
            { token && <div className="flex gap-1 sm:hidden max-sm:justify-center max-sm:mb-12">
               <svg xmlns="http://www.w3.org/2000/svg" width="30" height="23" viewBox="0 0 30 23" fill="none">
                  <path d="M0 0V3.71911L14.8765 11.1573L29.7529 3.71911V0H0ZM0 7.43823V22.3147H29.7529V7.43823L14.8765 14.8765L0 7.43823Z" fill="white"/>
               </svg>
               <p className="text-base text-white ">event.hub@gmail.dz</p>
            </div> }
         </div>
        <div className='flex flex-col justify-around text-base text-white sm:flex-row sm:items-center max-sm:gap-y-6'> 
            <ScrollLink
               to="section" // the id of the div you want to scroll to
               smooth={true}
               duration={500}
               className='cursor-pointer hover:underline'
               >
               Explore
            </ScrollLink>
            <Link to="/Contact" className='hover:underline'>Contact</Link>
            <Link to="/About" className='hover:underline'>About</Link>
            <Link to="/TermOfUse" className='hover:underline'>Terms Of Use</Link>
            <Link to="/FAQ" className='hover:underline'>FAQ</Link>
        </div>
     </div>
    </span>
  )
}
