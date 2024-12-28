import Layout from '@/components/Layout'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useForecastQuery, useReverseCodingQuery, useWeatherQuery } from '@/hooks/useWeather'
import { MapPin, RefreshCcw, Terminal } from 'lucide-react'
import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import CurrentWeather from '@/components/CurrentWeather'
import HourlyTemperature from '@/components/HourlyTemperature'
import WeatherDetails from '@/components/WeatherDetails'
import WeatherForecast from '@/components/WeatherForecast'
import { useLocation, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import WeatherSkeleton from '@/components/WeatherSkeleton'

const SearchCityWeather = () => {
    const [coordinates,setCoordinates] = useState(null)
    const weatherQuery = useWeatherQuery(coordinates)
    const forecastQuery = useForecastQuery(coordinates)
    const locationQuery = useReverseCodingQuery(coordinates)
    const [favourites,setFavourites] = useState([])
    const location = useLocation()
    const params = useParams()

  
    // Update coordinates whenever params.city changes
useEffect(() => {
  if (params.city) {
      const values = params.city.split("|");
      setCoordinates({ lat: values[1], lon: values[2] });
  }
}, [params.city]);

// Parse favourites data from local storage (runs once on mount)
useEffect(() => {
  const fav = JSON.parse(localStorage.getItem("favourites")) || [];
  setFavourites(fav);
}, []);

    useEffect(() => {
      if (coordinates) {
          weatherQuery.refetch();
          forecastQuery.refetch();
          locationQuery.refetch();
      }
  }, [coordinates]);

    // fetched data again
    const handleRefresh = ()=>{
        if(coordinates){
            weatherQuery.refetch()
            forecastQuery.refetch()
            locationQuery.refetch()
        }
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
      return <WeatherSkeleton/>
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

    // formating temperature
    const format = (temp) =>{
        return Math.round(temp)
      } 

    // adding city in favourites if exist otherwise removed
    const handleFavourites = () =>{

        const favouriteExist = favourites.find((f)=> f.lat + f.lon === coordinates.lat + coordinates.lon)
 
        if(favouriteExist){
            const updatedFavourites = favourites.filter((f)=> f.lat + f.lon !== coordinates.lat + coordinates.lon)
            setFavourites(updatedFavourites)
            localStorage.setItem("favourites",JSON.stringify(updatedFavourites))
            toast.success(`${locationName?.name} has been removed from your favorites.`,{
              style:{
                background:"#111",
                color:"#1D4Ed8",
              },
              iconTheme: {
                primary: '#1D4Ed8',
                secondary: '#fff',
              },
            });

        }
        else{
            const updateFavourites = [...favourites]
            updateFavourites.push({
                name:locationName?.name,
                state:locationName?.state,
                country:locationName?.country,
                temp:format(weatherQuery?.data?.main?.temp),
                feels_like:format(weatherQuery?.data?.main?.feels_like),
                lat:coordinates.lat,
                lon:coordinates.lon
            })
            console.log(updateFavourites)
            setFavourites(updateFavourites)
            localStorage.setItem("favourites",JSON.stringify(updateFavourites))
            toast.success(`${locationName?.name} has been added to your favorites!`,{
              style:{
                background:"#111",
                color:"#61d345",
              }});

        }
    }
    

  return (
    <Layout>
    <div className='text-white md_sm:px-20 xl:px-10 pb-10'>

      <div className='my-loaction '>
        <div className='flex justify-between items-center py-5'>
          <h1 className='text-xl font-semibold' >Searched Location</h1>
          <div className='flex items-center gap-4'>
          {location.pathname !== "/" && 
          <button onClick={handleFavourites} type='button' className='bg-black p-2.5 rounded-lg'>
            <FaStar size={25} className={`${favourites.find((f)=> f.lat + f.lon === coordinates.lat + coordinates.lon) ? "text-yellow-500" : "text-white"}`}/>
          </button>}
          <button onClick={handleRefresh} type='button' className='bg-black p-2.5 rounded-lg'>
            <RefreshCcw className={`${weatherQuery?.isFetching || forecastQuery?.isFetching || locationQuery?.isFetching  ? "animate-spin" : " "}`}/>
          </button>
          </div>
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

export default SearchCityWeather