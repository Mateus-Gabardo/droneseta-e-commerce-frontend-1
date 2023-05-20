import { GetTripResponse } from '../../shared/@types/trip';

export const GET_TRIPS = 'GET_TRIPS';

export const getTrips = (trips: GetTripResponse) => ({
  type: GET_TRIPS,
  payload: {
    trips,
  },
});

export interface GetTrips {
  type: typeof GET_TRIPS;
  payload: {
    trips: GetTripResponse;
  };
}
