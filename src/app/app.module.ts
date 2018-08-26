import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CanpayModule } from '@canyaio/canpay-lib';
import { AppRoutingModule } from './app-routing.module';
import { NgxUploaderModule } from 'ngx-uploader';

import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// forms
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

// services
import { AlertService } from './services/alert.service';
import { IpfsService } from '@app/services/ipfs.service';

// ngrx functions
import { reducers } from './_state/reducers';
import { CommonEffects } from './_state/effects/common.effects';
// import { AppEffects } from './_state/effects/app.effects';

// Jobpot Modules
import {
  emailValidator,
  mobileValidator,
  ethAddressValidator,
  minLengthValidator,
  alphaValidator,
  firstLastNameValidator,
  alphaNoSpaceValidator
} from './utils/validators';
import { SharedModule } from './shared/shared.module';
import { JobViewComponent } from './job-view/job-view.component';
import { JobPostComponent } from './job-post/job-post.component';
import { JobApplyComponent } from './job-apply/job-apply.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobPostsComponent } from './job-posts/job-posts.component';
import { MyJobPostsComponent } from './my-job-posts/my-job-posts.component';
import { MyAppliedApplicationsComponent } from './my-applied-applications/my-applied-applications.component';
import { MyDisputesComponent } from './my-disputes/my-disputes.component';
import { DisputesListComponent } from './disputes-list/disputes-list.component';
import { JobApplicationsListComponent } from './job-applications-list/job-applications-list.component';
import { FileUploaderComponent } from './shared/file-uploader/file-uploader.component';
import { environment } from '@environment/environment';
import { JobEthService } from '@app/services/job-eth.service';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxUploaderModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      CommonEffects,
    ]),
    CanpayModule.forRoot({
      contracts: {
        useTestNet: environment.contracts.useTestNet,
        canyaCoinAddress: environment.contracts[environment.contracts.network].canyaCoin
      }
    }),
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'email', validation: emailValidator },
        { name: 'mobile', validation: mobileValidator },
        { name: 'ethAddress', validation: ethAddressValidator },
        { name: 'minLength', validation: minLengthValidator },
        { name: 'alpha', validation: alphaValidator },
        { name: 'alphaNoSpace', validation: alphaNoSpaceValidator },
        { name: 'firstLastName', validation: firstLastNameValidator },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'email', message: 'Invalid email address' },
        { name: 'mobile', message: 'Should start with +(countrycode), ex: +61415123456' },
        { name: 'ethAddress', message: 'Invalid eth address' },
        { name: 'minLength', message: 'Needs to be longer' },
        { name: 'alpha', message: 'This field contains invalid characters' },
        { name: 'alphaNoSpace', message: 'Only chars and digits are allowed, no spaces!' },
        { name: 'firstLastName', message: 'First and last name are required' },
      ],
    }),
    FormlyBootstrapModule,
    SharedModule,
    CanpayModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    JobViewComponent,
    JobPostComponent,
    JobApplyComponent,
    DashboardComponent,
    JobPostsComponent,
    MyJobPostsComponent,
    MyAppliedApplicationsComponent,
    MyDisputesComponent,
    DisputesListComponent,
    JobApplicationsListComponent,
    FileUploaderComponent
  ],
  providers: [
    AlertService,
    IpfsService,
    JobEthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
