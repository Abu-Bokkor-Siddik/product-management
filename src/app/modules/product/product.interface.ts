export type Inventory = {
    quantity: number
    inStock: boolean
  }
  export type Variantes = {
    type: string,
    value: string
  }
  
  export type Product = {
    name: string,
    description: string,
    price: number,
    category: string,
    tags:string[],
    variants: [Variantes]
    inventory: Inventory
  }
  