<template>
  <header class="flex px-6 py-8 flex-wrap text-white" v-if="currentWeather">
    <div>
      <span>일출</span>
      <span>{{ new Date(currentWeather.sys.sunrise * 1000).toLocaleString('ko-kr', { timeStyle: 'short'}) }}</span>
    </div>
    <div>
      <span>일몰</span>
      <span>{{ new Date(currentWeather.sys.sunset * 1000).toLocaleString('ko-kr', { timeStyle: 'short'}) }}</span>
    </div>
    <div>
      <span>습도</span>
      <span>{{ currentWeather.main.humidity }}&#37</span>
    </div>
    <div>
      <span>풍속</span>
      <span>{{ currentWeather.wind.speed }}m/s</span>
    </div>
    <div>
      <span>구름</span>
      <span>{{ currentWeather.clouds.all }}&#37</span>
    </div>
    <div>
      <span>기압</span>
      <span>{{ currentWeather.main.pressure }}hPa</span>
    </div>
  </header>
</template>

<script lang="ts" setup>
const props = defineProps({
  currentWeather: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  margin-bottom: 20px;
}
div span:nth-child(1) {
  font-size: 12px;
  margin-bottom: 8px;
}
div span:nth-child(2) {
  font-weight: 600;
}
div:nth-child(5),
div:nth-child(6) {
  margin-bottom: 0;
}
</style>