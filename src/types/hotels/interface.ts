export interface Ihotel {
  id: number
  name: string
  roomsAvailable: number
  peopleAvailable: number
  city: string
  state: string
  rating: number
  rates: number
  sales: number
  price: number
  imgUrl: string
}

export interface IpropsHotel {
  hotel: Ihotel
}

export interface IhotelIdEvent {
  id: number
  isSelected: number | undefined
}

export interface IformSearch {
  city: string | string[] | never[]
  initDate: Date
  finalDate: Date
  people: number
  rooms: number
}

export interface IlastFormSearch {
  city: string | string[]
  people: number
  rooms: number
  checkIn: Date
  checkOut: Date
  diffDays: number
}

export interface IpaymentFormVuetify {
  errors: Ref<{ id: string | number; errorMessages: string[] }[]>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isValidating: ShallowRef<boolean>
  isValid: Ref<boolean | null> & { externalValue: boolean }
  items: Ref<
    {
      id: string | number
      validate: () => Promise<string[]>
      reset: () => Promise<void>
      resetValidation: () => Promise<void>
      vm: Raw<ComponentInternalInstance>
      isValid: boolean | null
      errorMessages: string[]
    }[]
  >
  validate: () => Promise<{
    valid: boolean
    errors: { id: string | number; errorMessages: string[] }[]
  }>
  reset: () => void
  resetValidation: () => void
}
