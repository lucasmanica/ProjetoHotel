<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { hotelsStore } from '../../stores/hotels.js'
import type { IformSearch } from '@/types/hotels/interface.js'
const hotelsS = hotelsStore()
const items = ref(['São José dos Campos', 'São Sebastião', 'Caraguatatuba', 'Ilhabela'])
const selected = ref([])
const selectedDate = ref(new Date(Date.now()))
const selectedFinalDate = ref(new Date(Date.now()))
const isMenuOpen = ref(false)
const isMenuOpenFinal = ref(false)
const menuOptions = ref(false)
const people = ref(1)
const rooms = ref(1)
const selectedFormatedDate = computed(() => {
  if (selectedDate.value == null) return
  return new Date(selectedDate.value).toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
})
const selectedFinalFormatedDate = computed(() => {
  if (selectedFinalDate.value == null) return
  return new Date(selectedFinalDate.value).toLocaleString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
})
const formSearch: IformSearch = reactive({
  city: selected,
  initDate: selectedDate,
  finalDate: selectedFinalDate,
  people: people,
  rooms: rooms
})
const clearInitDate = () => {
  selectedDate.value = new Date(Date.now())
}
const clearFinalDate = () => {
  selectedFinalDate.value = new Date(Date.now())
}
const getFilteredHotels = () => {
  if (formSearch.city == null) {
    hotelsS.getHotels(formSearch)
  } else {
    hotelsS.getFilteredHotels(formSearch)
  }
}
</script>
<template lang="">
  <v-form class="form">
    <v-container>
      <v-row>
        <v-col md="12" lg="3" sm="12" xs="12">
          <v-autocomplete
            prepend-inner-icon="mdi-map-marker"
            v-model="selected"
            :items="items"
            label="To"
            hide-details
            hide-no-data
            hide-selected
            single-line
          >
            <template v-slot:label>
              <p class="text--italic">Destino</p>
              <span>Insira uma cidade</span>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col md="6" lg="2" sm="12" xs="12">
          <v-menu v-model="isMenuOpen" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field
                prepend-inner-icon="mdi-calendar-range"
                label="Data inicial"
                :model-value="selectedFormatedDate"
                readonly
                v-bind="props"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="selectedDate"
              title=""
              :min="new Date()"
              :allowedDates="(dt) => dt >= new Date()"
            >
              <template v-slot:header> </template>
              <template v-slot:actions>
                <v-btn
                  icon="mdi-trash-can-outline"
                  color="red"
                  title="Limpar Data"
                  @click="clearInitDate()"
                >
                </v-btn>
              </template>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col md="6" lg="2" sm="12" xs="12">
          <v-menu
            v-model="isMenuOpenFinal"
            :close-on-content-click="false"
            :disabled="selectedDate == null"
          >
            <template v-slot:activator="{ props }">
              <v-text-field
                prepend-inner-icon="mdi-calendar-range"
                label="Data final"
                :model-value="selectedFinalFormatedDate"
                readonly
                v-bind="props"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="selectedFinalDate"
              title=""
              :min="new Date()"
              :allowedDates="(dt) => dt >= new Date() && dt > selectedDate"
            >
              <template v-slot:header> </template>
              <template v-slot:actions>
                <v-btn
                  icon="mdi-trash-can-outline"
                  color="red"
                  title="Limpar Data"
                  @click="clearFinalDate()"
                >
                </v-btn>
              </template>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col md="4" lg="2" sm="12" xs="12">
          <v-menu v-model="menuOptions" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-card color="indigo" v-bind="props" class="form__actions">
                <span>Hóspedes: {{ people }}</span>
                <span>Quartos: {{ rooms }}</span>
              </v-card>
            </template>
            <v-card max-width="200">
              <v-list>
                <v-list-item>
                  <v-text-field v-model="people" readonly>
                    <template v-slot:append>
                      <v-icon color="red" @click="people++"> mdi-plus </v-icon>
                    </template>
                    <template v-slot:label>
                      <span>
                        <v-icon icon="mdi-account-multiple-plus-outline"></v-icon>Hóspedes</span
                      >
                    </template>
                    <template v-slot:prepend v-if="people > 1">
                      <v-icon color="green" @click="people--"> mdi-minus </v-icon>
                    </template>
                  </v-text-field>
                </v-list-item>

                <v-list-item>
                  <v-text-field v-model="rooms" readonly>
                    <template v-slot:append>
                      <v-icon color="red" @click="rooms++"> mdi-plus </v-icon>
                    </template>
                    <template v-slot:label>
                      <span><v-icon icon="mdi-bed-outline"></v-icon>Quartos</span>
                    </template>
                    <template v-slot:prepend v-if="rooms > 1">
                      <v-icon color="green" @click="rooms--"> mdi-minus </v-icon>
                    </template>
                  </v-text-field>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-col>
        <v-col md="4" lg="2" sm="12" xs="12">
          <v-btn class="form__actions" color="primary" @click="getFilteredHotels()" size="large">
            Pesquisar
            <v-icon icon="mdi-magnify" end></v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<style lang="scss">
.v-picker-title {
  padding: 0px !important;
}
.form__actions {
  height: 56px !important;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    font-weight: 700;
  }
}
@media (max-width: 700) {
  .form__actions {
    font-size: 8px;
  }
}
</style>
