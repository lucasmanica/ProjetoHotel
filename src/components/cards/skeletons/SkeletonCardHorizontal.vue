<script lang="ts" setup></script>
<template>
  <section class="skeleton">
    <v-skeleton-loader class="border" width="300" type="image"></v-skeleton-loader>
    <v-skeleton-loader class="border" width="300" type="text, text, text"></v-skeleton-loader>
  </section>
</template>
<style lang="scss" scoped>
.skeleton {
  display: flex;
  justify-content: center;
}
@media (max-width: 600px) {
  .skeleton {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
