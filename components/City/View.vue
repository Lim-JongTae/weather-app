<template>  
  <div >
    <div class="flex relative flex-col basis-1/2 min-h-[250px] text-white shadow cursor-pointer" @click="goCity(city.city)">
      <div v-if="toggleEdit" @click.stop="handleClick(city.city)" class="z-[11] bg-slate-600/80 dark:bg-slate-900/80 w-7 h-7 rounded-bl-lg flex justify-center items-center absolute top-2 right-2">
        <UIcon name="i-heroicons-trash" class="w-5 h-5 hover:text-red-600" />
      </div>
      <span class="z-10 capitalize block text-2xl py-2 ml-3 font-semibold">{{ city.city }}</span>
      <!-- 보간머쉬테쉬 보간법 -->
      <div class="flex-1 flex justify-end items-center z-10 pt-12">
        <span class="text-3xl font-bold mr-2">{{ Math.round(city.currentWeather.main.temp) }}&deg;</span>
        <img class="h-10 w-auto" :src="`https://openweathermap.org/img/wn/${city.currentWeather.weather[0].icon}@2x.png`" />
      </div>
      <div class="overflow-hidden absolute top-0 left-0 w-full h-full">
        <video 
          autoplay
          muted="muted"
          :src="`/mp4/${city.currentWeather.weather[0].icon}.mp4`"
          loop
          class="h-full md:h-auto md:w-full object-cover"          
          
        />
      </div>
    <div class="absolute w-full h-full top-0 left-0 bg-slate-500/20" />
  </div>
</div>
</template>

<script setup>
const store = useWeatherStore()
const { toggleEdit } = storeToRefs(store)
const props = defineProps({
  city: {
    type: Object,
    required: true
  }
})

const handleClick = (city) => {
  store.removeCity(city)
}

const goCity = (city) => {
  navigateTo(`/city/${city}`)
}
// console.log(props.city)
</script>
