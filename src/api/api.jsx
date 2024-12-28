import API_CONFIG from './config';

export const getWeather = async ({lat,lon}) =>{
    try {
        console.log(lat,lon)

        const params = new URLSearchParams({
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units,
            appid:API_CONFIG.DEFAULT_PARAMS.appid
        })

        const url = `${API_CONFIG.BASE_URL}/weather?${params.toString()}`
        console.log(url)
        console.log(import.meta.env)
        const res = await fetch(url)

        if(!res.ok){
            throw new error (`HTTP Error! status: ${res.status}`)
        }

        const data = await res.json()
        console.log(data)
        return data

    } catch (error) {
        console.error("Error while fetching weather data")
    }
}

export const getForecast = async ({lat,lon}) =>{
    try {
        
        const params =  new URLSearchParams({
            lat:lat.toString(),
            lon:lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units,
            appid:API_CONFIG.DEFAULT_PARAMS.appid
        })

        const url = `${API_CONFIG.BASE_URL}/forecast?${params.toString()}`

        const res = await fetch(url)

        if(!res.ok){
            throw new error(`HTTP Error! status: ${res.status}`)
        }

        const data = await res.json()

        return data
    } catch (error) {
        console.error("Error while fetching forecast data")
    }
}

export const reverseCoding = async({lat,lon}) =>{
    try {
        console.log("lat:",lat,"lon:",lon)

        const params =  new URLSearchParams({
            lat:lat.toString(),
            lon:lon.toString(),
            appid:API_CONFIG.DEFAULT_PARAMS.appid
        })

        const url = `${API_CONFIG.GEO_URL}/reverse?${params.toString()}`

        const res = await fetch(url)

        if(!res.ok){
            throw new error(`HTTP Error! status: ${res.status}`)
        }

        const data = await res.json()
        console.log("r:",data)
        return data
        
    } catch (error) {
        console.error("Error while reverse coding")
    }
}


export const getCities = async(query) =>{
    try {
        console.log("q:",query)

        const params =  new URLSearchParams({
            q:query,
            limit:5,
            appid:API_CONFIG.DEFAULT_PARAMS.appid
        })

        const url = `${API_CONFIG.GEO_URL}/direct?${params.toString()}`

        const res = await fetch(url)

        if(!res.ok){
            throw new error(`HTTP Error! status: ${res.status}`)
        }

        const data = await res.json()
        console.log("g:",data)
        return data
        
    } catch (error) {
        console.error("Error while reverse coding")
    }
}

