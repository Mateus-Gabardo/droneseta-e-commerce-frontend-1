import { Customer } from './customer';

export interface Session {
  customer: Customer;
  cart: CartItem[];
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
