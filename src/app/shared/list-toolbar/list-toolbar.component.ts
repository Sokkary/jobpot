import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-toolbar',
  templateUrl: './list-toolbar.component.html',
  styleUrls: ['./list-toolbar.component.css']
})
export class ListToolbarComponent implements OnInit {
  @Input() sortTypes = [];
  @Output() sort = new EventEmitter();

  currentSort: any;

  constructor() { }

  ngOnInit() {
    if (this.sortTypes.length) {
      this.currentSort = this.sortTypes[0];
    }
  }

  sortBy(key) {
    this.sort.emit(key);
  }

}
