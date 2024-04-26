import React, {useEffect, useState} from 'react';
import Navbar from '../Components/CustomNavbar';
import event from '../Assets/event.png';
import create from '../Assets/create.png';
import join from '../Assets/join.png';
import discover from '../Assets/discover.png';

const About = () => {
  return (
    <div>
      <Navbar />
      <main>
        <header className='relative'>
          <div className='absolute flex items-center justify-center w-full h-full'>
            <h1 className='text-6xl max-[745px]:text-5xl max-[613px]:text-4xl max-[445px]:text-3xl max-[369px]:font-semibold font-bold text-center text-white'>Uniting People From All <br/> Around The World!</h1>
          </div>  
          <img src={event} alt="Event" className='h-[570px] max-[842px]:h-[500px] max-[712px]:h-[430px] max-[640px]:h-[360px] max-[502px]:h-[290px] max-[402px]:h-[260px] justify-center items-center w-full px-16 py-4 max-[500px]:px-0 max-[640px]:py-0 max-[1260px]:px-2' />          
        </header>
        <section className='px-8 max-[626px]:px-6 max-[587px]:px-4 max-[480px]:px-2 py-6 max-[850px]:py-4 max-[700px]:py-2 bg-blue-600 h-fit rounded-3xl mx-28 max-[1260px]:mx-12 max-[540px]:mx-8 max-[490px]:mx-6'>
            <article className='flex flex-col items-center justify-center text-lg max-[712px]:text-base max-[540px]:text-sm font-semibold text-center text-white'>
                Euvora is a vibrant and dynamic event platform designed to bring people together from across the globe and within local communities. Whether you're looking to host an event, join an existing one, or simply explore the diverse range of activities available, Euvora provides a seamless and interactive experience. With the ability to unite individuals online and in real life, Euvora offers a unique opportunity to connect with others, share experiences, and create unforgettable memories. Purchase tickets, create your own events, and discover new adventures with Euvora.
            </article>
        </section>

        <div className='flex flex-row items-center justify-center mt-[54px] max-[640px]:mt-[40px] mb-12 gap-x-20 max-[1260px]:gap-x-12 max-[1073px]:gap-x-4 max-[540px]:flex-col max-[540px]:gap-y-6'>
            <img src={discover} alt="" className='cursor-pointer h-[330px] w-[330px] max-[1260px]:h-[300px] max-[1260px]:w-[300px] max-[1027px]:h-[280px] max-[1027px]:w-[280px] max-[980px]:h-[240px] max-[980px]:w-[240px] max-[772px]:h-[200px] max-[772px]:w-[200px] max-[660px]:h-[180px] max-[660px]:w-[180px] max-[600px]:h-[160px] max-[600px]:w-[160px]' />
            <img src={join} alt="" className='cursor-pointer h-[330px] w-[330px] max-[1260px]:h-[300px] max-[1260px]:w-[300px] max-[1027px]:h-[280px] max-[1027px]:w-[280px] max-[980px]:h-[240px] max-[980px]:w-[240px] max-[772px]:h-[200px] max-[772px]:w-[200px] max-[660px]:h-[180px] max-[660px]:w-[180px] max-[600px]:h-[160px] max-[600px]:w-[160px]' />
            <img src={create} alt="" className='cursor-pointer h-[330px] w-[330px] max-[1260px]:h-[300px] max-[1260px]:w-[300px] max-[1027px]:h-[280px] max-[1027px]:w-[280px] max-[980px]:h-[240px] max-[980px]:w-[240px] max-[772px]:h-[200px] max-[772px]:w-[200px] max-[660px]:h-[180px] max-[660px]:w-[180px] max-[600px]:h-[160px] max-[600px]:w-[160px]' />
        </div>
        
      </main>
    </div>
  )
}

export default About;