import { Link } from "react-router-dom";
export default function AdminHeader() {
  return (
    <div className="flex bg-white justify-between items-center pt-4 pb-4 pe-8 ps-8  shadow-sm fixed top-0 w-full z-50">
        <h1 className="text-2xl font-bold  ">NAME</h1>
        <div className="flex gap-14">
        <Link className="hover:underline" to="/">Explore</Link>
        <Link className="hover:underline" to="/">About</Link>
        <Link className="hover:underline" to="/">Contact</Link>
        </div>
    </div>
  )
}
