import { useState } from "react"
import LineChartDay from "./LineChartDay"
import LineChartMonth from "./LineChartMonth";
import LineChartYear from "./LineChartYear";
export default function AdminAnalytics() {
  const [style1,setStyle1] = useState('font-bold text-cyan-900 underline');
  const [style2,setStyle2] = useState('');
  const [style3,setStyle3] = useState('');
  const[day , setDay] = useState(true);
  const[Month , setMonth] = useState(false);
  const[Year , setYear] = useState(false);
  const DAY =()=>{
    setDay(true);
    setMonth(false);
    setYear(false);
    setStyle1('font-bold text-cyan-900 underline');
    setStyle2('');
    setStyle3('');
  }
  const MONTH =()=>{
    setDay(false);
    setMonth(true);
    setYear(false);
    setStyle1('');
    setStyle2('font-bold text-cyan-900 underline');
    setStyle3('');
  }
  const YEAR =()=>{
    setDay(false);
    setMonth(false);
    setYear(true);
    setStyle1('');
    setStyle2('');
    setStyle3('font-bold text-cyan-900 underline');
  }
  return (
    <div className="ps-96 text-xl pt-32 h-screen">
      <div className="flex items-center justify-between ps-4 w-full  pb-4">
        <h1 className="text-2xl font-semibold">Event Created :</h1>
        <div>
          <span className="text-lg font-semibold">Per : </span>
        <span className={` w-16 h-8 text-sm cursor-pointer ${style1} `} onClick={()=>DAY()}>DAY </span>
        -
        <span className={` w-16 h-8 text-sm cursor-pointer ${style2} `} onClick={()=>MONTH()}> MONTH </span>
        -
        <span className={` w-16 h-8 text-sm cursor-pointer ${style3} `} onClick={()=>YEAR()}> YEAR</span>
        </div>
      </div>
      <div className="w-[900px]">
      {day && <LineChartDay/>}
      {Month && <LineChartMonth/>}
      {Year && <LineChartYear/>}

      </div>
    </div>
  )
}
