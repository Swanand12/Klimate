import React, { useState } from 'react'
import { Button } from './ui/button'
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { Search } from 'lucide-react'
import { useCities } from '@/hooks/useWeather'
import { useNavigate } from 'react-router-dom'

const SearchCity = () => {
    const [open,setOpen] = useState(false)
    const [query,setQuery] = useState("")
    const cityQuery = useCities(query)
    const navigate = useNavigate()
    
    // navigate to city page
    const handleSelect = (value)=>{ 
        navigate(`city/${value.toLowerCase()}`)
    }
   

  return (
    <>

        <Button onClick={()=>setOpen(true)} className="bg-black hover:bg-[#111111] duration-300 transition-transform border-2 border-gray-500 w-[250px] flex items-center justify-start font-semibold tracking-wide gap-4 px-4"><Search/> Search city...</Button>

        
        <CommandDialog  open={open} onOpenChange={setOpen}>
        <CommandInput className="font-semibold text-gray-500"  value={query} onValueChange={setQuery} placeholder="Search for a city to check the weather..." />
        <CommandList>
            {query.length > 2 && !cityQuery.isLoading && <CommandEmpty>No results found.</CommandEmpty>}
            <CommandGroup heading="Cities">
            {cityQuery?.data?.map((city) => {return <><CommandItem key={`${city.lat}-${city.lon}`} value={`${city.name}|${city.lat}|${city.lon}`} onSelect={handleSelect} className="text-black cursor-pointer  font-semibold">{city?.name}, <span className="text-gray-700">{city.state},</span> <span className="text-gray-500">{city.country}</span></CommandItem></>})}
            </CommandGroup>
        </CommandList>
        </CommandDialog>
        </>

  )
}

export default SearchCity