import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogAction} from '../../object/DialogResult';
import {EditProfileDialogComponent} from '../../dialog/edit-profile-dialog/edit-profile-dialog.component';
import {User} from '../../../authorization/model/User';
import {UserUpdateDto} from '../../data/dto/UserUpdateDto';
import {EditEmailDialogComponent} from '../../dialog/edit-email-dialog/edit-email-dialog.component';
import {UserUpdateEmailDto} from '../../data/dto/UserUpdateEmailDto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  editProfile = new EventEmitter<UserUpdateDto>();
  @Output()
  editUserEmail = new EventEmitter<UserUpdateEmailDto>();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showEditProfile() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {

      data: [new UserUpdateDto(this.user.firstName, this.user.lastName),
        'Редактирование данных пользователя'],
      autoFocus: false,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.editProfile.emit(result.obj as UserUpdateDto);
      }
    });
  }

  showEditEmail() {
    const dialogRef = this.dialog.open(EditEmailDialogComponent, {

      data: [
        new UserUpdateEmailDto(this.user.email, '', ''),
        'Редактирование данных пользователя'],
      autoFocus: false,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.SAVE) {
        this.editUserEmail.emit(result.obj as UserUpdateEmailDto);
      }
    });
  }
}
