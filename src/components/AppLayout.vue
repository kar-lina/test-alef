<script setup lang="ts">
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <main class="page">
      <div class="page__container">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>
<style lang="css" scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.wrapper > main {
  flex: 1 1 auto;
}

.page__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}
</style>
