export interface IUser {
    id: number
    name: string
    username: string
    password: string
    isActive: boolean
    type: number
}

export enum UserType { Admin = 1, Manager = 2, Waiter = 3}