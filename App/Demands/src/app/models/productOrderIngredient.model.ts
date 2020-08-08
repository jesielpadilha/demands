import { IIngredient } from './ingredient.model';
import { IProductOrder } from './product-order.model';

export interface IProductOrderIngredient{
  productOrderId: number 
  productOrder?: IProductOrder
  ingredientId: number
  ingredient?: IIngredient
  amountIngredient?: number
}