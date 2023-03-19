import * as loadingActions from './loadingAction';

export interface State {
  isLoading: boolean;
}

const INITIAL_STATE: State = {
  isLoading: false,
};

export type Actions = loadingActions.HideLoading | loadingActions.ShowLoading;

// eslint-disable-next-line default-param-last
export const loadingReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case loadingActions.SHOW_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case loadingActions.HIDE_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
