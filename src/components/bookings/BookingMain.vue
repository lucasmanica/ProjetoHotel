<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { bookingStore } from '../../stores/booking.js'
import { imageHotel } from '../../utils/hotelUtil.js'
import VerticalCard from '../cards/VerticalCard.vue'
import SkeletonCardVertical from '../cards/skeletons/SkeletonCardVertical.vue'
const bookingS: any = bookingStore()
onMounted(async () => {
  await bookingS.getBookings()
})
const isLoading = computed(() => {
  return bookingS.isLoading
})
const formatDate = (date: string) => {
  if (date) {
    return new Date(date).toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  } else {
    return new Date(Date.now()).toLocaleString('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }
}
</script>
<template>
  <section>
    <section v-if="!isLoading">
      <VerticalCard v-for="(booking, i) in bookingS.bookings" :key="i" class="m-b-12">
        <template v-slot:header>
          <section class="card-booking__header">
            <figure>
              <img width="300" height="250" :src="imageHotel(booking.hotelImg).toString()" />
            </figure>
            <span
              ><b>{{ booking.name }}</b> - {{ booking.city }} {{ booking.state }}</span
            >
          </section>
        </template>
        <template v-slot:text>
          <section class="card-booking__text">
            <p><b>Pagamento</b>: {{ booking.payment[0] }}</p>
            <p><b>Entrada</b>: {{ formatDate(booking.checkIn) }}</p>
            <p><b>Saída</b>: {{ formatDate(booking.checkOut) }}</p>
          </section>
        </template>
      </VerticalCard>
    </section>
    <section v-else>
      <SkeletonCardVertical class="m-b-12"></SkeletonCardVertical>
      <SkeletonCardVertical class="m-b-12"></SkeletonCardVertical>
      <SkeletonCardVertical class="m-b-12"></SkeletonCardVertical>
    </section>
  </section>
</template>
<style lang="scss">
.card-booking__header {
  display: flex;
  justify-content: center;

  flex-direction: column;
  background-color: seashell;
}
.card-booking__text {
  display: flex;
  justify-content: center;

  flex-direction: column;
  background-color: seashell;
}
</style>
