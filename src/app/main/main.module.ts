import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainLayoutComponent} from './shared/component/main-layout/main-layout.component';
import {AuthorizationGuard} from '../authorization/services/authorization.guard';

@NgModule({
  declarations: [
    MainLayoutComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: MainLayoutComponent, canActivate: [AuthorizationGuard]}
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [],
  entryComponents: []
})
export class MainModule {

}
