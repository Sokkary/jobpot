import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../_state/reducers';
import { SignOutAction } from '../../_state/actions/common.action';
import { JobEthService } from '@app/services/job-eth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any = {
    account: null
  };

  noMetaMaskError: string;

  constructor(
    private store: Store<any>,
    private eth: JobEthService
  ) {

    eth.account.subscribe(account => {
      this.user.account = account;
      this.noMetaMaskError = !account ? 'Please, check your MetaMask installation. Login to your account in order to Post/Apply for jobs.' : '';
    });
  }

  ngOnInit() { }
}
