import { ref } from 'vue'
import { defineStore } from 'pinia'
import bookingService from '../services/booking.js'
import type { IbookingPost } from '@/types/bookings/interface.js'

export const bookingStore = defineStore('booking', () => {
  const bookings = ref([])
  const isLoading = ref(false)
  const notificationBooking = ref(false)
  async function saveBooking(payload: IbookingPost) {
    try {
      await bookingService.postBooking(payload)
    } catch (e) {
      console.log(e)
    }
  }
  async function getBookings() {
    isLoading.value = true
    try {
      const result = await bookingService.getBookings()
      bookings.value = result.data
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false
    }
  }
  async function setNotificationBooking() {
    try {
      const result = await bookingService.getBookings()
      if (result.data.length > 0) {
        notificationBooking.value = true
      }
    } catch (e) {
      console.log(e)
    }
  }
  return {
    saveBooking,
    getBookings,
    setNotificationBooking,
    bookings,
    isLoading,
    notificationBooking
  }
})
