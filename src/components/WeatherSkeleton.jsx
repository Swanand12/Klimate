import React from 'react'
import { Skeleton } from './ui/skeleton'

const WeatherSkeleton = () => {
  return (
    <div className='bg-black flex flex-col h-[100vh] w-full text-white'>

        <div className='flex px-10 py-3 bg-gray-600 justify-between items-center'>
            <Skeleton className={"w-[6rem] h-[4rem] bg-[#111]"}/>
            <Skeleton className={"w-[15rem] h-[2rem] bg-[#111]"}/>
        </div>

        <div className='px-10 py-6'>
          <Skeleton className={"w-[12rem] h-[2rem] bg-[#111]"}/>
        </div>
        <div className='overflow-hidden flex gap-10 scrollable mx-10'>

            {Array.from({length:4}).map((_,i)=>(

              <div className='flex flex-col gap-3 mb-5 bg-gray-600 rounded-lg w-[fit-content] p-3'>
                <div className='flex gap-4 items-end '>
                  <Skeleton className={"w-[8rem] h-[1.7rem] bg-[#111]"}/>
                  <Skeleton className={"w-[6rem] h-[1.3rem] bg-[#111]"}/>
                </div>
                <div className=''>
                  <Skeleton className={"w-8 h-6 bg-[#111]"}/>
                </div>
                <div className='flex gap-4'>
                  <Skeleton className={"w-[8rem] h-[1.3rem] bg-[#111]"}/>
                  <Skeleton className={"w-[8rem] h-[1.3rem] bg-[#111]"}/>
                </div>
              </div>
            ))}
          
        </div>

        <div className='px-10 py-6'>
          <Skeleton className={"w-[12rem] h-[2rem] bg-[#111]"}/>
        </div>
        
        <div className='flex justify-between px-10 gap-10'>
        <div className='flex bg-gray-600 lg:justify-normal justify-between w-full lg:w-[fit-content] rounded-lg p-4 '>
          <div className='flex flex-col gap-3'>
            <div className='flex gap-4 items-end '>
                  <Skeleton className={"w-[8rem] h-[1.7rem] bg-[#111]"}/>
                  <Skeleton className={"w-[6rem] h-[1.3rem] bg-[#111]"}/>
            </div>
            <div className=''>
                  <Skeleton className={"w-8 h-6 bg-[#111]"}/>
            </div>
            <div className='flex gap-4'>
              <Skeleton className={"w-[5rem] h-[5rem] bg-[#111]"}/>
              <div className='flex flex-col justify-center gap-4'>
                <Skeleton className={"w-[8rem] h-[1.3rem] bg-[#111]"}/>
                <div className='flex gap-3'>
                  <Skeleton className={"w-[4rem] h-[1.3rem] bg-[#111]"}/>
                  <Skeleton className={"w-[4rem] h-[1.3rem] bg-[#111]"}/>
                </div>
              </div>
            </div>
            <div className='flex pt-4 gap-4'>
              <div className='flex flex-col gap-3'>
                <Skeleton className={"w-[8rem] h-[1.3rem] bg-[#111]"}/>
                <Skeleton className={"w-[8rem] h-[1.3rem] bg-[#111]"}/>
              </div>
              <div className='flex flex-col gap-3'>
                <Skeleton className={"w-[8rem] h-[1.3rem] bg-[#111]"}/>
                <Skeleton className={"w-[8rem] h-[1.3rem] bg-[#111]"}/>
              </div>
            </div>
          </div>
          <div className='flex flex-col px-8 justify-center w-1/2 items-center gap-6'>
            <Skeleton className={"w-[7rem] h-[7rem] bg-[#111]"}/>
            <Skeleton className={"w-[4rem] h-[1.3rem] bg-[#111]"}/>
          </div>
        </div>

        <div className='w-full bg-gray-600 rounded-lg hidden lg:flex p-10 gap-3'>
            <Skeleton className={"h-full w-[1rem] bg-[#111]"}/>
            <div className='flex flex-col gap-3 w-full'>
              <Skeleton className={"w-[100%] h-[1rem] bg-[#111]"}/>
              <Skeleton className={"w-[100%] h-[1rem] bg-[#111]"}/>
              <Skeleton className={"w-[100%] h-[1rem] bg-[#111]"}/>
              <Skeleton className={"w-[100%] h-[1rem] bg-[#111]"}/>
              <Skeleton className={"w-[100%] h-[1rem] bg-[#111]"}/>
              <Skeleton className={"w-[100%] h-[1rem] bg-[#111]"}/>
              <Skeleton className={"w-[100%] h-[1rem] bg-[#111]"}/>
              <Skeleton className={"w-[100%] h-[1rem] bg-[#111]"}/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default WeatherSkeleton