import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-disputes',
  templateUrl: './my-disputes.component.html',
  styleUrls: ['./my-disputes.component.scss']
})
export class MyDisputesComponent implements OnInit {
  sortTypes = [
    {
      key: 'active',
      label: 'Active'
    },
    {
      key: 'closed',
      label: 'Closed'
    },
    {
      key: 'cancelled',
      label: 'Cancelled'
    },
  ];

  disputes = [];

  constructor() { }

  ngOnInit() {
  }

}
