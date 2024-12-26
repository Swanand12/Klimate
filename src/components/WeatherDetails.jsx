import { format } from 'date-fns'
import { Compass, Gauge, Sunrise, Sunset,} from 'lucide-react'
import React from 'react'

const WeatherDetails = ({weatherQuery}) => {

    const getWindDirection = (deg)=>{
        const direction = ["N","NW","W","SW","S","SE","E","NE"]

        const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8

        return direction[index]
    }

    

    const details = [
        {
            name:"Sunrise",
            icon:<Sunrise/>,        
            value:format(new Date(weatherQuery?.data?.sys?.sunrise * 1000), "HH:MMa")
        },
        {
            name:"Sunset",
            icon:<Sunset/>,        
            value:format(new Date(weatherQuery?.data?.sys?.sunset * 1000), "HH:MMa")
        },
        {
            name:"Wind Direction",
            icon:<Compass/>,
            value:`${getWindDirection(weatherQuery?.data?.wind?.deg)} ${weatherQuery?.data?.wind?.deg}°`
        },
        {
            name:"Pressure",
            icon:<Gauge/>,        
            value:`${weatherQuery?.data?.main?.pressure} hpa`
        },
    ]
    console.log("e:",format(new Date(weatherQuery?.data?.sys?.sunrise * 1000), "HH:MMa"))
  return (
    <div className='flex flex-col bg-black rounded-lg px-8 py-8 w-full h-[fit-content]'>
        <h1 className='font-semibold text-2xl pb-6'>Weather Details</h1>
        
            <div className='gap-8 grid grid-cols-2 '>
                {details.map((item,i)=>(
                <div key={i} className={`flex px-4 items-center py-2 border border-gray-500 rounded-lg text-${item.icon_color}`}>
                    {item.icon}
                    <div className='flex flex-col  pl-4'>
                        <p className='text-lg'>{item.name}</p>
                        <p className='text-gray-500'>{item.value}</p>
                    </div>
                </div>
                ))}
            </div>
       
    </div>
  )
}

export default WeatherDetails