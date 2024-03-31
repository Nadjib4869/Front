import {Link } from "react-router-dom";
import alert from "../Assets/alerte.png"
export default function Notfound() {
  return (
    <div className="bg-gray-100 w-screen h-screen flex flex-col justify-center items-center">
        <img className="w-[170px] h-[200px] pb-10" src={alert} alt="alert" />
        <h1 className="text-4xl text-black font-bold pb-4">Oops, Page not found</h1>
        <p className="text-gray-500 text-lg pb-10">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link to="/" className="text-black font-bold cursor-pointer text-2xl hover:underline">Go Home</Link>
    </div>
  )
}
