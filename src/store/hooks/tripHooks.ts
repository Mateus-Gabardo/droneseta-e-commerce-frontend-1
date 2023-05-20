import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../reducers';
import { requestGetTrips } from '../../services/trip';
import * as tripActions from '../trip/tripAction';

const useTripState = () =>
  useSelector((rootState: RootState) => rootState.tripState);

export const useTrips = () => useTripState().trips;

export const useGetTrips = () => {
  const dispatch = useDispatch();

  return useCallback(async () => {
    const result = await requestGetTrips();
    dispatch(tripActions.getTrips(result));
  }, [dispatch]);
};
