<template>
  <div class="input__container">
    <label class="input__label" :for="name">
      {{ label }}
      <input :name="name" type="text" v-model="value" :placeholder="placeholder" class="input" />
    </label>
    <span v-if="errorMessage" class="input__error">{{ errorMessage }}</span>
  </div>
</template>
<script lang="ts" setup>
import { useField } from 'vee-validate'
const props = defineProps<{ label: string; placeholder: string; name: string }>()
const { value, errorMessage } = useField(() => props.name)
</script>
<style lang="css">
.input__container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}
.input__label {
  display: block;
  flex: 0 0 auto;
  padding: 0.5rem 0 0.5rem 1rem;
  border: var(--color-border) 1px solid;
  border-radius: 8px;
  font-size: 12px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s ease 0s;
}
.input {
  font-size: 1rem;
  color: var(--color-text);
}
.input__label:has(input:is(:focus)) {
  color: var(--color-primary);
  border: var(--color-primary) 1px solid;
}

.input__error {
  display: inline-block;
  color: red;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 24px;
}
</style>
