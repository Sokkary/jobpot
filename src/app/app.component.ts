import { Component, AfterViewInit } from '@angular/core';
import { AlertService } from './services/alert.service';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  alerts = [];

  constructor(private alert: AlertService) { }

  ngAfterViewInit() {
    this.alert.get().delay(500).subscribe(alert => {

      if (!alert.type) {
        this.alerts = this.alerts.filter(a => a.id !== alert.id);
        return;
      }

      this.alerts.push(alert);
    });
  }
}
