<script setup lang="ts">
import { ref, computed } from 'vue'
import { imageHotel } from '../../utils/hotelUtil.js'
import { hotelsStore } from '../../stores/hotels.js'
import FormPayment from '../forms/FormPayment.vue'
import type { Ihotel, IpropsHotel } from '@/types/hotels/interface.js'
const hotelS = hotelsStore()
const props: IpropsHotel = defineProps<{
  hotel: Ihotel
}>()
const emit = defineEmits(['selected'])
const selected = ref([])
const hotelRating = computed(() => {
  return props.hotel.rating
})
defineExpose({
  selected
})
</script>

<template>
  <section class="hotel-card">
    <figure>
      <img
        width="200"
        height="150"
        :src="imageHotel(hotel.imgUrl).toString()"
        alt="Imagem do Hotel"
      />
    </figure>
    <article class="hotel-card__details">
      <h3 class="m-l-12">{{ hotel.name }}</h3>
      <section>
        <v-rating v-model="hotelRating" size="x-small" readonly></v-rating>
        <article class="m-l-12">
          <p>Avaliações ({{ hotel.rates }})</p>
        </article>
        <v-checkbox
          v-model="selected"
          label="Comparar preço"
          :value="hotel.id"
          @update:modelValue="emit('selected', { id: hotel.id, isSelected: selected[0] })"
        ></v-checkbox>
      </section>
    </article>
    <article class="hotel-card__prices">
      <p>Diária: R$ {{ hotel.price }}</p>
      <p>
        Pacote por {{ hotelS.lastFormSearch.diffDays }}
        {{ hotelS.lastFormSearch.diffDays > 1 ? 'dias' : 'dia' }} R$
        {{
          (hotel.price * hotelS.lastFormSearch.rooms * hotelS.lastFormSearch.diffDays).toFixed(0)
        }}
      </p>
      <v-btn color="indigo">
        Comprar
        <v-overlay
          activator="parent"
          location-strategy="connected"
          scroll-strategy="block"
          width="400"
        >
          <v-card class="pa-4">
            <FormPayment :hotel="hotel"></FormPayment>
          </v-card>
        </v-overlay>
      </v-btn>
    </article>
  </section>
</template>

<style lang="scss">
.hotel-card {
  background-color: seashell;
  height: 150px;
  display: flex;
  max-width: 600px;
  .hotel-card__details {
    width: 250px;
  }
  .hotel-card__prices {
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    width: 250px;
    justify-content: space-evenly;
  }
}
@media (max-width: 520px) {
  .hotel-card {
    display: flex;
    height: auto;
    flex-direction: column;
    .hotel-card__details {
      width: 150px;
    }
    .hotel-card__prices {
      margin-right: 8px;
      display: flex;
      width: 150px;
      justify-content: space-evenly;
    }
  }
}
</style>
