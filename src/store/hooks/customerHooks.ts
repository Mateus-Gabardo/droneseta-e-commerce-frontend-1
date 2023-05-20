import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import {
  CustomerLogin,
  CustomerRegistration,
} from '../../shared/@types/customer';
import * as customerActions from '../costumer/customerAction';
import { postRegister, postLogin } from '../../services/auth';
import { useGetSession } from './sessionHooks';
import {
  requestDeleteCustomer,
  requestGetCustomers,
} from '../../services/customer';
import { requestPostAddress } from '../../services/address';

const useCustomerState = () =>
  useSelector((rootState: RootState) => rootState.customerState);

export const useCustomer = () => useCustomerState().customer;

export const useGetRegister = () => {
  const dispatch = useDispatch();
  const getSession = useGetSession();
  return useCallback(async (customer: CustomerRegistration) => {
    const result = await postRegister(
      customer.nome,
      customer.cpf,
      customer.senha,
      customer.cartaoCredito.replaceAll(' ', '')
    );
    await requestPostAddress({
      ...customer.endereco,
      clienteId: result.clienteId,
    });
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

export const useCustomers = () => useCustomerState().customers;

export const useGetCustomers = () => {
  const dispatch = useDispatch();
  return useCallback(async () => {
    const result = await requestGetCustomers();
    dispatch(customerActions.getCustomers(result));
  }, [dispatch]);
};

export const useDeleteCustomer = () =>
  useCallback(
    async (customerId: string) => requestDeleteCustomer(customerId),
    []
  );
