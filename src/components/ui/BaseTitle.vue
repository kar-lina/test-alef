<template>
  <h1 :class="['title', size]"><slot></slot></h1>
</template>
<script lang="ts" setup>
defineProps<{ size: 'sm' | 'md' | 'lg' }>()
</script>
<style lang="css" scoped>
.title {
  font-weight: 500;
  margin: 0;
}
.title.sm {
  font-size: 1rem;
}
.title.md {
  font-size: 1.5rem;
}
.title.lg {
  font-size: 2rem;
}
@media (max-width: 756px) {
  .title.sm {
    font-size: 12px;
  }
  .title.md {
    font-size: 1rem;
  }
  .title.lg {
    font-size: 20px;
  }
}
</style>
