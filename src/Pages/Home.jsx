import Navbar from '../../src/Components/HomeNavbar';
import HeroPatten from "../Assets/images/hero.png";
import waves from "../Assets/images/waves.png";
import { useEffect, useState } from 'react';

export default function Home() {
  const [heightClass, setHeightClass] = useState('');

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      if (windowHeight < 650) {
        setHeightClass('h-[81vh]');
      } else {
        setHeightClass('h-[65vh]');
      }
    };
  
    // Run the function once to set the initial height class
    handleResize();
  
    // Add the event listener
    window.addEventListener('resize', handleResize);
  
    // Clean up function
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
    return (
     <section className={`home-container ${heightClass}`}>
        <div className={`z-10 bg-cover bh ${heightClass}`}></div>
        <Navbar />
        <div className='relative home-banner-container '>
            <div className={`absolute ${heightClass} hero bg-gradient-to-r from-white to-black`}>
              <img src={HeroPatten} alt="" />
            </div>
            <div className={`absolute top-0 z-20 ${heightClass} w-screen overflow-hidden`}>
              <img className='h-[850px] w-[90vw]' src={waves} alt="" />
            </div>
            <div className='absolute z-30 h-32 mt-32 ml-16 max-[600px]:ml-8 max-[552px]:ml-2 max-[464px]:mt-20 text-white'>
                <h1 className='text-5xl'>
                    Welcome To EUVORA
                </h1>
              <h2 className='ml-10 italic font-extrabold'>
                  - Your Event Resource -
              </h2>
              <p className='mt-16 text-wrap w-2/5 max-[1062px]:w-3/5 max-sm:w-4/5 max-[395px]:w-full max-[727px]:mt-6 max-[403px]:mt-6'>
              We're your gateway to a world of incredible events and
              experiences. Whether you're seeking inspiration, 
              entertainement, or knowledge, our platform is your one-stop 
              destination for all things events.<br/><br/> 
              Thank you for choosing EUVORA as your event resource.<br/>
              We're here to connect you with the experiences that matter most to you.<br/><br/> 
              Let's embrace your event journey!
              </p>
            </div>
        </div>
    </section>
  )
}
