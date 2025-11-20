export interface Product {
  id: string
  slug: string
  title: string
  vendor: string
  price: number
  currency: string
  image: string
  inStock: boolean
  category?: string
  description?: string
}


