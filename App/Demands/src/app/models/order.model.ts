import { ITable } from './table.model';
import { IProductOrder } from './product-order.model';

export interface IOrder {
    id: number
    products: IProductOrder[] 
    observation?: string
    table: ITable
}