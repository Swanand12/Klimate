import { useEffect, useState } from "react"

export const useGeoLocation = ()=>{
    const [locationData,setLocationData] = useState({
        coordinates:null,
        isError:null,
        isLoading:false
    })

    useEffect(()=>{
        geoLocation()
    },[])

    const geoLocation = ()=>{
       
            setLocationData(prev => ({...prev,isLoading:true,isError:null}))

            if(!navigator.geolocation){
                setLocationData({
                    coordinates:null,
                    isError:"GeoLocation is not supported by your browser",
                    isLoading:false
                })
                return;
            }

            navigator.geolocation.getCurrentPosition((position)=>{
                setLocationData({
                    coordinates:{
                        lat:position.coords.latitude,
                        lon:position.coords.longitude
                    },
                    isLoading:false,
                    isError:null
            })
            },(error)=>{
                let errorMessage = ""

                switch(error.code){
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location permission denied. Please enable location access.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occured"
                }

                setLocationData({
                    coordinates:null,
                    isLoading:false,
                    isError:errorMessage
                })
            },{
                enableHighAccuracy:true,
                maximumAge:0,
                timeout:5000
            })

            console.log(locationData)

    }
    return {
        ...locationData,
        geoLocation
    }
}

