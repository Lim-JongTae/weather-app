<template>
  <div class="py-10 border-b border-gray-100/70">
    <div class="flex max-w-[100vw] overflow-scroll p-0 mx-3 no-scrollbar">
      <div v-for="(time, index) in store.filterDay" :key="index">
        <WeatherTemp :time="time" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  forecast: {
    type: Object    
  }
})
const store = useWeatherStore()
console.log(props.forecast)
</script>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}
</style>