<template>
  <div class="text-white flex flex-col text-center min-w-11 mr-8">
    <span class="mb-3 font-semibold">{{ new Date(time.dt * 1000).toLocaleString('ko-kr', { hour: 'numeric'}) }}</span>
    <span class="mb-2">
      <img class="h-8 w-auto block" :src="`https://openweathermap.org/img/wn/${time.weather[0].icon}@2x.png`" />
    </span>
    <span class="font-bold">{{ Math.round(time.temp) }}&deg;</span>
  </div>
</template>

<script setup>


const props = defineProps({
  time: {
    type: Array
  }
})
</script>

<style scoped>
span {
  display: block;
  align-self: center;
}
</style>