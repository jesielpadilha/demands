import { IOrder } from './order.model';

export interface IBill {
    id: number
    total: number
    tableId: number
    RegistrationDate: Date
    ClosedDate?: Date
    Orders?: IOrder[]
}