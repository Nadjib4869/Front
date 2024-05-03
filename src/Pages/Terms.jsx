import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Components/CustomNavbar';

const Terms = () => {
  return (
    <div>
        <Navbar />
        <main className=''>
            <div className='flex flex-col items-center justify-center mt-12 px-[500px] max-[1465px]:px-[400px] max-[1265px]:px-[300px] max-[1042px]:px-[200px] max-[823px]:px-[100px] max-[593px]:px-[50px] max-[494px]:px-[20px]'>
                <h1 className='text-2xl font-bold'>Terms of Service</h1>
                <p className='font-medium text-center'>Welcome to Euvora ("Website"). By accessing or using the Website, you agree to comply with and be bound by these terms and conditions ("Terms"). If you do not agree to these Terms, please do not use the Website.</p>
            </div>
            <div className='flex items-center justify-between mt-14 gap-x-16 max-[823px]:gap-x-8 max-[500px]:flex-col'>
                <div className='flex flex-col gap-y-8'>
                    <div className='flex flex-col items-center justify-center px-20 max-[1026px]:px-2'>
                        <h1 className='text-2xl font-bold'>Using of our Service</h1>
                        <ul className='font-medium list-disc list-inside'>
                            <li>You must be at least 18 years old to use the Website.</li>
                            <li>You agree to provide accurate and complete information when using the Website.</li>
                            <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                        </ul>
                    </div>
                    <div className='flex flex-col items-center justify-center px-20 max-[1026px]:px-2'>
                        <h1 className='text-2xl font-bold'>Ticketing</h1>
                        <ul className='font-medium list-disc list-inside'>
                            <li>The Website allows users to buy tickets for events.</li>
                            <li>All ticket sales are final and non-refundable, unless otherwise specified by the event organizer.</li>
                            <li>The Website is not responsible for any issues related to ticket purchases or event attendance.</li>
                        </ul>                    
                    </div>
                    <div className='flex flex-col items-center justify-center px-20 max-[1026px]:px-2'>
                        <h1 className='text-2xl font-bold'>Limitation of Liability</h1>
                        <ul className='font-medium list-disc list-inside'>
                            <li>Euvora is not liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of the Website..</li>
                        </ul>                     
                    </div>
                </div>
                <div className='flex flex-col gap-y-8'>
                    <div className='flex flex-col items-center justify-center px-20 max-[1026px]:px-2'>
                        <h1 className='text-2xl font-bold'>Events</h1>
                        <ul className='font-medium list-disc list-inside'>
                            <li>The Website allows users to create, join, and explore events.</li>
                            <li>Event creators are responsible for providing accurate information about their events.</li>
                            <li>The Website does not guarantee the accuracy, completeness, or reliability of any event information.</li>
                        </ul> 
                    </div>
                    <div className='flex flex-col items-center justify-center px-20 max-[1026px]:px-2'>
                        <h1 className='text-2xl font-bold'>Intellectual Property</h1>
                        <ul className='font-medium list-disc list-inside'>
                            <li>All content on the Website, including text, graphics, logos, and images, is the property of Euvora or its licensors.</li>
                            <li>You may not use, copy, reproduce, distribute, or display any content from the Website without the prior written consent of Euvora.</li>
                        </ul>                     
                    </div>
                    <div className='flex flex-col items-center justify-center px-20 max-[1026px]:px-2'>
                        <h1 className='text-2xl font-bold'>Changes to Terms</h1>
                        <ul className='font-medium list-disc list-inside'>
                            <li>Euvora is not liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of the Website.</li>
                        </ul>                    
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center mt-8 px-0 max-[1512px]:mb-4'>
                <h1 className='text-2xl font-bold'>Contact Us</h1>
                <div className='flex flex-row gap-x-1 max-[478px]:gap-x-0'>
                    <p className='font-medium text-center max-[542px]:text-sm'>If you have any questions about these Terms, please contact us at  </p>
                    <Link
                        to={`/Contact`}
                        className='font-medium text-red-600 underline hover:text-red-700 max-[542px]:text-sm'
                    >
                    Contact Us
                    </Link>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Terms