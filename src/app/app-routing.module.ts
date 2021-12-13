import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { OpportunityfieldComponent } from './opportunityfield/opportunityfield.component';
import { OpportunitylistComponent } from './opportunitylist/opportunitylist.component';
import { NgWizardComponent } from './ng-wizard/ng-wizard.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'opportunitylist', component: OpportunitylistComponent },
  {path: 'ng-wizard', component: NgWizardComponent },
  {path: 'callback', component: CallbackComponent },
  {path: 'dynamicform', component: DynamicFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule {
 
 }
