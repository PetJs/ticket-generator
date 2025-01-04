import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import patterLine from "../assets/images/pattern-lines.svg";
import patternTop from "../assets/images/pattern-squiggly-line-top.svg";
import patternCircle from "../assets/images/pattern-circle.svg";
import patternBottom from "../assets/images/pattern-squiggly-line-bottom.svg";
import Logo from "../assets/images/logo-mark.svg";
import patternTicket from "../assets/images/pattern-ticket.svg"
import githubb from "../assets/images/icon-github.svg"
import { DateLocation } from '@/types';

function TicketPage() {
  const location = useLocation();
  const { name, email, github, avatar } = location.state || {};
  const [dateInfo, setDateInfo] = useState<DateLocation>({
    month: '',
    year: 0,
    location: ''
  })
  const [number, setNumber] = useState('')

  useEffect(() => {
    const currentDate = new Date()

    const eventDate = new Date(currentDate)

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ]

    const locations = [
      'Nigeria, NA',
      'New York, NY',
      'Lagos, LA',
      'Ikotun, IK'
    ]
    const randomLocation = locations[Math.floor(Math.random() * locations.length)]
    const randomNumber = () => {
      const number = Math.floor(Math.random() * Math.pow(10, 6))
      return number.toString().padStart(7, "#")
    } 

    setNumber(randomNumber())

    setDateInfo({
      month: monthNames[eventDate.getMonth()],
      year: eventDate.getFullYear(),
      location: randomLocation
    })
  }, [])

  return (
    <div className="relative w-full h-screen bg-[url('./assets/images/background-desktop.png')] bg-cover bg-center overflow-auto">
      <div className="">
        <img src={patternCircle} alt="" className="fixed md:w-32 w-20 md:ml-6 md:-top-12 -top-6 md:left-0 -left-3" />
        <img src={patterLine} className="fixed inset-0" />
        <img src={patternTop} className="fixed top-6 right-0 mt md:w-80 w-28 " />
        <img src={patternCircle} alt="" className="fixed md:right-32 -right-10 md:w-32 w-20 md:mt-64 mt-36 " />
        <img src={patternBottom} alt="" className="fixed bottom-0 w-96" />
      </div>
      <div className="relative">
        <div className="text-white flex gap-4 justify-center items-center font-inconsolata m-4">
          <img src={Logo} alt="" />
          <h2 className="font-inconsolata font-semibold md:text-xl text-lg">Coding Conf</h2>
        </div>
        <div className="text-white flex flex-col justify-center items-center font-inconsolata m-4">
          <h1 className="md:text-5xl text-2xl max-w-lg mx-auto text-center font-semibold">
            Congrats, <span className="bg-gradient-to-r from-[#f37362] to-[#ffffff] bg-clip-text text-transparent">{name}!</span> Your ticket is ready.
          </h1>
          <p className="max-w-sm mx-auto text-center mt-4">
            We've emailed your ticket to <span className="bg-[#f37362] bg-clip-text text-transparent">{email}</span> and will send updates in the run up to the event
          </p>
        </div>
        <div className="text-white relative flex flex-col justify-center items-center w-80 md:w-96 absolute left-1/2 transform -translate-x-1/2 p-3 mt-10">
          <img src={patternTicket} alt="" />
          <div className=" flex absolute inset-1 top-0 m-6 gap-4">
            <img src={Logo} alt="" className="w-8 h-8" />
            <div>
              <h2 className="font-inconsolata font-semibold md:text-xl text-lg">Coding Conf</h2>
              <p>{dateInfo.month}, {dateInfo.year} / {dateInfo.location}</p>
            </div> 
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 flex items-center gap-2">
            {avatar && <img src={avatar} alt="Avatar" className="w-12 rounded-lg" />}
            <div className="font-inconsolata">
              <p className="text-lg">{name}</p>
              <div className="flex gap-2">
                <img src={githubb} alt="" />
                <p className="text-sm">{github}</p>
              </div>
            </div>
          </div>
          <div className='absolute right-5 rotate-90'>
            <p>{number}</p>
          </div>         
        </div>
      </div>  
      
    </div>
  );
}

export default TicketPage;
