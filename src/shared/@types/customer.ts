import { Pageable } from '.';

export interface Customer {
  nome: string;
  cpf: string;
  senha: string;
  cartaoCredito?: string;
  tipoCliente?: 'NORMAL' | 'ADM';
  enderecos?: Address[];
  clienteId?: string;
  id?: string;
}

export interface CustomerRegistration {
  nome: string;
  cpf: string;
  senha: string;
  cartaoCredito: string;
  tipoCliente?: 'NORMAL' | 'ADM';
  endereco: AddressRegistration;
  clienteId?: string;
}

export interface AddressRegistration {
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  estado: string;
  clienteId: string;
  logradouro: string;
  numero: number;
}

export interface Address {
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  estado: string;
  id: string;
  logradouro: string;
  numero: number;
}

export interface CustomerLogin {
  cpf: string;
  senha: string;
}

export interface GetCustomersResponse {
  content: Customer[];
  pageable: Pageable;
}
