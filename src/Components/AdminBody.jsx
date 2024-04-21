import AdminDashboard from "./AdminDashboard";
import AdminAnalytics from "./AdminAnalytics";
import AdminReport from "./AdminReport";
import menu from '../Assets/images/three_lines.png';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminBody({data}) {
    const [Dashboard , setDashboard] = useState(true);
    const [Analytics , setAnalytics] = useState(false);
    const [Report , setReport] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const Navigate = useNavigate();

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };
return (
    <div className="flex flex-col bg-blue-100">
            <div className={`flex flex-col pt-32 pb-32 bg-white h-full w-96 max-[1195px]:w-64 max-[1069px]:w-52 fixed max-lg:hidden`}>
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
            <div
                className={`flex flex-col pt-16 bg-white h-full w-96 max-[470px]:w-72 fixed lg:hidden ${
                     showSidebar ? "block" : "hidden"
                }`}
            >
                <img src={menu} className="h-12 w-12 lg:hidden hover:cursor-pointer" onClick={toggleSidebar} alt="" />
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
            <p className="pt-[70px] flex items-start" ></p>
            <img src={menu} className="h-12 w-12 lg:hidden hover:cursor-pointer" onClick={toggleSidebar} alt="" />

            {Dashboard && <AdminDashboard />}
            {Report && <AdminReport data={data} />}
            {Analytics && <AdminAnalytics data={data} />}

    </div>
)
}
