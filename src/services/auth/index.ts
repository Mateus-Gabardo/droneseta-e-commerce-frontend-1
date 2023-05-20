import { requestService } from '../../utils/requestService';

export const postRegister = async (
  nome: string,
  cpf: string,
  senha: string,
  cartaoCredito: string
) => {
  const url = 'http://localhost:8080/cliente';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(
    url,
    { nome, cpf, senha, cartaoCredito },
    headers,
    false,
    'POST'
  );
  return response;
};

export const postLogin = async (cpf: string, senha: string) => {
  const url = 'http://localhost:8080/cliente/login';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(
    url,
    { cpf, senha },
    headers,
    false,
    'POST'
  );
  return response;
};
