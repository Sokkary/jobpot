import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobEthService } from '@app/services/job-eth.service';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.scss']
})
export class JobViewComponent implements OnInit {
  isUserApplied = false;
  isUserWinner = false;
  isLoading = true;

  job: any;
  user = {
    address: ''
  };

  constructor(
    private route: ActivatedRoute,
    private jobEth: JobEthService,
    private alert: AlertService

  ) {
    this.user.address = jobEth.getOwnerAccount();
    this.route.params.subscribe(params => {
      jobEth.getJob(params.ref).then(_job => {
        this.isLoading = false;
        this.job = _job;
      });
    });
  }

  ngOnInit() { }

  soon() {
    this.alert.success('This is implemented in the smart contracts but not yet linked to the Web UI.', 'Out of scope feature', 10000);
  }

}
