import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../reducers';
import * as loadingActions from '../loading/loadingAction';

const useLoadingState = () =>
  useSelector((rootState: RootState) => rootState.loadingState);

export const useLoading = () => useLoadingState().isLoading;

export const useShowLoading = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(loadingActions.showLoading());
  }, []);
};

export const useHideLoading = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(loadingActions.hideLoading());
  }, []);
};
