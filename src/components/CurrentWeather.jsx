import React from 'react'
import { FaTint } from "react-icons/fa";
import { BiWind } from "react-icons/bi";
import { ArrowDown, ArrowUp } from 'lucide-react';

const CurrentWeather = ({weatherQuery, locationName}) => {
  
  // format temaperature
    const format = (temp) =>{
        return Math.round(temp)
      }

  return (
    <div className='min-w-[550px] bg-black flex gap-10 px-8 py-6 rounded-lg'>
            <div className='flex flex-col '>
              <div className='flex gap-4 items-end font-semibold'>
                <p className='text-2xl'>{locationName?.name}</p>
                <p className='text-gray-500'>{locationName?.state}</p>
              </div>
              <p className='text-sm pt-3 text-gray-500 font-semibold'>{locationName?.country}</p>
              <div className='flex gap-5 items-center'>
                <h1 className='text-[5rem] font-bold leading-tight'>{format(weatherQuery?.data?.main?.temp)}&deg;</h1>
                <div className='flex flex-col gap-1 justify-start items-center'>
                  <p className='text-gray-500 font-semibold text-lg'>Feels like {format(weatherQuery?.data?.main?.feels_like)}&deg;</p>
                  <div className='flex gap-1.5'>
                    <div className='flex items-center gap-1 text-blue-700 font-semibold text-lg'>
                        <ArrowDown size={20} strokeWidth={3}/>
                        {format(weatherQuery?.data?.main?.temp_min)}&deg;
                    </div>
                    <div className='flex items-center gap-1 text-red-700 font-semibold text-lg'>
                        <ArrowUp size={20} strokeWidth={3}/>
                        {format(weatherQuery?.data?.main?.temp_max)}&deg;
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex pt-4 gap-6 '>
                  <div className='flex items-center  gap-3 font-semibold'>
                    <FaTint/>
                    <div className='flex flex-col'>
                      <p >Humidity</p>
                      <p className='text-gray-500'>{weatherQuery?.data?.main?.humidity}%</p>
                    </div>
                  </div>
                  <div className='flex items-center  gap-3 font-semibold'>
                    <BiWind />
                    <div className='flex flex-col'>
                      <p >Wind Speed</p>
                      <p className='text-gray-500'>{weatherQuery?.data?.wind?.speed} m/s</p>
                    </div>
                  </div>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <img className='w-[200px]' src={`https://openweathermap.org/img/wn/${weatherQuery?.data?.weather[0]?.icon}@2x.png`} alt='weather-img'/>
              <h1 className='font-semibold capitalize'>{weatherQuery?.data?.weather[0]?.description}</h1>
            </div>
          </div>
  )
}

export default CurrentWeather