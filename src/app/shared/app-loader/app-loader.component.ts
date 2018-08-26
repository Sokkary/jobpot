import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAppLoadingStatus } from '../../_state/reducers/index';

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss']
})
export class AppLoaderComponent {

  @Input() label = 'Loading apps...';
  @Output() loading = new EventEmitter();
  @Input() isLoading = true;

  constructor(private store: Store<any>) {
    this.store.select(getAppLoadingStatus).subscribe(_isLoading => {
      this.isLoading = _isLoading;
      this.loading.emit(_isLoading);
    });
  }
}
