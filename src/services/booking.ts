import axios from 'axios'
import type { IbookingPost } from '@/types/bookings/interface.js'
const bookingService = {
  APIURL: import.meta.env.MODE === 'production' ? 'http://localhost:3001' : 'http://localhost:3001',
  postBooking(payload: IbookingPost) {
    return axios({
      url: `${this.APIURL}/bookings`,
      method: 'POST',
      data: payload
    })
  },
  getBookings() {
    return axios({
      url: `${this.APIURL}/bookings`,
      method: 'GET'
    })
  }
}

export default bookingService
