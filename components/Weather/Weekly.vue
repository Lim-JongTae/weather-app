<template>
  <div class="p-10 border-b border-slate-50/70">
    <div>
      <div v-for="(day, index) in store.filterWeek" :key="index" class="mb-6 daily">
        <WeatherDaily :day="day" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  forecast: {
    type: Array,
    required: true
  }
})
const store = useWeatherStore()
</script>

<style scoped>
.daily:last-child {
  margin-bottom: 0;
}
</style>