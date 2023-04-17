import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { Customer } from '../../shared/@types/customer';
import * as customerActions from '../costumer/customerAction';
import { postRegister } from '../../services';

const useCustomerState = () =>
  useSelector((rootState: RootState) => rootState.customerState);

export const useCustomer = () => useCustomerState.

export const useGetRegister = () => {
  const dispatch = useDispatch();
  return useCallback(async (customer: Customer) => {
    const result = await postRegister(
      customer.nome,
      customer.cpf,
      customer.senha
    );
    dispatch(customerActions.getCustomer(result));
  }, []);
};
