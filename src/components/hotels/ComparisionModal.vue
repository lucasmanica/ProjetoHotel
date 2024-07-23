<script setup lang="ts">
import { computed } from 'vue'
import VerticalCard from '../cards/VerticalCard.vue'
import { imageHotel } from '../../utils/hotelUtil.js'
const emit = defineEmits(['closeComponent'])
const props = defineProps({
  isActive: Boolean,
  selectedHotels: Object,
  hotelsStore: Object
})
const isActiveModal = computed(() => {
  return props.isActive
})

const getSelectedHotels = computed((): any => {
  return props.hotelsStore?.hotels.filter((hotel: any) => props.selectedHotels?.includes(hotel.id))
})
const close = () => {
  emit('closeComponent')
}
</script>

<template>
  <section class="comparision-modal">
    <v-dialog v-model="isActiveModal" width="auto">
      <v-card max-width="700" text="" title="" class="slider-overflow">
        <template v-slot:title>
          <h3>Comparação de Preços</h3>
        </template>
        <section
          style="overflow: auto"
          class="slider-overflow comparision-modal__cards p-8"
          :class="{ 'flex-center': getSelectedHotels.length < 4 }"
        >
          <VerticalCard v-for="(hotel, i) in getSelectedHotels" :key="i">
            <template v-slot:header>
              <figure>
                <img width="200" height="150" :src="imageHotel(hotel.imgUrl).toString()" />
              </figure>
              <p>{{ hotel.name }}</p>
            </template>
            <template v-slot:text>
              <p>Diária: R$ {{ hotel.price }}</p>
              <p>Nota: {{ hotel.rating }}/5</p>
            </template>
          </VerticalCard>
        </section>

        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="close()" color="red">Sair</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </section>
</template>

<style lang="scss">
.flex-center {
  display: flex;
  justify-content: center;
}

.slider-overflow {
  align-items: stretch;
  gap: 8px;
  justify-content: stretch;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.comparision-modal__cards {
  width: 100%;
  display: flex;
}

@media (max-width: 600px) {
  .slider-overflow {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }
}
</style>
