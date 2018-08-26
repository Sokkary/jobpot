import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducer, combineReducers, createSelector, compose } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import * as fromCommon from './common.reducer';
import * as fromApp from './app.reducer';

export interface State {
  common: fromCommon.State;
  app: fromApp.State;
}

export const reducers = {
  common: fromCommon.reducer,
  app: fromApp.reducer,
};

// export state & entities/props to be used from components as `store.select(getUserState)`
export const getCommonState = (state: State) => state.common;
export const getLoadingStatus = createSelector(getCommonState, fromCommon.getLoadingStatus);
export const getBasicUser = createSelector(getCommonState, fromCommon.getUser);

export const getAppState = (state: State) => state.app;
export const getApp = createSelector(getAppState, fromApp.getApp);
export const getApps = createSelector(getAppState, fromApp.getApps);
export const getAppLoadingStatus = createSelector(getAppState, fromApp.getLoadingStatus);
