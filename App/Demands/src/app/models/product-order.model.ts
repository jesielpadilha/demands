import { IProduct } from './product.model'
import { IIngredient } from './ingredient.model'

export interface IProductOrder {
    product: IProduct
    amount: number
    ingredientsAdded: IIngredient[]
    ingredientsRemoved: IIngredient[]
    observation?: string
}