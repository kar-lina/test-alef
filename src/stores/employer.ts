import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export interface User {
  name: string
  age?: number
}

export interface Employee extends User {
  children?: User[]
}

export const useEmployeeStore = defineStore('employee', () => {
  const employer: Ref<Employee> = ref({
    name: '',
    // age: ,
    children: []
  })

  function changeEmployeeData(newData: Employee) {
    employer.value = newData
  }

  function removeChild(childName: string) {
    employer.value.children = employer.value.children?.filter((child) => child.name !== childName)
  }
  function addChild() {
    employer.value.children = [...(employer.value.children || []), { name: 'New Child', age: 0 }]
  }

  return { employer, changeEmployeeData, removeChild, addChild }
})
