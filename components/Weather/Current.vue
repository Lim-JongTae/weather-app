<template>
  <div>
    <div class="mt-24 border-b border-gray-100/70 relative">
      <!-- error 방지 -->
      <div class="flex w-full min-h-[330px] my-7 text-white" v-if="currentWeather">
        <div class="flex-1 pt-7 ml-5">
          <span class="text-3xl block font-semibold">{{ currentWeather.name }}</span>
          <span class="ml-25 mt-4 block text-[80px] font-bold">{{ Math.round(currentWeather.main.temp) }}&deg;</span>
          <div class="flex gap-4">
            <div class="flex">
              <UTooltip text="최고온도"><UIcon name="i-heroicons-chevron-up-16-solid" size="md" /></UTooltip>
              <span class="text-xl">{{ Math.round(currentWeather.main.temp_max) }}&deg;</span>
            </div>
            <div class="flex">
              <UTooltip text="최저온도"><UIcon  name="i-heroicons-chevron-down-16-solid" size="md" /></UTooltip>
              <span class="text-xl">{{ Math.round(currentWeather.main.temp_min) }}&deg;</span> 
            </div>
          </div>
          <div>
            <span class="ml-1 capitalize text-2xl font-semibold mt-16 mb-2">{{ currentWeather.weather[0].description }}</span>
            <span class="ml-1 text-sm font-semibold">체감온도 {{ Math.round(currentWeather.main.feels_like) }}&deg;</span>
          </div>
        </div>
      </div>
      <div class="h-full absolute -top-10 -right-[140px] flex items-center">
        <img v-if="isDay" src="https://openweathermap.org/img/wn/01d@2x.png" width="330" alt="">
        <img v-else src="https://openweathermap.org/img/wn/01n@2x.png" width="330" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  currentWeather: {
    type: Object,
    required: true
  },
  isDay: {
    type: Boolean
  }
})
console.log(props.currentWeather)
</script>

<style scoped>
span {
  display: block;
}
</style>