import { Pageable } from '.';

interface Product {
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  tamanhoCamiseta: string;
  imagem: string;
}

export interface GetProductsResponse {
  content: Product[];
  pageable: Pageable;
}
