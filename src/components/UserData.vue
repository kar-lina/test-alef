<script setup lang="ts">
import { computed } from 'vue'
import BaseTitle from './ui/BaseTitle.vue'
import { useEmployeeStore, type Employee } from '@/stores/employer'
const { employer } = useEmployeeStore()
const getPersonInfoDetails = (name: string, age: number): string =>
  (name ? name : 'Имя не заполнено') +
  ', ' +
  (age || age === 0 ? age + ' лет' : 'Возраст не указан')

const displayData = computed(() => getPersonInfoDetails(employer.name, employer.age))
const displayDataChildren = computed(() =>
  employer?.children?.map((child) => getPersonInfoDetails(child.name, child.age))
)
</script>

<template>
  <div class="user-info">
    <div>
      <BaseTitle size="sm">Персональные данные</BaseTitle>
      <p>
        {{ displayData }}
      </p>
    </div>
    <div>
      <BaseTitle size="sm">Дети</BaseTitle>
      <template v-if="displayDataChildren?.length">
        <div v-for="(child, idx) in displayDataChildren" :key="idx" class="chid-card">
          {{ child }}
        </div>
      </template>
      <p v-else>Детей нет</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.user-info {
  padding: 1rem;
  border-radius: 12px;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.user-info > div > *:not(:last-child) {
  margin-bottom: 0.5rem;
}
.chid-card {
  padding: 0.5rem;
  border-radius: 8px;
  font-weight: bold;
  background-color: #ccc;
  max-width: 120px;
}
@media (min-width: 756px) {
  .form-row {
    margin-bottom: 2rem;
    gap: 1rem;
  }
  .form-group {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
