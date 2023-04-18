export interface Customer {
  nome: string;
  cpf: string;
  senha: string;
  cartaoCredito?: string;
  tipoCliente?: 'NORMAL' | 'ADM';
  enderecos?: string[];
  id?: string;
}

export interface CustomerLogin {
  cpf: string;
  senha: string;
}
