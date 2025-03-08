<template>
  <div>
    <div class="fixed w-full z-50 shadow-lg">
      <div 
        class="py-7 transition ease-in-out"
        :class="isDay ? 'bg-gradient-to-r from-blue-400 to-blue-500' : 'bg-gradient-to-r from-blue-700 to-blue-900'"
      >
        <nav class="flex px-7 justify-between items-center">
          <div>
            <NuxtLink to="/">
              <UIcon name="i-heroicons-home-solid" class="w-6 h-6 text-white" /> 
          </NuxtLink>
          </div>
          <span class="mx-auto text-md text-white">
            {{ new Date().getFullYear() }}년
            {{ new Date().toLocaleDateString(('ko-kr'), { month: 'short' }) }}
            {{ new Date().toLocaleDateString(('ko-kr'), { day: '2-digit' }) }}
            {{ new Date().toLocaleDateString(('ko-kr'), { weekday: 'short' }) }}
          </span>
          <span class="text-white">&deg; C</span>
        </nav>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useWeatherStore()
const { isDay } = storeToRefs(store)
</script>

<style>

</style>