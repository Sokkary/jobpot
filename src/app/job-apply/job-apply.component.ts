import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationFailedAction } from '@app/_state/actions/common.action';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.scss']
})
export class JobApplyComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [];
  jobId: string;
  job = {
    ref: '182',
    status: 'active',
    title: 'Blockchain Developer',
    company: 'Binance',
    category: 'programming',
    type: 'fulltime',
    prize: '1000',
    minAppFees: '20',
    startDate: 'ASAP',
    description: 'Full understanding for blockchain technology and components with wide experience in programming with GoLang',
    attachment: 'http://filetoipfs.com/abc',
    createdAt: new Date().toLocaleString(),
    createdBy: 'abc'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>
  ) {
    this.route.queryParams
      .subscribe(params => {
        this.jobId = params.jobId;
        this.model.jobId = this.jobId;
      });
  }

  ngOnInit() {
    this.fields = [
      {
        key: 'jobRef',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Job Reference',
          value: '182',
          disabled: true
        }
      },
      {
        key: 'title',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Title',
          value: 'GoLang Developer',
          disabled: true
        }
      },
      {
        key: 'applicant',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Applicant',
          placeholder: 'Ex: ABC Recruitment',
          required: true,
        }
      },
      {
        key: 'candidateFullName',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Candidate Full Name',
          placeholder: 'Ex: John Smith',
          required: true,
        }
      },
      {
        key: 'candidateEmail',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Candidate Email',
          placeholder: 'Ex: john@email.com',
          required: true,
        }
      },
      {
        key: 'linkedin',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Linkedin Profile',
          placeholder: 'Ex: http://linkedin.com/abc',
          required: false,
        }
      },
      {
        key: 'availability',
        type: 'input',
        templateOptions: {
          type: 'date',
          label: 'Availability Date',
          required: true,
        }
      },
      {
        key: 'description',
        type: 'textarea',
        templateOptions: {
          type: 'text',
          label: 'Description',
          placeholder: 'Ex: any special notes or may be a cover letter',
          required: false,
          rows: 3
        }
      },
      {
        key: 'attachment',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'CV',
          required: true,
        }
      }
    ];
  }

  submit() {

  }
}
