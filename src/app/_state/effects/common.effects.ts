import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import { Router } from '@angular/router';

import { isJSON } from '../../utils';
import { OPERATION_FAILED, NAVIGATE, SIGNOUT, NavigateAction } from '../actions/common.action';
import { AlertService } from '../../services/alert.service';

@Injectable()
export class CommonEffects {
  constructor(
    private actions$: Actions,
    private alert: AlertService,
    private router: Router
  ) { }

  @Effect({ dispatch: false })
  operationFailed$: Observable<Action> = this.actions$.pipe(
    ofType(OPERATION_FAILED),
    tap((action: any) => {
      console.log('failed err: ', action);

      const error: any = action['payload'].error;

      if (!error) {
        this.alert.error('No error message detected', action['payload'].title || 'Opps, something went wrong!');
        return;
      }

      if (!error.message) {
        const errMessage = error.status > 0 ? error.statusText : 'Unable to reach the backend service!';
        this.alert.error(`(${error.status || 0}) - ${errMessage}`, action['payload'].title || 'Opps, something went wrong!');
        return;
      }

      // // extract the errors from http response
      if (Array.isArray(error.message)) {
        const errMessage = error.message.reduce((m, e) => m += e.message + ' | ', '');
        this.alert.error(errMessage, action['payload'].title || 'Opps, something went wrong!');
        return;
      }

      this.alert.error(error.message, action['payload'].title || 'Opps, something went wrong!');
      return;
    }));

  @Effect({ dispatch: false })
  navigate$: Observable<Action> = this.actions$.pipe(
    ofType(NAVIGATE),
    tap(action => this.router.navigate(action['payload'].url))
  );

}
