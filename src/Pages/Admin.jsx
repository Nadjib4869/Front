import AdminHeader from "../Components/AdminHeader"
import { useQuery } from 'react-query';
import AdminBody from "../Components/AdminBody"
import Loading from "../Components/Loading";
import Notfound from "./notfound";
async function fetchAdminInfo() {
  const id = localStorage.getItem('userId')
  console.log(id)
  const response = await fetch(`http://localhost:8000/Admin/${id}`); // Assuming your API endpoint is '/api/admin'
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}
export default function Admin() {
  const { data, isLoading, isError } = useQuery(['adminInfo'], fetchAdminInfo);

  if (isLoading) return <div className="relative h-screen w-screen"><Loading/></div>
  if (isError) return <Notfound/>;
  return (
    <>
    <AdminHeader/>
    <AdminBody   data={data} />
    </>
  )
}
