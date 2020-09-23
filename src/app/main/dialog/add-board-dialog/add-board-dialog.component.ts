import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Board} from '../../model/Board';
import {DialogAction, DialogResult} from '../../object/DialogResult';
import {BoardCreateDto} from '../../data/dto/BoardCreateDto';

@Component({
  selector: 'app-add-board-dialog',
  templateUrl: './add-board-dialog.component.html',
  styleUrls: ['./add-board-dialog.component.css']
})
export class AddBoardDialogComponent implements OnInit {

  board: BoardCreateDto;
  dialogTitle: string;

  newPicture: any;
  newTitle: string = '';
  newText: string = '';

  constructor(
    private dialogRef: MatDialogRef<AddBoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Board, string],
  ) {
  }

  ngOnInit(): void {
    this.board = this.data[0];
    this.dialogTitle = this.data[1];

  }


  confirm(): void {
    this.board.title = this.newTitle;
    this.board.picture = this.newPicture;
    this.board.text = this.newText;
    this.board.dateAdd = new Date();

    this.dialogRef.close(new DialogResult(DialogAction.SAVE, this.board));
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  validInputData(): boolean {
    if (this.newTitle.length === 0) {
      return true;
    }
    if (this.newText.length === 0) {
      return true;
    }

    return false;
  }
}
