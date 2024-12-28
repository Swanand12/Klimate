import { createBrowserRouter, RouterProvider } from "react-router-dom"
import WeatherDashboard from "./pages/WeatherDashboard"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import WeatherSkeleton from "./components/WeatherSkeleton"
import SearchCityWeather from "./pages/SearchCityWeather"
import { Toaster } from "react-hot-toast"


function App() {

  const router = createBrowserRouter([{
    path:"/",
    element:<WeatherDashboard/>
  },
  {
    path:"/city/:city",
    element:<SearchCityWeather/>
  }])

  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 *1000,
        refetchOnWindowFocus:false,
        retry:3
      }
    }
  })

  
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster/>
    </QueryClientProvider>
    </>
  )
}

export default App
