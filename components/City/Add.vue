<template>
  <div>
    <div v-if="cities.length === 0" class="flex m-h-[100vh] pt-36 max-w-[1024px] w-full flex-col justify-center items-center text-white transition-all ease-in">
      <p class="mb-5">도시가 없습니다.</p>
      <UButton @click="store.modalOpen = true">도시추가</UButton>
    </div>
    <div v-else class="pt-24 bg-slate-500 min-h-dvh dark:bg-slate-800 w-full grid grid-cols-1 xs:grid-cols-2 auto-rows-[250px] box-border">
      <div v-for="(city, index) in cities" :key="index">
        <CityView :city="city"/>         
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cities:{
    type: Array,
    required: true
  }
})
const store = useWeatherStore()
</script>