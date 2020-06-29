import { Injectable } from '@angular/core';
import { ITable } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  getAll() {
    return TABLE_LIST
  }

  getById(id: number): ITable {
    return TABLE_LIST.filter(table => table.id == id)[0]
  }
}

export const TABLE_LIST: ITable[] = [
  {
    id: 1,
    number: 1,
    isBusy: false
  },
  {
    id: 2,
    number: 2,
    isBusy: false
  },
  {
    id: 3,
    number: 3,
    isBusy: true
  },
  {
    id: 4,
    number: 4,
    isBusy: false
  },
  {
    id: 5,
    number: 5,
    isBusy: false
  },
  {
    id: 6,
    number: 6,
    isBusy: false
  },
  {
    id: 7,
    number: 7,
    isBusy: false
  },
  {
    id: 8,
    number: 8,
    isBusy: false
  },
  {
    id: 9,
    number: 9,
    description: 'Family table (for 6 people)',
    isBusy: false
  },
  {
    id: 10,
    number: 10,
    description: 'Table for two',
    isBusy: false
  }
]