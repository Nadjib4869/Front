import {Link} from 'react-router-dom'
export default function Footer () {
   const token = localStorage.getItem('token');
  return (
    <span>
     <div className="flex justify-center sm:items-center sm:justify-between bg-footer p-16 border-b border-gold">
        <h1 className="text-3xl font-bold text-white">NAME</h1>
        <div className="hidden sm:flex sm:gap-1">
         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="23" viewBox="0 0 30 23" fill="none">
               <path d="M0 0V3.71911L14.8765 11.1573L29.7529 3.71911V0H0ZM0 7.43823V22.3147H29.7529V7.43823L14.8765 14.8765L0 7.43823Z" fill="white"/>
         </svg>
         <p className="text-white text-base ">event.hub@gmail.dz</p>
        </div>
        <div className="hidden sm:flex sm:gap-4">
           { !token && <Link to="/SignUp" className="bg-gold hover:bg-gold2  rounded-2xl font-medium pe-5 ps-5 h-8 flex items-center" ><p>Sign Up</p></Link>}
           { !token && <Link to="/Login" className="bg-white hover:bg-gray-200 rounded-2xl font-medium pe-6 ps-6 h-8 flex items-center" ><p>Log in</p></Link>}
        </div>
     </div>
     <div className="bg-footer2 pt-8 pb-8 ps-16 pe-16 max-sm:flex max-sm:gap-y-4 flex-col justify-center sm:justify-around items-center">
         <div className='max-sm:mt-10'>
            { !token && (
               <>
               <div className="sm:hidden flex gap-4">
                  <Link to="/SignUp" className="bg-gold hover:bg-gold2 rounded-2xl font-medium pe-5 ps-5 h-8 flex items-center">
                     <p>Sign Up</p>
                  </Link>
                  <Link to="/Login" className="bg-white hover:bg-gray-200 rounded-2xl font-medium pe-6 ps-6 h-8 flex items-center">
                     <p>Log in</p>
                  </Link>
               </div>
               <div className="sm:hidden flex gap-1 max-sm:mt-20">
               <svg xmlns="http://www.w3.org/2000/svg" width="30" height="23" viewBox="0 0 30 23" fill="none">
                  <path d="M0 0V3.71911L14.8765 11.1573L29.7529 3.71911V0H0ZM0 7.43823V22.3147H29.7529V7.43823L14.8765 14.8765L0 7.43823Z" fill="white"/>
               </svg>
               <p className="text-white text-base ">event.hub@gmail.dz</p>
            </div>
            </>
            )}
            { token && <div className="sm:hidden flex max-sm:justify-center gap-1 max-sm:mb-12">
               <svg xmlns="http://www.w3.org/2000/svg" width="30" height="23" viewBox="0 0 30 23" fill="none">
                  <path d="M0 0V3.71911L14.8765 11.1573L29.7529 3.71911V0H0ZM0 7.43823V22.3147H29.7529V7.43823L14.8765 14.8765L0 7.43823Z" fill="white"/>
               </svg>
               <p className="text-white text-base ">event.hub@gmail.dz</p>
            </div> }
         </div>
        <div className='text-white text-base flex flex-col sm:flex-row justify-around sm:items-center max-sm:gap-y-6'> 
            <Link to="/Explore" className='hover:underline'>Explore</Link>
            <Link to="/Contact" className='hover:underline'>Contact</Link>
            <Link to="/About" className='hover:underline'>About</Link>
            <Link to="/TermOfUse" className='hover:underline'>Terms Of Use</Link>
            <Link to="/FAQ" className='hover:underline'>FAQ</Link>
        </div>
     </div>
    </span>
  )
}
