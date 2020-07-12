import  {ICategoryProduct} from './category-product.model'
import  {IIngredient} from './ingredient.model'

export interface IProduct {
    id: number
    name: string
    description: string
    price: number
    stock: number
    categoryId: number
    category: ICategoryProduct
    productsIngredients?: any[]
    ingredients?: any[]
}