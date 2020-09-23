import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {UserCreateDto} from '../../../main/data/dto/UserCreateDto';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {

  user: UserCreateDto;
  dialogTitle: string;

  newLastName: string = '';
  newFirstName: string = '';
  newEmail: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';


  constructor(
    private dialogRef: MatDialogRef<RegistrationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [UserCreateDto, string],
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.user = this.data[0];
    this.dialogTitle = this.data[1];
  }

  confirm() {
    this.user.lastName = this.newLastName;
    this.user.firstName = this.newFirstName;
    this.user.email = this.newEmail;
    this.user.password = this.newPassword;

    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.user));
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  validInputData(): boolean {
    if (this.newFirstName.length === 0) {
      return true;
    }
    if (this.newLastName.length === 0) {
      return true;
    }
    if (this.newPassword.length === 0) {
      return true;
    }
    if (this.confirmNewPassword.length === 0) {
      return true;
    }
    if (this.newPassword !== this.confirmNewPassword) {
      return true;
    }
    if (this.newEmail.length === 0) {
      return true;
    }
    return false;
  }
}
