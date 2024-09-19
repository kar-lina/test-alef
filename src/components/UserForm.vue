<template>
  <form class="form" @submit.prevent="() => onSubmit()">
    <BaseTitle class="form__title" size="md">Персональные данные</BaseTitle>
    <div class="form__row">
      <BaseInput name="name" label="ФИО" placeholder="Введите имя" />
      <BaseInput name="age" label="Возраст" placeholder="Введите возраст" type="number" />
    </div>
    <div class="form__title">
      <BaseTitle size="md">Дети (макс.5)</BaseTitle>
      <BaseButton
        look="secondary"
        @click.prevent="() => fieldArray.push({ name: '', age: 0 })"
        :disabled="fieldArray.fields.length >= 5"
      >
        <PlusIcon />
        Добавить ребенка
      </BaseButton>
    </div>
    <div class="form__row">
      <template v-for="(child, index) in fieldArray.fields" :key="child.key">
        <div class="form__group">
          <BaseInput
            :name="`children[${index}].name`"
            label="Имя ребенка"
            placeholder="Введите имя"
          />
          <BaseInput
            :name="`children[${index}].age`"
            label="Возраст ребенка"
            placeholder="Введите возраст"
            type="number"
          />
          <BaseButton
            look="text"
            class="form__remove"
            @click.prevent="() => fieldArray.remove(index)"
          >
            Удалить
          </BaseButton>
        </div>
      </template>
    </div>
    <div class="form__submit">
      <BaseButton type="submit" full>Сохранить</BaseButton>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useEmployeeStore, type Employee } from '@/stores/employer'
import { toast } from 'vue3-toastify'
import { useFieldArray, useForm } from 'vee-validate'
import * as yup from 'yup'
import type { Person } from '@/types'
import { reactive } from 'vue'
import { BaseInput, BaseTitle, BaseButton } from './ui'
import { PlusIcon } from './icons'

const { changeEmployeeData, employer } = useEmployeeStore()

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

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 10px;
  }

  &__row {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 100%;
  }
  &__group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  &__submit {
    align-self: center;
    min-width: 200px;
  }
}
@media (min-width: 756px) {
  .form__row {
    margin-bottom: 2rem;
    gap: 1rem;
  }
  .form__group {
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
}
</style>
