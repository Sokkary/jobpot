import { Store } from '@ngrx/store';
import * as AppActions from '../actions/app.action';

// types
export interface IApp {
  name: string;
  description: string;
  fund: number;
}

export interface State {
  isLoading: boolean;
  app: IApp;
  apps: Array<IApp>;
}

export const initialState = {
  isLoading: false,
  app: {
    name: '',
    description: '',
    fund: 0
  },
  apps: []
};

// reducer
export function reducer(state = initialState, action: AppActions.Actions): State {
  console.log('action: ', action.type, ' - state: ', state);
  switch (action.type) {

    case AppActions.APP_LOADED:
    case AppActions.APP_CREATED:
    case AppActions.APP_UPDATED:
    case AppActions.APP_DEPOSITED: {
      const app = action.payload.app;
      const isLoading = false;
      return { ...state, app, isLoading };
    }

    case AppActions.APP_GET_ALL_COMPLETED: {
      const apps = action.payload.apps;
      const isLoading = false;
      return { ...state, apps, isLoading };
    }

    case AppActions.APP_GET_ONE:
    case AppActions.APP_GET_ALL:
    case AppActions.APP_CREATE:
    case AppActions.APP_UPDATE:
    case AppActions.APP_DEPOSIT: {
      const isLoading = true;
      return { ...state, isLoading };
    }

    default: {
      return state;
    }
  }
}

export const getApp = (state: State) => state.app;
export const getApps = (state: State) => state.apps;
export const getLoadingStatus = (state: State) => state.isLoading;
