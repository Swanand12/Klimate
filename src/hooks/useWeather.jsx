import { useQuery } from "@tanstack/react-query"
import { getForecast, getWeather, reverseCoding } from "@/api/api"


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