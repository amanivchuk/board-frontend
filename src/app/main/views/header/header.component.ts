import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogAction} from '../../object/DialogResult';
import {EditProfileDialogComponent} from '../../dialog/edit-profile-dialog/edit-profile-dialog.component';
import {BoardCreateDto} from '../../data/dto/BoardCreateDto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  editProfile = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  showEditProfile() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: [new BoardCreateDto('', null, '', null),
        'Добавление нового объявления'],
      autoFocus: false,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!(result)) {
        return;
      }

      if (result.action === DialogAction.OK) {
        this.editProfile.emit(result.obj);
      }
    });
  }
}
