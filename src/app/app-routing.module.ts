import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { JobViewComponent } from '@app/job-view/job-view.component';
import { JobPostComponent } from '@app/job-post/job-post.component';
import { JobApplyComponent } from '@app/job-apply/job-apply.component';
import { DashboardComponent } from '@app/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [RoutingGuard]
  },
  {
    path: 'index.html',
    component: HomeComponent,
    // canActivate: [RoutingGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [RoutingGuard]
  },
  {
    path: 'job-apply',
    component: JobApplyComponent
  },
  {
    path: 'job-view/:ref',
    component: JobViewComponent
  },
  {
    path: 'job-post',
    component: JobPostComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
