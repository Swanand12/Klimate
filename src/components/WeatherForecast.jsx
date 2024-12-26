import { format } from 'date-fns'
import { ArrowDown, ArrowUp } from 'lucide-react'
import React from 'react'
import { BiWind } from 'react-icons/bi'
import { FaTint } from 'react-icons/fa'

const WeatherForecast = ({forecastQuery}) => {

    console.log(forecastQuery)
    const daysForecast = forecastQuery?.data?.list.reduce((acc, forecast)=>{
        const date = format(new Date(forecast?.dt * 1000), "yyyy-MM-dd")
        
        if(!acc[date]){
            acc[date] = {
                date: forecast?.dt,
                temp_max: forecast?.main?.temp_max,
                temp_min: forecast?.main?.temp_min,
                weather: forecast?.weather,
                humidity: forecast?.main?.humidity,
                wind_speed: forecast?.wind?.speed
            }
        }
        else{
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast?.main?.temp_max)
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast?.main?.temp_min)
        }

        return acc
    },{})

    

    const nextDays = Object.values(daysForecast).slice(0,6)

    console.log(nextDays)

  return (
    <div className='flex px-8 py-6 flex-col bg-black xl_g:w-3/5 rounded-lg'>
        <h1 className='text-2xl font-semibold'>Next 6 Days Forecast</h1>
        <div className='flex flex-col gap-6 pt-6'>
            {nextDays.map((day,i)=>(
                <div key={i} className='grid grid-cols-3' >
                    <div className='flex flex-col'>
                        <p className=''>{format(new Date(day?.date * 1000), "EEE MM dd")}</p>
                        <p className='text-gray-500'>{day?.weather[0]?.description}</p>
                    </div>
                    <div className='flex gap-3 items-center '>
                        <div className='flex items-center gap-1 text-red-700 font-semibold'><ArrowUp size={20} strokeWidth={2}/>{Math.round(day.temp_max)}°</div>
                        <div className='flex items-center gap-1 text-blue-700 font-semibold'><ArrowDown size={20} strokeWidth={2}/>{Math.round(day.temp_min)}°</div>
                    </div>
                    <div className='flex gap-6 justify-end'>
                        <div className='flex items-center  gap-3'>
                            <FaTint/>
                            <div className='flex flex-col'>
                                <p >Humidity</p>
                                <p className='text-gray-500'>{day.humidity}%</p>
                            </div>
                        </div>
                        <div className='flex items-center min-w-[100px] gap-3'>
                            <BiWind />
                            <div className='flex flex-col'>
                                <p >Wind</p>
                                <p className='text-gray-500'>{day.wind_speed} m/s</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default WeatherForecast