<script setup lang="ts">
import { ref, computed } from 'vue'
import { hotelsStore } from '../../stores/hotels.js'
import HotelCard from './HotelCard.vue'
import ComparisonModal from './ComparisionModal.vue'
import EmptyState from '../cards/EmptyState.vue'
import SkeletonCardHorizontal from '../cards/skeletons/SkeletonCardHorizontal.vue'
import { typeSortObject } from '../../utils/hotelUtil'
import type { IhotelIdEvent } from '@/types/hotels/interface.js'
const hotelsS = hotelsStore()
const isLoading = computed(() => {
  return hotelsS.isLoading
})
const hotelCardRef = ref()
const selectedHotels = ref<number[]>([])
const selectedSort = ref('')
const sortHotels = (typeSort: string) => {
  clearSelectedCards()
  selectedSort.value = typeSortObject(typeSort)
  hotelsS.sortHotels(typeSort)
}
const clearSelectedCards = () => {
  hotelCardRef.value.forEach((card: InstanceType<typeof HotelCard>) => {
    card.selected = []
  })
  selectedHotels.value = []
}
const modalComparison = ref(false)
const setSelected = (hotel: IhotelIdEvent) => {
  if (hotel.isSelected) {
    selectedHotels.value.push(hotel.id)
  } else {
    const indexedHotel = selectedHotels.value.findIndex((idHotel) => idHotel === hotel.id)
    if (indexedHotel > -1) {
      selectedHotels.value.splice(indexedHotel, 1)
    }
  }
}
const activeModalPrice = () => {
  modalComparison.value = true
}
</script>

<template>
  <section class="hotel">
    <section class="m-b-12 hotel__sortings">
      <p>
        Ordenar por: <b>{{ selectedSort }}</b>
      </p>
      <v-btn @click="sortHotels('price')" color="light-blue">
        Preço <v-icon icon="mdi-arrow-down"></v-icon
      ></v-btn>
      <v-btn @click="sortHotels('rating')" color="light-blue" class="m-l-12">
        Avaliação <v-icon icon="mdi-arrow-down"></v-icon>
      </v-btn>
      <v-btn @click="sortHotels('rates')" color="light-blue" class="m-l-12">
        Quantidade de Avaliações
        <v-icon icon="mdi-arrow-down"></v-icon>
      </v-btn>
      <v-btn
        @click="activeModalPrice()"
        class="m-l-24 comparision-price"
        color="teal"
        v-if="selectedHotels.length > 1"
        >Comparar Preços</v-btn
      >
    </section>
    <section class="hotel-cards">
      <HotelCard
        class="m-b-12"
        ref="hotelCardRef"
        v-for="(hotel, i) in hotelsS.stateHotels"
        :key="i"
        :hotel="hotel"
        @selected="setSelected($event as IhotelIdEvent)"
      >
      </HotelCard>
    </section>
    <section v-if="selectedHotels.length > 1">
      <ComparisonModal
        v-if="modalComparison"
        :selectedHotels="selectedHotels"
        :isActive="modalComparison"
        @closeComponent="modalComparison = false"
        :hotelsStore="hotelsS"
      >
      </ComparisonModal>
    </section>
  </section>
  <section v-if="hotelsS.stateHotels && !isLoading" class="hotel"></section>
  <section v-if="!isLoading && !hotelsS.stateHotels">
    <EmptyState text="O destino pesquisado não foi encontrado, tente outro destino."></EmptyState>
  </section>
  <section v-if="isLoading">
    <SkeletonCardHorizontal class="m-b-12"></SkeletonCardHorizontal>
    <SkeletonCardHorizontal class="m-b-12"></SkeletonCardHorizontal>
    <SkeletonCardHorizontal></SkeletonCardHorizontal>
  </section>
</template>

<style lang="scss">
.hotel {
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (max-width: 600px) {
  .hotel__sortings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
