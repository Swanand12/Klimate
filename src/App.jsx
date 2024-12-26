import { createBrowserRouter, RouterProvider } from "react-router-dom"
import WeatherDashboard from "./pages/WeatherDashboard"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import WeatherSkeleton from "./components/WeatherSkeleton"


function App() {

  const router = createBrowserRouter([{
    path:"/",
    element:<WeatherDashboard/>
  },
  {
    path:"/s",
    element:<WeatherSkeleton/>
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
    </QueryClientProvider>
    </>
  )
}

export default App
