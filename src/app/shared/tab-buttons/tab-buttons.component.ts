import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-buttons',
  templateUrl: './tab-buttons.component.html',
  styleUrls: ['./tab-buttons.component.css']
})
export class TabButtonsComponent implements OnInit {
  @Input() selections = [];
  @Input() selection;
  @Output() select = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (!this.selection && this.selections.length) {
      this.selection = this.selections[0];
    }
  }

  doSelect(val) {
    this.selection = val;
    this.select.emit(val);
  }

}
