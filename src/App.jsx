import Home from "./Pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import { useState, useEffect } from 'react';
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Footer from "./Components/Footer";
import Categories from "./Components/Categories";
import Notfound from "./Pages/notfound";
import { ProfileImageProvider } from "./Components/ProfileImageContext";
import Profile from "./Pages/Profile";
import CreateEvent from "./Pages/CreateEvent";
import EventPage from './Pages/EventPage';
import EditEvent from './Pages/EditEvent';
import EditProfile from "./Pages/EditProfile";
import UserProfile from "./Pages/UserProfile";
import { QueryClient, QueryClientProvider } from 'react-query';
import Preference from "./Components/preference";

const queryClient = new QueryClient();

const FirstPage = () => {
  return (
    <div>
      <Home />
      <Categories />
      <Footer />
    </div>
  );
};

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      const alreadyReloaded = localStorage.getItem('alreadyReloaded');
      if (!alreadyReloaded) {
        localStorage.setItem('alreadyReloaded', true);
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProfileImageProvider>
          <Routes >
            <>
                <Route path="/Admin" element={<Admin />} />
                <Route path="/" element={<FirstPage />} />
                <Route path="/Contact" element={<SignUp />} />
                <Route path="/About" element={<SignUp />} />
                <Route path="/FAQ" element={<SignUp />} />
                <Route path="/TermOfUse" element={<SignUp />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Preference" element={<Preference />} />
                <Route path="/Profile/:id" element={<Profile />} />
                <Route path="/EditEvent/:id" element={<EditEvent />} />
                <Route path="/CreateEvent" element={<CreateEvent />} />
                <Route path="/EventPage/:id" element={<EventPage />} />
                <Route path="/UserProfile/:id" element={<UserProfile />} />
                <Route path="/EditProfile/:id" element={<EditProfile />} />
                <Route path="/*" element={<Notfound />} />
              </>
          </Routes>
        </ProfileImageProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;