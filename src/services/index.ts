import { requestService } from '../utils/requestService';

export const postRegister = async (
  nome: string,
  cpf: string,
  senha: string
) => {
  const url = 'http://localhost:8080/cliente';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(
    url,
    { nome, cpf, senha },
    headers,
    false,
    'POST'
  );
  return response;
};
