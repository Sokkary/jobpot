import { Action } from '@ngrx/store';

export const LOADING = 'Loading';
export const OPERATION_FAILED = 'OperationFailed';
export const OPERATION_SUCCEDED = 'OperationSucceded';
export const NAVIGATE = 'Navigate';
export const NO_ACTION = 'NoAction';
export const SIGNOUT = 'SignOut';


export class LoadingAction implements Action {
  readonly type = LOADING;
  constructor(public payload: any) { }
}

export class OperationSuccededAction implements Action {
  readonly type = OPERATION_SUCCEDED;
  constructor(public payload: any) { }
}

export class OperationFailedAction implements Action {
  readonly type = OPERATION_FAILED;
  constructor(public payload: any) { }
}

export class NavigateAction implements Action {
  readonly type = NAVIGATE;
  constructor(public payload: any) { }
}

export class NoAction implements Action {
  readonly type = NO_ACTION;
  constructor(public payload: any) { }
}

export class SignOutAction implements Action {
  readonly type = SIGNOUT;
  constructor(public payload: any) { }
}

export type Actions
  = LoadingAction
  | OperationSuccededAction
  | OperationFailedAction
  | NavigateAction
  | NoAction
  | SignOutAction;
