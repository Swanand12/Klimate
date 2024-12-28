import React, { useEffect, useState } from 'react'
import { WiHot } from "react-icons/wi";
import { WiDayCloudy } from "react-icons/wi";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Favourites = () => {
    const [favourites,setFavourites] = useState([])
    const navigate = useNavigate()

    // fetch favourites from localstorage
    useEffect(()=>{
        const parsedFavourites = JSON.parse(localStorage.getItem("favourites"))
        parsedFavourites && setFavourites(parsedFavourites.reverse())
    },[])

    // remove city from favourites
    const handleRemoveFavourite = (city) =>{
        const filteredFavourites = favourites.filter((f)=> f.name !== city)
        localStorage.setItem("favourites",JSON.stringify(filteredFavourites))
        setFavourites(filteredFavourites)
        toast.success(`${city} has been removed from your favorites.`,{
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
  return (
    <>
    <div className={`flex flex-col pt-5 ${favourites.length > 0 ? "" : "hidden"}`}>
        <h1 className='text-xl font-semibold pb-7'>Favourites</h1>
        <div className='flex gap-4 overflow-x-scroll scrollable'>
        {favourites.map((city,i)=>(
            <div key={i} onClick={()=>navigate(`/city/${city?.name}|${city?.lat}|${city?.lon}`)} className='cursor-pointer bg-black flex relative flex-col rounded-lg gap-1.5 p-3 mb-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-4 items-center'>
                        <h1 className='font-semibold text-lg tracking-wide'>{city?.name}</h1>
                        <p className='font-semibold text-gray-500 text-sm tracking-wide'>{city?.state}</p>
                    </div>
                    <RxCrossCircled 
                        onClick={(e)=>{e.stopPropagation(); // prevents parent click stops the propogation of click
                            handleRemoveFavourite(city?.name);}} size={20} 
                        className='cursor-pointer hover:bg-red-800 rounded-full'/>        
                </div>
                <p className='text-gray-500 text-sm font-semibold tracking-wide'>{city?.country}</p>
                <div className='flex gap-4 items-center'>
                <div className='flex items-center gap-2 font-semibold text-sm tracking-wide'><WiHot className='text-red-700' size={22} strokeWidth={1}/> Temperature: <span className='text-gray-500'>{city?.temp}°</span></div>
                <div className='flex items-center gap-2 font-semibold text-sm tracking-wide'><WiDayCloudy className='text-blue-700' size={22} strokeWidth={1}/> Feels_Like: <span className='text-gray-500'>{city?.feels_like}°</span></div>
                </div>
            </div>
        ))}
        </div>
    </div>
    </>
  )
}

export default Favourites