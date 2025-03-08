<template>
  <div class="z-[100] bg-slate-500/40 fixed w-full h-full flex justify-center items-center backdrop-blur-sm">
    <div class="p-5 max-w-[500px] rounded-md w-3/4 bg-slate-600 shadow-md relative">
      <label for="city-name" class="text-zinc-200">도시명:</label>
      <UIcon @click="modalOpen=false" name="i-heroicons-x-mark-16-solid" class="w-5 h-5 text-white absolute top-4 right-4 cursor-pointer hover:text-amber-600"/>
      <UInput 
          class="p-3"
          type="text"
          name="city-name"
          v-model="city"
          placeholder="도시명을 입력하세요..."
          @keyup.enter="handleClick" 
        />
      <div class="flex justify-center">
        <UButton @click="handleClick"class="mt-2">추가</UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toast = useToast()
const { showMessage, showError } = useUseMessage()
const store = useWeatherStore()
const { modalOpen, cities } = storeToRefs(store)

const city = ref('')
const handleClick = async () => {
  if ( city.value.trim() === '') {
    modalOpen.value = false
    showError({
      title: 'Error',
      description: '도시명을 입력하세요.'      
    })
    return

  } else if (cities.value.some((res:any) => res.city.trim() === city.value.trim().toLowerCase())) {
    modalOpen.value = false
    showMessage({
      title: '알림!',
      description: `${city.value}은 이미 있습니다.`,
    })
    return

  } else {
    await store.addCity(city.value)
    modalOpen.value = false  
  }  
}
</script>

