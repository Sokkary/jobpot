import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TabButtonsComponent } from './tab-buttons/tab-buttons.component';
import { MsgBoxComponent } from './msg-box/msg-box.component';
import { ListToolbarComponent } from './list-toolbar/list-toolbar.component';
import { AutofocusDirective } from '../directives/autofocus.directive';
import { LoadingBtnComponent } from './loading-btn/loading-btn.component';
import { LoaderComponent } from './loader/loader.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';
import { MetamaskComponent } from '@app/shared/metamask/metamask.component';
import { InstructionsComponent } from '@app/shared/metamask/instructions/instructions.component';
import { FaqComponent } from '@app/shared/metamask/faq/faq.component';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  TabButtonsComponent,
  MsgBoxComponent,
  ListToolbarComponent,
  AutofocusDirective,
  LoadingBtnComponent,
  LoaderComponent,
  AppLoaderComponent,
  MetamaskComponent,
  InstructionsComponent,
  FaqComponent
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SharedModule { }
