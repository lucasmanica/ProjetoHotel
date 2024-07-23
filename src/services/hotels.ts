import axios from 'axios'
import type { IformSearch } from '@/types/hotels/interface'

const hotelsService = {
  APIURL: import.meta.env.MODE === 'production' ? 'http://localhost:3001' : 'http://localhost:3001',
  getHotels() {
    return axios({
      url: `${this.APIURL}/hotels`,
      method: 'GET'
    })
  },
  getFilteredHotels(payload: IformSearch) {
    return axios({
      url: `${this.APIURL}/hotels?city=${payload.city}`,
      method: 'GET'
    })
  }
}

export default hotelsService
