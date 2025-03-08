<template>
  <div class="max-width-[1024px] mx-auto h-dvh">
    <div v-if="isLoading" class="w-full h-full flex justify-center items-center">      
      <span class="block w-14 h-14 mx-auto">
        <UIcon name="i-mdi-rotate-right" class=" animate-spin w-12 h-12 text-gray-500" />      
      </span>
    </div>
    <div v-else 
      class="w-full h-full overflow-scroll shadow-md transition ease-in-out"      
      :class="isDay ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-blue-600 to-blue-800'"
    >
      <div class="overflow-hidden max-w-[1024px] mx-auto">
        <!-- @vue-ignore -->
        <WeatherCurrent :currentWeather="currentWeather" :isDay="isDay" />
        <WeatherHourly :forecast="forecast" />
        <WeatherWeekly :forecast="forecast" />
        <WeatherInfo :currentWeather="currentWeather" />
      </div>
    </div>    
  </div>
</template>

<script setup>
const route = useRoute();
const store = useWeatherStore()
const { isLoading, isDay, currentWeather, forecast } = storeToRefs(store)
definePageMeta({
  layout: 'custom'
})
onMounted(() => {
  store.detailWeather(route.params.city)
})

useHead({
  titleTemplate: '도시별 날씨정보'
})
 
</script>

<style>

</style>