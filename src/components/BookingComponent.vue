<script setup lang="ts">
import BookingMain from './bookings/BookingMain.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <header class="flex--center--column m-b-12">
    <h1>HOTEL RESERVA</h1>
    <h3>RESERVAS</h3>
    <v-btn color="cyan" @click="router.push('/')">Ir para Hotéis</v-btn>
  </header>
  <BookingMain> </BookingMain>
</template>

<style lang="scss" scoped></style>
