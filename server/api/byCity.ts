import { useCookie } from "nuxt/app"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.public.weatherApi
  
  
  const query = getQuery(event)
  // console.log(query)
  let cityName = query.city
  
 
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    const response = await $fetch(url)
    
    // console.log(response)
    return response

  } catch (error) {
    console.log(error)
  }
})
