import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import hotelsService from '../services/hotels.js'
import type { IformSearch, IlastFormSearch } from '@/types/hotels/interface.js'

export const hotelsStore = defineStore('hotels', () => {
  const lastFormSearch: IlastFormSearch = reactive({
    city: '',
    people: 1,
    rooms: 1,
    diffDays: 1,
    checkIn: new Date(Date.now()),
    checkOut: new Date(Date.now())
  })
  const hotels = ref([])
  const isLoading = ref(false)
  const stateHotels = computed(() => {
    if (hotels.value.length > 0) {
      return hotels.value
    }
    return false
  })
  function sortHotels(typeSort: string) {
    hotels.value.sort((a: any, b: any): any => b[`${typeSort}`] - a[`${typeSort}`])
  }
  function setLastFormSearch(payload: IformSearch) {
    const diffDateInDays = Math.ceil(
      (payload?.finalDate.getTime() - payload?.initDate.getTime()) / (1000 * 3600 * 24)
    )
    lastFormSearch.city = payload?.city
    lastFormSearch.people = payload?.people
    lastFormSearch.rooms = payload?.rooms ? payload.rooms : 1
    lastFormSearch.checkIn = payload?.initDate
    lastFormSearch.checkOut = payload?.finalDate
    lastFormSearch.diffDays = diffDateInDays > 0 ? diffDateInDays : 1
  }
  async function getFilteredHotels(payload: IformSearch): Promise<void> {
    setLastFormSearch(payload)
    isLoading.value = true
    try {
      hotels.value = []
      const resultHotels = await hotelsService.getFilteredHotels(payload)
      hotels.value = resultHotels.data
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }
  }
  async function getHotels(payload: IformSearch | undefined): Promise<void> {
    setLastFormSearch(payload as IformSearch)
    isLoading.value = true
    try {
      hotels.value = []
      const resultHotels = await hotelsService.getHotels()
      hotels.value = resultHotels.data
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    getHotels,
    sortHotels,
    getFilteredHotels,
    hotels,
    stateHotels,
    isLoading,
    lastFormSearch
  }
})
