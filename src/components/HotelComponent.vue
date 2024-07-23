<script setup lang="ts">
import { onMounted } from 'vue'
import MainHotel from './hotels/HotelMain.vue'
import FormSearch from './forms/FormSearch.vue'
import { hotelsStore } from '../stores/hotels.js'
import { bookingStore } from '../stores/booking.js'
import { useRouter } from 'vue-router'
//Importar Book Store e criar função para contar a quantidade de agendamentos do get/bookings
const router = useRouter()
const hotelsS = hotelsStore()
const bookingS = bookingStore()
onMounted(async () => {
  await hotelsS.getHotels()
  intervalNotification()
})
let intervalNotificationState: number
function intervalNotification() {
  intervalNotificationState = setInterval(() => {
    bookingS.setNotificationBooking()
  }, 15000)
}

const toBooking = () => {
  clearInterval(intervalNotificationState)
  bookingS.notificationBooking = false
  router.push('/booking')
}
</script>

<template>
  <header class="flex--center--column">
    <h1>HOTEL RESERVA</h1>
    <h3>HOTÉIS</h3>
    <v-badge
      color="error"
      v-if="bookingS.notificationBooking"
      title="Novas notificações sobre sua reserva"
    >
      <v-btn color="cyan" @click="toBooking()">Ir para Reservas </v-btn>
    </v-badge>
    <v-btn color="cyan" @click="toBooking()" v-else>Ir para Reservas </v-btn>
  </header>
  <FormSearch> </FormSearch>
  <MainHotel> </MainHotel>
</template>
