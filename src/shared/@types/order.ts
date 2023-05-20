import { Pageable } from '.';
import { Address, Customer } from './customer';
import { Product } from './product';

export interface OrderContent {
  cliente: Customer;
  endereco: Address;
  produtos: Product[];
  status: string;
  pedidoId: string;
}

export interface GetOrdersResponse {
  content: OrderContent[];
  pageable: Pageable;
}

export interface Order {
  cpf: string;
  enderecoId: string;
  produtoId: string[];
  status: string;
}
