export interface IbookingPost {
  name: string
  city: string
  state: string
  hotelImg: string
  checkIn: Date
  checkOut: Date
  payment: string | string[]
}
