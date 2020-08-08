export class StatusOrder {
  status: number
  description: string

  constructor(status?, description?) {
    this.status = status
    this.description = description
  }

  public getStatusList(): StatusOrder[] {
    return [
      new StatusOrder(1, 'Created'),
      new StatusOrder(2, 'Being Prepared'),
      new StatusOrder(3, 'Ready'),
      new StatusOrder(4, 'Delivered'),
      new StatusOrder(5, 'Concluded')
    ]
  }
}