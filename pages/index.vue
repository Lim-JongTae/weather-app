<template>
  <div class="max-w-[1024px] h-[100vh]">
    <div v-if="isLoading" class="flex w-full h-full justify-center items-center">
      <UIcon 
        name="i-mdi-rotate-right" 
        class="animate-spin w-20 h-20 text-gray-500/50" 
      />     
    </div>
    <div v-else>
      <CityModal v-if="modalOpen"/>
      <CityAdd :cities="cities"/>    
    </div>
  </div>
</template>

<script lang="ts" setup>

const store = useWeatherStore()
const { cities, modalOpen, isLoading } = storeToRefs(store)

onMounted(async() => { 
await store.fetchCities()     
})

useHead({
  titleTemplate: '%s | 날씨정보'
})
 
</script>

<style>

</style>