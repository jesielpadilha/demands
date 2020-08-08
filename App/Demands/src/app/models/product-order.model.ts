import { IProduct } from './product.model'
import { IIngredient } from './ingredient.model'
import { IProductOrderIngredient } from './productOrderIngredient.model'

export interface IProductOrder {
    productId: number
    product?: IProduct
    amount: number
    ingredients?: IIngredient[]
    observation?: string
    productOrderIngredients: IProductOrderIngredient[]
}