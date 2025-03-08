import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { defineStore } from 'pinia'
export const useWeatherStore = defineStore('Weather',{  
  state: () => ({ 
    cities: useCookie('savedCities', { default: () => [] }),        
    isDay: null,
    isLoading: false,
    modalOpen: false,
    toggleEdit: false,
    currentWeather: null,
    forecast: null
  }),
  getters: {
    filterDay() {
      if (this.forecast) {
        return this.forecast.hourly.slice(0, 23)
      }
     },
     filterWeek() {
      if (this.forecast) {
        return this.forecast.daily.slice(1, 8)
     }
    }
  },
  actions: {
    async fetchCities() {      
      this.isLoading = true
      const { $db } = useNuxtApp()
      const docRef = collection($db, 'cities')
      onSnapshot(docRef, (snapshot) => {
        // console.log(snapshot)
        if (snapshot.docs.length === 0) { 
          this.isLoading = false
        }

        snapshot.docChanges().forEach(async (item) => {
          // console.log(item.type)
          // console.log(item.doc.metadata.hasPendingWrites)
          const cityName = item.doc.data().city
          if (item.type === 'added' && !item.doc.metadata.hasPendingWrites) {
            try {
              // 화면 중복표시 방지
              if ( !this.cities.some((res) => res.city === cityName)) {                
              const { data, error, refresh } = await useFetch('/api/byCity',{
                method: 'GET',
                query: { city: cityName }
              })
              if (error.value || !data.value) {
                console.log('weather fetch error:', error.value)
              }       
              // console.log(data.value)
              const docId = item.doc.id
              
              const colRef = doc($db, 'cities', docId)
              await updateDoc(colRef, { currentWeather: data.value})        
                this.cities.push({...item.doc.data(), currentWeather: data.value})
                // console.log(this.cities)   
                this.saveToCookie()
                this.isLoading = false           
            }
            } catch (error) {
              console.log(error)

            } finally {
              this.isLoading = false              
            }
          // } else if (item.type === 'added' && item.doc.metadata.hasPendingWrites) {
          //   this.cities.push(item.doc.data())            
          //   this.saveToCookie()
          //   this.isLoading = false
            
          } else if (item.type === 'removed') {
            this.cities = this.cities.filter((city) => city.city !== cityName)
            this.saveToCookie()
            this.isLoading = false
          }
        })
      })  
    },
    async addCity(city) {
      this.isLoading = true
      const { showError, showMessage } = useUseMessage()
      try {
        const { $db } = useNuxtApp()
        const { data, error } = await useFetch('/api/byCity',{
          method: 'GET',
          query: { city },
          once: true
        })
        if (error.value) {
          console.log(error.value.message)
          showError({
            title: 'Error',
            description: error.value?.message || '오류가 발생되었습니다.'
          })           
          return
        } 
        if (!data.value) {
          showError({
            title: 'Error',
            description: '도시를 찾을수 없습니다.'
          })
          return
        }
        // firebase db add
        const newCity = {
          city: city.toLowerCase(),
          currentWeather: data.value
        }
        const docRef = doc(collection($db, 'cities'))
        
        await setDoc(docRef, newCity)      
        this.cities.push(newCity)
        showMessage({
          title: '알림',
          description: '도시 "' + city.value + '"를 추가하였습니다.'
        }) 
        this.saveToCookie()
        this.isLoading = false
     

      } catch (error) {
        console.log(error)
        showError({
          title: 'error',
          description: error.message || '오류가 발생되었습니다. 다시 입력해 주세요'
        })
      } finally {
        this.isLoading = false
      }
    },
    async removeCity(city) {
      this.isLoading = true
      const { $db } = useNuxtApp()
      try {
        const docRef = collection($db, 'cities')
        const q = query(docRef, where('city','==', city))
        const docs = await getDocs(q)

        let cityId = null

        docs.forEach((item) => {
          cityId = item.id          
        })
        if (cityId) {
          const colRef = doc($db, 'cities', cityId)
          await deleteDoc(colRef)
          this.cities = this.cities.filter((city) => city.id !== cityId)
          this.saveToCookie()
          this.isLoading = false
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async detailWeather(city) {
      this.isLoading = true
      const { $db } = useNuxtApp()
      try {
        const docRef = collection($db, 'cities')
        const q = query(docRef, where('city', '==', city))
        const docs = await getDocs(q)
        docs.forEach(async(item) => {
          // console.log(item.data())
          this.currentWeather = item.data().currentWeather
          const coordinate = this.currentWeather.coord
          const { data, error, refresh } = await useFetch('/api/detail',{
            method: 'GET',
            query: {
              lat: coordinate.lat,
              lon: coordinate.lon
            }
          })
          if (error) {
            console.log(error)
          }
          if (!data.value) {
            throw createError({
              statusCode: 404,
              message: 'Not Found'
            })
          }
          this.forecast = data.value
          // console.log('forecast',this.forecast)
          // console.log('currnetWeather',this.currentWeather)
          this.isLoading = false
          this.getCurrentTime()
        })
      } catch (error) {
        console.log(error)
        this.isLoading = false
      } finally {
        this.isLoading = false
      }
    },
    async getCurrentTime() {
      const dateTime = new Date()
      const currentTime = dateTime.getHours()
      // timestamp는 초, javascript는 밀리초
      const sunrise = new Date(this.currentWeather.sys.sunrise * 1000).getHours()
      const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours()

      if( currentTime > sunrise && currentTime < sunset ) {
        this.isDay = true
      } else {
        this.isDay = false
      }
      // console.log('isDay', currentTime)
    },
    saveToCookie() {
      const cityCookie = useCookie('savedCities')
      cityCookie.value = this.cities
    }
}
})
