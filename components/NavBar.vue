<template>
  <div class="">    
    <!-- https://gradienty.codes/ -->
    <header class="dark:bg-gradient-to-r from-[#0f172a] to-[#334155] bg-slate-600">
      <nav class="flex text-white py-7 justify-between items-center px-3">
        <div class="flex items-center">
          <img src="/icon.png" width="30" class="ml-4" alt="">
          <span class="ml-5 font-semibold">기상예보</span>
        </div>
        <div class="mr-2">
          <UIcon 
            @click="toggleEdit = !toggleEdit" 
            name="i-heroicons-pencil-square" 
            class="w-6 h-6 mr-5 cursor-pointer" 
            :class="toggleEdit ? 'text-amber-500' : ''"
          />
          <UIcon @click="reLoad" name="i-heroicons-arrow-path-20-solid" class="w-6 h-6 mr-5 cursor-pointer" />
          <UIcon @click="modalOpen = !modalOpen" name="i-heroicons-plus-16-solid" class="w-6 h-6 mr-5" />
          <ClientOnly >            
            <UButton 
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            variant="ghost"
            size="md"
            color="black"
            @click="isDark= !isDark"
            :class="colorMode.value === 'light' ? 'text-yellow-600' : 'text-gray-400'"
            />
          </ClientOnly>
        </div>
      </nav>
    </header>
  </div>
  
</template>

<script lang="ts" setup>
const store = useWeatherStore()
const { modalOpen, toggleEdit } = storeToRefs(store)
const colorMode = useColorMode()
const isDark = computed({
  get:() => colorMode.value === 'dark',
  set:() => colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
})
const reLoad = () => {
  location.reload()
}
// console.log(colorMode.preference)
</script>