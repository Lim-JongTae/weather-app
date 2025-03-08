<template>
  <div class="flex justify-between items-center text-white">
    <div>
      <span>{{ new Date(day.dt * 1000).toLocaleString('ko-kr', { weekday: 'long' }) }}</span>
    </div>
    <div class="flex justify-center items-center">
      <img class="" width="50" :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" />
    </div>
    <div class="flex justify-end">
      <span class=" font-semibold mr-3">{{ Math.round(day.temp.max) }}&deg;</span>
      <span>{{ Math.round(day.temp.min) }}&deg;</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  day: {
    type: Object as any
  }
})
console.log(props.day)
</script>

<style scoped>
div {
  flex: 1;
}
span {
  min-width: 20px;
}
</style>