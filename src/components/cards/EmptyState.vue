<script setup lang="ts">
defineProps({
  text: String
})
</script>
<template>
  <v-empty-state
    icon="mdi-magnify"
    :text="text"
    title="Não conseguimos encontrar nenhum resultado =("
  ></v-empty-state>
</template>
<style lang="scss" scoped></style>
