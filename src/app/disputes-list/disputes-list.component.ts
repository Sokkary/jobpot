import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-disputes-list',
  templateUrl: './disputes-list.component.html',
  styleUrls: ['./disputes-list.component.scss']
})
export class DisputesListComponent implements OnInit {
  @Input() disputes = [];

  constructor() { }

  ngOnInit() {
  }

}
