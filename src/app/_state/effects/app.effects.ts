// import { Injectable } from '@angular/core';
// import { Action } from '@ngrx/store';
// import { Actions, Effect, ofType } from '@ngrx/effects';
// import { tap } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/delay';

// // import { AppService } from '../../services/app.service';
// import { Router } from '@angular/router';
// import { AlertService } from '../../services/alert.service';
// import { NavigateAction, OperationFailedAction, NoAction } from '../actions/common.action';
// import { APP_CREATE, APP_GET_ONE, AppLoadedAction, APP_GET_ALL, AppGetAllCompletedAction, AppCreatedAction, APP_CREATED, APP_UPDATE, APP_UPDATED, AppUpdatedAction, APP_DEPOSITED, APP_DEPOSIT, AppDepositedAction } from '../actions/app.action';

// @Injectable()
// export class AppEffects {
//   constructor(
//     private actions$: Actions,
//     private appService: AppService,
//     private router: Router,
//     private alert: AlertService
//   ) { }

//   @Effect()
//   appCreate$: Observable<Action> = this.actions$
//     .ofType(APP_CREATE)
//     .switchMap((action) => {
//       return this.appService.create(action['payload'])
//         .map((app: any) => {
//           return new AppCreatedAction({ app });
//         })
//         .catch(err => Observable.of(new OperationFailedAction({ error: err.error, title: 'Failed App Creation' })));
//     });

//   @Effect()
//   appCreated$: Observable<Action> = this.actions$
//     .ofType(APP_CREATED)
//     .map((action) => {
//       console.log('action: ', action);
//       this.alert.success('App has been created successfully', 'Successful Operation');
//       return new NavigateAction({ url: ['/client/apps/' + action['payload'].app.id] });
//     });

//   @Effect()
//   appUpdate$: Observable<Action> = this.actions$
//     .ofType(APP_UPDATE)
//     .switchMap((action) => {
//       return this.appService.update(action['payload'].id, action['payload'].data)
//         .map((app: any) => {
//           return new AppUpdatedAction({ app });
//         })
//         .catch(err => Observable.of(new OperationFailedAction({ error: err.error, title: 'Failed App Update' })));
//     });

//   @Effect()
//   appUpdated$: Observable<Action> = this.actions$
//     .ofType(APP_UPDATED)
//     .map((action) => {
//       console.log('action: ', action);
//       this.alert.success('App has been updated successfully', 'Successful Operation');
//       return new NavigateAction({ url: ['/client/apps/' + action['payload'].app.id] });
//     });

//   @Effect()
//   appDeposit$: Observable<Action> = this.actions$
//     .ofType(APP_DEPOSIT)
//     .switchMap((action) => {
//       return this.appService.deposit(action['payload'].id, action['payload'].amount)
//         .map((app: any) => {
//           return new AppDepositedAction({ app });
//         })
//         .catch(err => Observable.of(new OperationFailedAction({ error: err.error, title: 'Failed App Deposit' })));
//     });

//   @Effect()
//   appDeposited$: Observable<Action> = this.actions$
//     .ofType(APP_DEPOSITED)
//     .map((action) => {
//       console.log('action: ', action);
//       this.alert.success('App funds has been updated successfully', 'Successful Operation');
//       return new NoAction({});
//       // return new NavigateAction({ url: ['/client/apps/' + action['payload'].app.id] });
//     });

//   @Effect()
//   getOne$: Observable<Action> = this.actions$
//     .ofType(APP_GET_ONE)
//     .switchMap((action) => {
//       return this.appService.get(action['payload'].id)
//         .map((app: any) => {
//           return new AppLoadedAction({ app });
//         })
//         .catch(err => Observable.of(new OperationFailedAction({ error: err.error, title: 'Failed Loading App' })));
//     });

//   @Effect()
//   getAll$: Observable<Action> = this.actions$
//     .ofType(APP_GET_ALL)
//     .switchMap((action) => {
//       return this.appService.getAll()
//         .map((apps: any) => {
//           return new AppGetAllCompletedAction({ apps });
//         })
//         .catch(err => Observable.of(new OperationFailedAction({ error: err.error, title: 'Failed Loading Apps' })));
//     });
// }
