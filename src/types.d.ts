export interface Person {
  name: string
  age: number
}

export interface Employee extends Person {
  position: Position
  children?: Person[]
}

export enum Position {
  Developer = 'Developer',
  Designer = 'Designer',
  Manager = 'Manager',
  Accountant = 'Accountant',
  Other = 'Other'
}
