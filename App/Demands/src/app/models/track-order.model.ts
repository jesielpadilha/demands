import { IOrder } from './order.model';
import { IUser } from './user.model';

export interface ITrackOrder {
    id: number
    order: IOrder
    date: Date
    user: IUser
    status: StatusOrder
}

export enum StatusOrder {
    Created = 'Created',
    BeingPrepared = 'Being Prepared',
    Ready = 'Ready',
    Delivered = 'Delivered'
}