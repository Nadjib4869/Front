import React from 'react'
import Navbar from '../Components/CustomNavbar';

const Faq = () => {
  return (
    <div>
        <Navbar />
        <main className='flex flex-col items-center justify-center gap-y-16'>
            <h1 className='mt-12 text-5xl font-semibold text-center'>Frequently Asked Questions (FAQ)</h1>
            <div className='flex flex-col px-36 gap-y-16 max-[951px]:px-24 max-[854px]:px-16 max-[800px]:px-4 max-[421px]:px-2'>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='text-4xl font-semibold text-blue-600'>Q</h2>
                        <h2 className='text-2xl font-semibold text-blue-600'>How do I create an event on Euvora?</h2>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='mb-8 text-4xl font-semibold opacity-80 max-[1026px]:mb-14 max-[450px]:mb-36'>A</h2>
                        <p className='text-xl font-medium opacity-80'>To create an event on Euvora, simply click on the "Create Event" button on the homepage. You will be prompted to provide details about your event, such as the title, description, date, time, and location.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='text-4xl font-semibold text-blue-600'>Q</h2>
                        <h2 className='text-2xl font-bold text-blue-600'>Can I join an event as a participant?</h2>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='mb-8 text-4xl font-semibold opacity-80 max-[1026px]:mb-14 max-[450px]:mb-36'>A</h2>
                        <p className='text-xl font-medium opacity-80'>To buy tickets for an event, click on the "Buy Tickets" button on the event page. You will be directed to a ticket purchase page where you can select the number of tickets you wish to purchase and complete the transaction.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='text-4xl font-semibold text-blue-600'>Q</h2>
                        <h2 className='text-2xl font-bold text-blue-600'>How do I buy tickets for an event?</h2>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='mb-8 text-4xl font-semibold opacity-80 max-[1026px]:mb-14 max-[450px]:mb-36'>A</h2>
                        <p className='text-xl font-medium opacity-80'>To buy tickets for an event, click on the "Buy Tickets" button on the event page. You will be directed to a ticket purchase page where you can select the number of tickets you wish to purchase and complete the transaction.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='text-4xl font-semibold text-blue-600'>Q</h2>
                        <h2 className='text-2xl font-bold text-blue-600'>How do I change my account settings?</h2>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='mb-8 text-4xl font-semibold opacity-80 max-[1026px]:mb-14 max-[450px]:mb-36'>A</h2>
                        <p className='text-xl font-medium opacity-80'>To change your account settings, log in to your Euvora account and go to the "Account Settings" page. From there, you can update your profile information, change your password, and manage your notifications.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='text-4xl font-semibold text-blue-600'>Q</h2>
                        <h2 className='text-2xl font-bold text-blue-600'>Is there a fee to use Euvora?</h2>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='text-4xl font-semibold opacity-80 max-[1026px]:mb-7 max-[450px]:mb-14'>A</h2>
                        <p className='text-xl font-medium opacity-80'>Euvora is free to use for both event organizers and participants. However, some events may charge a fee for tickets.</p>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex items-center gap-x-2'>
                        <h2 className='text-4xl font-semibold text-blue-600'>Q</h2>
                        <h2 className='text-2xl font-bold text-blue-600'>How do I report an issue with the website?</h2>
                    </div>
                    <div className='flex items-center mb-6 gap-x-2'>
                        <h2 className='text-4xl font-semibold opacity-80 max-[1026px]:mb-7 max-[450px]:mb-20'>A</h2>
                        <p className='text-xl font-medium opacity-80'>If you encounter any issues with the Euvora website, please contact us at Contact Us. We will do our best to resolve the issue as soon as possible.</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default Faq