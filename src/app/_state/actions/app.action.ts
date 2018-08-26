import { Action } from '@ngrx/store';

export const APP_CREATE = '[App] Create';
export const APP_CREATED = '[App] Created';
export const APP_GET_ONE = '[App] Get One';
export const APP_GET_ALL = '[App] Get All';
export const APP_GET_ALL_COMPLETED = '[App] Get All Completed';
export const APP_LOADED = '[App] Loaded';
export const APP_UPDATE = '[App] Update';
export const APP_UPDATED = '[App] Updated';
export const APP_DEPOSIT = '[App] Deposit';
export const APP_DEPOSITED = '[App] Deposited';

export class AppLoadedAction implements Action {
  readonly type = APP_LOADED;
  constructor(public payload: any) { }
}

export class AppGetOneAction implements Action {
  readonly type = APP_GET_ONE;
  constructor(public payload: any) { }
}

export class AppGetAllAction implements Action {
  readonly type = APP_GET_ALL;
  constructor(public payload: any) { }
}

export class AppGetAllCompletedAction implements Action {
  readonly type = APP_GET_ALL_COMPLETED;
  constructor(public payload: any) { }
}

export class AppCreateAction implements Action {
  readonly type = APP_CREATE;
  constructor(public payload: any) { }
}

export class AppCreatedAction implements Action {
  readonly type = APP_CREATED;
  constructor(public payload: any) { }
}

export class AppUpdateAction implements Action {
  readonly type = APP_UPDATE;
  constructor(public payload: any) { }
}

export class AppUpdatedAction implements Action {
  readonly type = APP_UPDATED;
  constructor(public payload: any) { }
}

export class AppDepositAction implements Action {
  readonly type = APP_DEPOSIT;
  constructor(public payload: any) { }
}

export class AppDepositedAction implements Action {
  readonly type = APP_DEPOSITED;
  constructor(public payload: any) { }
}

export type Actions
  = AppCreateAction
  | AppCreatedAction
  | AppGetOneAction
  | AppGetAllAction
  | AppGetAllCompletedAction
  | AppLoadedAction
  | AppUpdateAction
  | AppUpdatedAction
  | AppDepositAction
  | AppDepositedAction;

