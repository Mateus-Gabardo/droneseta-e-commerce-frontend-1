import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestGetAddress, requestPostAddress } from '../../services/address';
import { AddressRegistration } from '../../shared/@types/customer';
import * as customerActions from '../costumer/customerAction';
import { RootState } from '../reducers';

const useCustomerState = () =>
  useSelector((rootState: RootState) => rootState.customerState);

export const useAddress = () => useCustomerState().address;

export const usePostAddress = () =>
  useCallback(
    async (address: AddressRegistration) => requestPostAddress(address),
    []
  );

export const useGetAddress = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (customerId: string) => {
      const address = await requestGetAddress(customerId);
      dispatch(customerActions.getAddress(address));
    },
    [dispatch]
  );
};
