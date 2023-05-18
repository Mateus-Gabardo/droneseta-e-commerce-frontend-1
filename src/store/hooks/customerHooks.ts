import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { Customer, CustomerLogin } from '../../shared/@types/customer';
import * as customerActions from '../costumer/customerAction';
import { postRegister, postLogin } from '../../services/auth';
import { useGetSession } from './sessionHooks';

const useCustomerState = () =>
  useSelector((rootState: RootState) => rootState.customerState);

export const useCustomer = () => useCustomerState().customer;

export const useGetRegister = () => {
  const dispatch = useDispatch();
  const getSession = useGetSession();
  return useCallback(async (customer: Customer) => {
    const result = await postRegister(
      customer.nome,
      customer.cpf,
      customer.senha
    );
    getSession({ customer: result, cart: [] });
    dispatch(customerActions.getCustomer(result));
  }, []);
};

export const useGetLogin = () => {
  const dispatch = useDispatch();
  const getSession = useGetSession();
  return useCallback(async (customer: CustomerLogin) => {
    const result = await postLogin(customer.cpf, customer.senha);
    getSession({ customer: result, cart: [] });
    dispatch(customerActions.getCustomer(result));
  }, []);
};
