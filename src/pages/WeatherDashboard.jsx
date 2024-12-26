import Layout from '@/components/Layout'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useGeoLocation } from '@/hooks/useGeoLocation'
import { useForecastQuery, useReverseCodingQuery, useWeatherQuery } from '@/hooks/useWeather'
import { MapPin, RefreshCcw, Terminal } from 'lucide-react'

import React from 'react'
import CurrentWeather from '@/components/CurrentWeather'
import HourlyTemperature from '@/components/HourlyTemperature'
import WeatherDetails from '@/components/WeatherDetails'
import WeatherForecast from '@/components/WeatherForecast'

const WeatherDashboard = () => {
    const {coordinates,isLoading:locationLoading,isError:locationError,geoLocation} = useGeoLocation()

    const weatherQuery = useWeatherQuery(coordinates)
    const forecastQuery = useForecastQuery(coordinates)
    const locationQuery = useReverseCodingQuery(coordinates)

    const handleRefresh = ()=>{
        geoLocation()
        if(coordinates){
            weatherQuery.refetch()
            forecastQuery.refetch()
            locationQuery.refetch()
        }
    }

    console.log("w:",weatherQuery.data)
    console.log("f:",forecastQuery.data)
    
    if(locationLoading){
        return <p className='text-white'>Loading...</p>
    }

    if(locationError){
        return(
            <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription>
              <p>{locationError}</p>
            </AlertDescription>
            <Button onClick={handleRefresh}>
                <MapPin/> Enable Location
            </Button>
          </Alert>
        )
    }

    if(!coordinates){
      return(
        <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription>
          <p>Please enable the location access to get your current location</p>
        </AlertDescription>
        <Button onClick={handleRefresh}>
            <MapPin/> Enable Location
        </Button>
      </Alert>
    )
    }

    const locationName = locationQuery?.data?.[0]

    if(!weatherQuery.data || !forecastQuery.data){
      return <p>Loading...</p>
    }

    if(weatherQuery?.error || forecastQuery?.error){
      return(
        <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Weather Fetching Error</AlertTitle>
        <AlertDescription>
          <p>Failed to fetch weather data. Please try again.</p>
        </AlertDescription>
        <Button onClick={handleRefresh}>
            <MapPin/> Retry
        </Button>
      </Alert>
    )
    }

    
    

  return (
    <Layout>
    <div className='text-white md_sm:px-20 xl:px-10 pb-10'>

      <div className='my-loaction '>
        <div className='flex justify-between items-center py-5'>
          <h1 className='text-xl font-semibold' >My Location</h1>
          <button onClick={handleRefresh} type='button' className='bg-black p-2.5 rounded-lg'>
            <RefreshCcw className={`${weatherQuery?.isFetching || forecastQuery?.isFetching || locationQuery?.isFetching  ? "animate-spin" : " "}`}/>
          </button>
        </div>
        <div className='flex flex-col gap-6'>
        <div className='flex xl:flex-row flex-col gap-5'>
          <CurrentWeather weatherQuery={weatherQuery} locationName={locationName}/>
          <WeatherDetails weatherQuery={weatherQuery}/>
        </div>

        <div className='flex xl_g:flex-row flex-col gap-5'>
          
          <HourlyTemperature forecastQuery={forecastQuery}/>
          <WeatherForecast forecastQuery={forecastQuery}/>
        </div>
        </div>
      </div>

    </div>
    </Layout>
  )
}

export default WeatherDashboard