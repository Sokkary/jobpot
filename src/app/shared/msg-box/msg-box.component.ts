import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.css']
})
export class MsgBoxComponent {
  @Output() action = new EventEmitter();
  @Input() msg: any;
  @Input() displayDirection: string;
  @Input() controls: any;

  constructor() {
    window.scrollTo(0, 0);
  }

  cancel() {
    this.action.emit('cancel');
  }

  ok() {
    this.action.emit('ok');
  }

  clear() {
    this.msg = {};
  }

}
