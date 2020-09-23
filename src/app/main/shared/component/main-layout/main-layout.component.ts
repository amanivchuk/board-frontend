import {Component, OnInit} from '@angular/core';
import {BoardSearchValues} from '../../../data/SearchObjects';
import {Board} from '../../../model/Board';
import {SpinnerService} from '../../../service/spinner.service';
import {BoardService} from '../../../data/impl/BoardService';
import {PageEvent} from '@angular/material/paginator';
import {BoardCreateDto} from '../../../data/dto/BoardCreateDto';

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


  constructor(
    private spinnerService: SpinnerService,
    private boardService: BoardService
  ) {
    this.searchBoard(this.boardSearchValues);
  }

  ngOnInit() {
  }

  searchBoard(boardSearchValues: BoardSearchValues) {
    this.boardService.findAdvert(this.boardSearchValues).subscribe(result => {
      this.totalBoardFounded = result.totalElements;
      this.boards = result.content;
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
}
