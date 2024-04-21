import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function AdminReport({ data }) {
  const [CardsData, setCardsData] = useState(data.reports);
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const queryClient = useQueryClient();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleLocationInputChange = (e) => {
    setLocationInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your filtering logic here
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const sendWarningMutation = useMutation(
    async (id) => {
      const response = await axios.put(`http://localhost:8000/warnUser/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("reports");
      },
    }
  );

  const handleSendWarning = async (eventId) => {
    try {
      await sendWarningMutation.mutateAsync(eventId);
      // If successful, you can perform any necessary actions, like refetching data
    } catch (error) {
      console.error("Error sending warning:", error);
    }
  };

  return (
    <div className="lg:max-[1096px]:ps-[208px] min-[1096px]:max-[1195px]:ps-64 min-[1195px]:ps-96">
      <form className="sm:ps-8 max-sm:ps-2 max-sm:pe-2 flex max-sm:flex-col lg:pt-10 gap-y-2" onSubmit={handleSubmit}>
        <div className="rounded-2xl shadow-md bg-white w-[400px] max-sm:w-full flex gap-2 justify-center items-center ps-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g opacity="0.5">
            <circle cx="5.78721" cy="5.78721" r="5.09339" stroke="black" stroke-width="1.38765"/>
            <path d="M13.653 14.7359C14.0594 15.1424 14.7184 15.1423 15.1248 14.7359C15.5312 14.3294 15.5312 13.6705 15.1247 13.2641L13.653 14.7359ZM15.1247 13.2641L10.4442 8.58378L8.97243 10.0556L13.653 14.7359L15.1247 13.2641Z" fill="black"/>
            </g>
          </svg>
          <input
            className="focus:outline-none focus:border-none border-none text-md p-2 w-[350px] max-[434px]:w-[280px]"
            type="text"
            placeholder="Search by event name, username, keywords"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        <input
          className="focus:outline-none focus:border-none border-none w-[150px] sm:ms-8 rounded-2xl shadow-md text-md py-2 px-4"
          type="text"
          placeholder="Location"
          value={locationInput}
          onChange={handleLocationInputChange}
          onKeyPress={handleKeyPress}
        />
      </form>
      <div className="sm:ps-16 max-sm:ps-2 sm:pe-16 max-sm:pe-2 pb-2 pt-8 flex justify-between">
        <p className="text-gray-800 font-semibold text-lg">
          There is <span className="text-blue-700 font-bold">{CardsData.length}</span> events found
        </p>
        <p className="text-gray-800 font-semibold text-lg">
          Sort by:<span className="text-md text-blue-700 font-bold">Date</span>
        </p>
      </div>
      {CardsData.length !== 0 && (
        <div className="border-2 ms-4 mb-8 bg-gray-100 rounded-lg border-gray-300 flex flex-col justify-center items-center gap-4 p-4">
          {CardsData.map((card) => (
            <div className=" bg-gray-200 flex justify-center items-center p-4 rounded-md border-2 w-full border-gray-300" key={card.id}>
              <img className="w-[200px] h-[180px] basis-1/4 cursor-pointer" src={card.event?.image} onClick={() => handleSendWarning(card.event._id)} alt="" />
              <div className=" basis-1/2 ps-8 pe-8 w-fit">
                <h1 className="text-3xl text-black font-bold pb-4">{card.event?.title}</h1>
                <div className="pb-4">
                  <p className="text-lg font-medium text-gray-600">Report Reason : {card.reason}</p>
                  <p className="text-lg font-medium text-yellow-600">{card.date}</p>
                </div>
              </div>
              <div className=" basis-1/4 flex flex-col items-center gap-2">
                <button className="border-none p-1 text-lg bg-red-700 rounded-lg text-white w-32 hover:scale-[1.05] transition duration-500">Delete Event</button>
                <button className="border-none p-1 text-lg bg-slate-400 rounded-lg text-white w-32  hover:scale-[1.05] transition duration-500" onClick={() => handleSendWarning(card.event._id)}>Send Warning</button>
                <button className="border-none p-1 text-lg bg-slate-400 rounded-lg text-white w-32 mb-4 hover:scale-[1.05] transition duration-500">Delete Report</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {CardsData.length < 3 && <span className="h-screen block"></span>}
    </div>
  );
}
