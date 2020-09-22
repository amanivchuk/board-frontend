import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthorizationLayoutComponent} from './shared/components/authorization-layout/authorization-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {SharedModule} from '../main/shared/shared.module';

@NgModule({
  declarations: [
    AuthorizationLayoutComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AuthorizationLayoutComponent, children: [
          {path: '', redirectTo: '/authorization/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: []
})
export class AuthorizationModule {

}
