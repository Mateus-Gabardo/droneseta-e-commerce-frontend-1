import { Product } from '../../shared/@types/product';
import { requestService } from '../../utils/requestService';

export const requestGetProducts = async () => {
  const url = 'http://localhost:8080/produto';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'GET');
  return response;
};

export const requestDeleteProduct = async (productId: string) => {
  const url = `http://localhost:8080/produto/${productId}`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'DELETE');
  return response;
};

export const requestCreateProduct = async (product: Product) => {
  const url = `http://localhost:8080/produto`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(
    url,
    {
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      quantidade: product.quantidade,
      tamanhoCamiseta: product.tamanhoCamiseta,
      imagem: product.imagem,
    },
    headers,
    false,
    'POST'
  );
  return response;
};

export const requestGetBestSellers = async () => {
  const url = 'http://localhost:8080/produto/produtoMaisVendido';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'GET');
  return response;
};
