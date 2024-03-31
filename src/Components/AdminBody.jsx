import AdminDashboard from "./AdminDashboard";
import AdminAnalytics from "./AdminAnalytics";
import AdminReport from "./AdminReport";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminBody({data}) {
    const [Dashboard , setDashboard] = useState(true);
    const [Analytics , setAnalytics] = useState(false);
    const [Report , setReport] = useState(false);
    const Navigate = useNavigate();
  return (
    <div className="flex  bg-blue-100 relative">
        <div className="flex-col pt-32 pb-32 bg-white h-full w-96 fixed">
            <div className= "pt-16 pb-64 flex flex-col gap-2 justify-center items-center">
                <span onClick={()=>{
                    setDashboard(true);
                    setAnalytics(false);
                    setReport(false);
                }} className={` text-xl font-medium pt-2 pb-2 cursor-pointer w-full text-center hover:rounded-xl ${Dashboard ? 'bg-blue-700 text-white  rounded-xl' : ''}`}>
                    Dashboard
                </span>
                <span onClick={()=>{
                    setDashboard(false);
                    setAnalytics(true);
                    setReport(false);
                }} className={` text-xl font-medium pt-2 pb-2 cursor-pointer w-full text-center hover:rounded-xl ${Analytics ? 'bg-blue-700 text-white  rounded-xl' : ''}`}>
                    Analytics
                </span>
                <span onClick={()=>{
                    setDashboard(false);
                    setAnalytics(false);
                    setReport(true);
                }} className={` text-xl font-medium pt-2 pb-2 cursor-pointer w-full text-center  hover:rounded-xl ${Report ? 'bg-blue-700 text-white  rounded-xl' : ''}`}>
                    Reports
                </span>
            </div>
            <p className="cursor-pointer text-2xl font-semibold text-center hover:scale-[1.01] " onClick={()=>{localStorage.clear() ; Navigate('/Login')}}>Log out</p>
        </div>
        {Dashboard && <AdminDashboard />}
        {Report && <AdminReport data={data} />}
        {Analytics && <AdminAnalytics data={data} />}



        </div>
  )
}
