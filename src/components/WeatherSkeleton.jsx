import React from 'react'
import { Skeleton } from './ui/skeleton'

const WeatherSkeleton = () => {
  return (
    <div className='bg-black h-[100vh] w-full text-white'>
        <Skeleton className="w-full p-4 h-[5rem] bg-gray-900 rounded-none"/>
        <div className='flex px-16 pt-10 gap-6'>
            <div className={"w-2/5 border-2 rounded-lg flex"}>
            <Skeleton className={"w-[10rem] bg-gray-700 m-5 h-[2rem]"}/>
            <Skeleton className={"w-[10rem] bg-gray-700 m-5 h-[2rem]"}/>
            </div>
            <Skeleton className={"w-3/5 h-[18rem] bg-gray-900 "}/>
        </div>
        <div className='flex px-16 pt-6  gap-6'>
            <Skeleton className={"w-2/5 h-[18rem] bg-gray-900 "}/>
            <Skeleton className={"w-3/5 h-[18rem] bg-gray-900 "}/>
        </div>
    </div>
  )
}

export default WeatherSkeleton