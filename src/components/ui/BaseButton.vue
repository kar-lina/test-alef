<template>
  <button :class="['btn', look, { full: full }]"><slot></slot></button>
</template>
<script lang="ts" setup>
// import { type ButtonHTMLAttributes } from 'vue'

withDefaults(defineProps<{ look?: 'primary' | 'secondary' | 'text'; full?: boolean }>(), {
  look: 'primary'
})
</script>
<style lang="scss">
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 20px;
  padding: 10px 20px;
  max-width: 20rem;
  transition: all 0.3s ease 0s;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  &.primary {
    color: #fff;
    background-color: var(--color-primary);
    &:hover {
      background-color: var(--color-hover);
    }
  }
  &.secondary {
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    background-color: #fff;
    &:hover {
      background-color: var(--color-primary);
      color: #fff;
    }
  }
  &.text {
    display: inline-block;
    padding: 0;
    color: var(--color-primary);
    transition: color 0.3s ease 0s;
    &:hover {
      color: var(--color-hover);
    }
  }
  &.full {
    width: 100%;
  }
}

@media (max-width: 756px) {
  .btn {
    font-size: 12px;
  }
}
</style>
