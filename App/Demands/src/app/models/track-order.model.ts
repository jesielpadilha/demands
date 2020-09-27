import { IOrder } from './order.model';
import { IUser } from './user.model';

export interface ITrackOrder {
    id: number
    order?: IOrder
    orderId: number
    registrationDate: Date
    user?: IUser
    userId: number
    status: number
}