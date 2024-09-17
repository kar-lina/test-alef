<script setup lang="ts">
import { useEmployeeStore, type Employee } from '@/stores/employer'
const { changeEmployeeData, employer } = useEmployeeStore()
import { toast } from 'vue3-toastify'
import { useFieldArray, useForm } from 'vee-validate'
import * as yup from 'yup'
import type { Person } from '@/types'
import { reactive } from 'vue'
import { BaseInput, BaseTitle } from './ui'

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Обязательное поле'),
    age: yup
      .number()
      .typeError('Возраст должен быть числом')
      .required('Обязательное поле')
      .min(0, 'Возраст не может быть отрицательным числом')
      .max(100, 'Возраст не может быть больше 100'),
    children: yup.array<Person>().of(
      yup.object({
        name: yup.string().required('Обязательное поле'),
        age: yup
          .number()
          .typeError('Возраст должен быть числом')
          .required('Обязательное поле')
          .min(0, 'Возраст не может быть отрицательным числом')
          .max(100, 'Возраст не может быть больше 100')
      })
    )
  }),
  initialValues: employer
})
const fieldArray = reactive(useFieldArray<Person>('children'))

const onSubmit = handleSubmit((values: Employee) => {
  try {
    changeEmployeeData(values)
    toast('Данные сохранены')
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <form @submit.prevent="() => onSubmit()">
    <div class="form-row">
      <BaseTitle size="md">Персональные данные</BaseTitle>

      <BaseInput name="name" label="ФИО" placeholder="Введите имя" />
      <BaseInput name="age" label="Возраст" placeholder="Введите возраст" type="number" />
    </div>
    <div class="form-row">
      <div class="flex">
        <BaseTitle size="md">Дети (макс.5)</BaseTitle>
        <button
          @click.prevent="() => fieldArray.push({ name: '', age: 0 })"
          class="btn form__add"
          :disabled="fieldArray.fields.length >= 5"
        >
          Добавить ребенка
        </button>
      </div>

      <template v-for="(child, index) in fieldArray.fields" :key="child.key">
        <div class="form-group">
          <BaseInput
            :name="`children[${index}].name`"
            label="Имя ребенка"
            placeholder="Введите имя"
            class="flex__input"
          />
          <BaseInput
            :name="`children[${index}].age`"
            label="Возраст ребенка"
            placeholder="Введите возраст"
            class="flex__input"
            type="number"
          />
          <button class="btn form__remove" @click.prevent="() => fieldArray.remove(index)">
            Удалить
          </button>
        </div>
      </template>
    </div>
    <div class="form-row">
      <button class="btn form__submit" type="submit">Сохранить</button>
    </div>
  </form>
</template>
<style lang="css" scoped>
.form-row {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 100%;
}
.flex {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.flex__input {
  flex: 1 1 auto;
}

.btn {
  border: var(--color-primary) 1px solid;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: var(--color-primary);
  max-width: 20rem;
  transition: all 0.3s ease 0s;
}
.btn:disabled {
  opacity: 0.5;
}
@media (any-hover: hover) {
  .btn:hover:not(:disabled) {
    color: #053664;
    border-color: #053664;
  }
}
.form__remove {
  border: none;
  width: 80px;
  height: 20px;
  align-self: center;
}
.form__submit {
  align-self: center;
  min-width: 200px;
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
