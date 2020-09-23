import {Component, OnInit} from '@angular/core';
import {BoardSearchValues} from '../../../data/SearchObjects';
import {Board} from '../../../model/Board';
import {SpinnerService} from '../../../service/spinner.service';
import {BoardService} from '../../../data/impl/BoardService';
import {PageEvent} from '@angular/material/paginator';
import {BoardCreateDto} from '../../../data/dto/BoardCreateDto';
// @ts-ignore
import jwt_decode from 'jwt-decode';
import {UserService} from '../../../data/impl/UserService';
import {User} from '../../../../authorization/model/User';
import {UserUpdateDto} from '../../../data/dto/UserUpdateDto';
import {UserUpdateEmailDto} from '../../../data/dto/UserUpdateEmailDto';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  boardSearchValues = new BoardSearchValues();

  boards: Board[];
  totalBoardFounded: number; //сколько всего найдено данных

  showSearch = true;

  spinner: SpinnerService; //индикатор загрузки

  userId: number;
  user: User;


  constructor(
    private spinnerService: SpinnerService,
    private boardService: BoardService,
    private userService: UserService
  ) {
    this.searchBoard(this.boardSearchValues);
  }

  ngOnInit() {
  }

  searchBoard(boardSearchValues: BoardSearchValues) {
    this.boardService.findAdvert(this.boardSearchValues).subscribe(result => {
      this.totalBoardFounded = result.totalElements;
      this.boards = result.content;

      let token = localStorage.getItem('token');
      let token2 = token.substring(7, token.length);
      this.userId = jwt_decode(token2).userId;
      console.log(this.userId);

      this.userService.get(this.userId).subscribe(result => {
        this.user = result;
        console.log(this.user);
      });
    })
  }

  paging(pageEvent: PageEvent) {
    if (this.boardSearchValues.pageSize !== pageEvent.pageSize) {
      this.boardSearchValues.pageNumber = 0;//новые данные будем показывать с 1й страницы (индекс 0)
    } else {
      this.boardSearchValues.pageNumber = pageEvent.pageIndex;
    }

    this.boardSearchValues.pageSize = pageEvent.pageSize;
    this.boardSearchValues.pageNumber = pageEvent.pageIndex;

    this.searchBoard(this.boardSearchValues);// показываем новые данные
  }

  //показать-скрыть поиск
  toggleSearch(showSearch: boolean) {
    this.showSearch = showSearch;
  }

  addBoard(boardCreateDto: BoardCreateDto) {
    this.boardService.addBoard(boardCreateDto).subscribe(() => {
      this.searchBoard(this.boardSearchValues);//обновляем список сотрудников
    });
  }

  editProfile(user: UserUpdateDto) {
    this.userService.updateUser(user, this.userId).subscribe(result => {
      console.log('User updated successfully');
    });
  }

  editEmail(userUpdateEmailDto: UserUpdateEmailDto) {
    this.userService.updateEmail(userUpdateEmailDto).subscribe(result => {
      console.log('User updated successfully');
    });
  }
}
