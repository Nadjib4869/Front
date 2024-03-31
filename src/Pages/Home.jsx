import Navbar from '../../src/Components/HomeNavbar';
import HeroPatten from "../Assets/images/hero.png";
import waves from "../Assets/images/waves.png";
export default function Home() {
  return (
     <section className='home-container'>
        <div className='z-10 bg-cover bh'></div>
        <Navbar />
        <div className='relative home-banner-container '>
            <div className='absolute  hero bg-gradient-to-r from-white to-black'>
              <img src={HeroPatten} alt="" />
            </div>
            <div className='absolute top-0 z-20 h-[65vh]  w-screen overflow-hidden'>
              <img className='h-[850px] w-[90vw]' src={waves} alt="" />
            </div>
            <span className='absolute z-30 h-full mt-32 ml-16 text-white'>
              <h1 className='text-5xl'>
                  Welcome To Name.
              </h1>
              <h2 className='ml-10 italic font-extrabold'>
                  - Your Event Resource -
              </h2>
              <p className='mt-16'>
              We're your gateway to a world of incredible events and<br/>
              experiences. Whether you're seeking inspiration, 
              entertainement,<br/> or knowledge, our platform is your one-stop 
              destination for all<br/> things events.<br/><br/> 
              Thank you for choosing “NAME” as your event resource.<br/>
              We're here to connect you with the experiences that matter most to you.<br/><br/> 
              Let's embrace your event journey!
              </p>
            </span>
        </div>
    </section>
  )
}
