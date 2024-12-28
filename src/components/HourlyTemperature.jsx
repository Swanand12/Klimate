import React from 'react'
import { format } from './../../node_modules/date-fns/format';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const HourlyTemperature = ({forecastQuery}) => {

  // data for graph
  const chartData = forecastQuery?.data?.list.slice(0,8).map((n)=>({
    temp:Math.round(n?.main?.temp),
    feels_like: Math.round(n?.main?.feels_like),
    time:format(new Date(n?.dt * 1000),"ha")
}))


  return (
    <div className='xl:min-w-[580px]  h-full font-semibold bg-black px-8 py-6 rounded-lg'>
      <h1 className='text-2xl'>Today's Temperature Forecast</h1>
      <div className=''>
      <ResponsiveContainer width="100%" height={220}>
      <LineChart  data={chartData} margin={{top:30}}>
        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        <Line type="monotone" strokeDasharray={4} stroke="#FFFFFF" dataKey="feels_like" />
        <XAxis padding={{left:30, right:30}} axisLine={false} tickLine={false} dataKey="time"/>
        <YAxis axisLine={false} tickLine={false} padding={{right:100}} tickFormatter={(value)=> `${value}°`}/>
        <Tooltip content={({active, payload})=>{
          if(active && payload && payload.length){
            return(
              <div className='bg-[#111] p-2 text-sm gap-3 font-semib0ld flex shadow-xl rounded-lg'>
                <div className='flex flex-col'>
                  <p className='tracking-wide'>Temperature</p>
                  <p>{payload[0].value}°</p>
                </div>
                <div className='flex flex-col'>
                  <p className='tracking-wide'>Feels_Like</p>
                  <p>{payload[1].value}°</p>
                </div>
              </div>
            )
          }
        }}/>
      </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}

export default HourlyTemperature