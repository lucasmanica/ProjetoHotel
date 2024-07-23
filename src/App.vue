<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <section class="app__view">
    <RouterView />
  </section>
</template>

<style lang="scss">
@media (max-width: 700px) {
  .v-row {
    display: flex !important;
    flex-direction: column !important;
  }
}
</style>
