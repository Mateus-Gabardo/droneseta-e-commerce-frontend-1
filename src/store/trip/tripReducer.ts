import { GetTripResponse } from '../../shared/@types/trip';
import * as tripActions from './tripAction';

export interface State {
  trips?: GetTripResponse;
}

const INITIAL_STATE: State = {
  trips: undefined,
};

export type Actions = tripActions.GetTrips;

// eslint-disable-next-line default-param-last
export const tripReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case tripActions.GET_TRIPS: {
      const { trips } = action.payload;
      return {
        ...state,
        trips,
      };
    }
    default:
      return state;
  }
};
