export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiKey = config.public.weatherApi

  const query = getQuery(event) 
  const { lat, lon } = query
  
  if (!lat || !lon) {
    throw createError({
      statusCode: 400,
      message: 'Missing coordinates in query parameters.'
    })
  }
  try {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current,alerts&units=metric&lang=kr&appid=${apiKey}`
    const response = await $fetch(url)
    return response

  } catch (error) {
    console.log(error)
  }
})
