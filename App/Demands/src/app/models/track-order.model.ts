import { IOrder } from './order.model';
import { IUser } from './user.model';

export interface ITrackOrder {
    id: number
    order: IOrder
    date: Date
    user: IUser
    status: number
}