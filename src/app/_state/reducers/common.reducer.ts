import { Store } from '@ngrx/store';
import { LOADING, OPERATION_FAILED, OPERATION_SUCCEDED, Actions, SIGNOUT, NAVIGATE } from '../actions/common.action';
import * as AppActions from '../actions/app.action';
import * as CommonActions from '../actions/common.action';

export interface State {
  isLoading: boolean;
  user: any;
}

export const initialState = {
  isLoading: false,
  user: {}
};

// reducer
export function reducer(
  state = initialState,
  action: Actions
    | AppActions.Actions
    | CommonActions.Actions
): State {

  console.log('action: ', action.type, ' - state: ', state);

  switch (action.type) {

    case AppActions.APP_CREATE:

    case LOADING: {
      return { ...state, isLoading: true };
    }

    case AppActions.APP_CREATED:

    case NAVIGATE:
    case OPERATION_SUCCEDED:
    case OPERATION_FAILED: {
      return { ...state, isLoading: false };
    }

    case SIGNOUT: {
      return { ...state, isLoading: false, user: {} };
    }

    default: {
      return state;
    }
  }
}

export const getLoadingStatus = (state: State) => state.isLoading;
export const getUser = (state: State) => state.user;
