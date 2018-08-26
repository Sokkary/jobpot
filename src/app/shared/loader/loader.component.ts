import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoadingStatus } from '../../_state/reducers';

@Component({
  selector: 'app-common-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() label = 'Loading...';
  @Output() loading = new EventEmitter();

  isLoading = true;

  constructor(private store: Store<any>) {
    console.log('common loader ', this.isLoading);
    this.store.select(getLoadingStatus).subscribe(_isLoading => {
      console.log('isLoading: ', _isLoading);
      this.isLoading = _isLoading;
      this.loading.emit(_isLoading);
    });
  }

}
