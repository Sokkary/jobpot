import { Component, Input, Output, EventEmitter } from '@angular/core';
import { getLoadingStatus } from '../../_state/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loading-btn',
  templateUrl: './loading-btn.component.html',
  styleUrls: ['./loading-btn.component.scss']
})
export class LoadingBtnComponent {
  @Input() isLoading = false;
  @Input() disabled = false;
  @Input() label = 'Submit';
  @Input() title;
  @Output() doClick = new EventEmitter();

  constructor(private store: Store<any>) {
    this.store.select(getLoadingStatus).subscribe(_isLoading => this.isLoading = _isLoading);
  }

  submit() {
    this.doClick.emit(true);
  }

}
