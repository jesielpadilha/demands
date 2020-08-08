import { ITable } from './table.model';
import { IProductOrder } from './product-order.model';

export interface IOrder {
    id: number
    productsOrder: IProductOrder[] 
    observation?: string
    tableId: number
    table?: ITable
}