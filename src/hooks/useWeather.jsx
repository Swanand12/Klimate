import { useQuery } from "@tanstack/react-query"
import { getForecast, getWeather, reverseCoding, getCities } from "@/api/api"


export const useWeatherQuery = (coordinates) =>{
    return useQuery({
        queryKey:["weather",coordinates],
        queryFn:() => getWeather(coordinates),
        enabled:!!coordinates
    })
}

export const useForecastQuery = (coordinates) =>{
    return useQuery({
        queryKey:["forecast"],
        queryFn:() => getForecast(coordinates),
        enabled:!!coordinates
    })
}

export const useReverseCodingQuery = (coordinates) =>{
    return useQuery({
        queryKey:["reverse-coding"],
        queryFn:() => reverseCoding(coordinates),
        enabled:!!coordinates
    })
}

export const useCities = (query) =>{
    return useQuery({
        queryKey:["cities",query],
        queryFn:() => getCities(query),
        enabled:query.length >= 3
    })
}
