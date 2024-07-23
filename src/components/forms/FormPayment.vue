<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { bookingStore } from '../../stores/booking.js'
import { hotelsStore } from '../../stores/hotels.js'
import type { Ihotel, IpropsHotel } from '@/types/hotels/interface.js'
import type { IbookingPost } from '@/types/bookings/interface.js'
const props: IpropsHotel = defineProps<{
  hotel: Ihotel
}>()
const bookingS = bookingStore()
const hotelsS = hotelsStore()
const router = useRouter()
const form = ref()
const name = ref('')
const phone = ref('')
const email = ref('')
const select = ref(['Cartão de Crédito'])
const nameRules = [(value: string) => value?.length > 1 || 'Inserir um nome válido.']
const phoneRules = [
  (value: string) => {
    if (value?.length >= 10) return true

    return 'Deve conter ao menos 10 digitos.'
  }
]

const emailRules = [
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail deve ser válido.'
  }
]
const items = ref(['Cartão de Crédito', 'Cartão de Débito', 'PIX'])
const reset = () => {
  form.value.reset()
  select.value = ['Cartão de Crédito']
}
const validate = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    const payload: IbookingPost = {
      name: props.hotel.name,
      city: props.hotel.city,
      state: props.hotel.state,
      hotelImg: props.hotel.imgUrl,
      checkIn: hotelsS.lastFormSearch.checkIn,
      checkOut: hotelsS.lastFormSearch.checkOut,
      payment: select.value
    }
    await bookingS.saveBooking(payload as IbookingPost)
    router.push('/booking')
  }
}
</script>
<template>
  <p>{{ hotel?.name }} - {{ hotel?.city }} {{ hotel?.state }}</p>
  <v-form ref="form">
    <v-text-field v-model="name" :rules="nameRules" label="Nome" required></v-text-field>

    <v-text-field
      v-model="phone"
      :rules="phoneRules"
      label="Telefone com DDD"
      required
    ></v-text-field>

    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

    <v-select v-model="select" :items="items" label="Pagamento"></v-select>

    <v-btn class="me-4" color="indigo" @click="validate()"> Comprar </v-btn>

    <v-btn @click="reset()"> Limpar </v-btn>
  </v-form>
</template>
<style lang="scss"></style>
