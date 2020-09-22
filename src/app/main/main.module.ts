import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainLayoutComponent} from './shared/component/main-layout/main-layout.component';
import {AuthorizationGuard} from '../authorization/services/authorization.guard';
import {HeaderComponent} from './views/header/header.component';
import {FooterComponent} from './views/footer/footer.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {BoardComponent} from './views/board/board.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    BoardComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: MainLayoutComponent, canActivate: [AuthorizationGuard]}
    ]),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
  ],
  exports: [RouterModule],
  providers: [],
  entryComponents: []
})
export class MainModule {

}
