import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanpayModule } from '@canyaio/canpay-lib';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TabButtonsComponent } from './tab-buttons/tab-buttons.component';
import { MsgBoxComponent } from './msg-box/msg-box.component';
import { ListToolbarComponent } from './list-toolbar/list-toolbar.component';
import { AutofocusDirective } from '../directives/autofocus.directive';
import { LoadingBtnComponent } from './loading-btn/loading-btn.component';
import { LoaderComponent } from './loader/loader.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';
// import { CommaSepNumPipe } from './comma-sep-num.pipe';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  TabButtonsComponent,
  MsgBoxComponent,
  ListToolbarComponent,
  AutofocusDirective,
  LoadingBtnComponent,
  LoaderComponent,
  AppLoaderComponent
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    CanpayModule.forRoot({
      contracts: {
        useTestNet: true
      }
    }),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SharedModule { }
