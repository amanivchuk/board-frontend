import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BoardSearchValues} from '../../data/SearchObjects';
import {Board} from '../../model/Board';
import {MatTableDataSource} from '@angular/material/table';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input()
  totalBoardFounded: number;
  @Input()
  showSearch: boolean; //показать/скрыть поиск

  @Output()
  paging = new EventEmitter<PageEvent>(); // переход по страницам данных
  @Output()
  searchAction = new EventEmitter<BoardSearchValues>();
  @Output()
  toggleSearch = new EventEmitter<boolean>(); //показать/скрыть поиск

  readonly defaultSortColumn = 'title';
  readonly defaultSortDirection = 'asc';

  boardSearchValues: BoardSearchValues;
  boards: Board[];
  changed = false;
  filterTitle: string;
  dataSource: MatTableDataSource<Board> = new MatTableDataSource<Board>();
  filterSortColumn: string;
  filterSortDirection: string;
  sortIconName: string;

  //название иконки из коллекции
  readonly iconNameDown = 'arrow_downward';
  readonly iconNameUp = 'arrow_upward';
  // цвета
  readonly colorWhite = '#fff';

  displayedColumns: string[] = ['id', 'picture', 'title', 'text', 'dateAdd', 'author', 'operations'];

  constructor() {
  }

  @Input('boardSearchValues')
  set setBoardSearchValues(boardSearchValues: BoardSearchValues) {
    this.boardSearchValues = boardSearchValues;
    this.initSearchValues(); //записать в локальные переменные
    this.initSortDirectionIcon(); //показать правильную иконку (убывание, возрастание)
  }

  @Input('boards')
  set setEmployees(boards: Board[]) {
    this.boards = boards;
    this.fillTable(); // передать данные таблице для отображения сотрудников
  }

  ngOnInit(): void {
  }

  fillTable() {
    if (!this.dataSource) {
      return;
    }
    console.log(this.boards);
    this.dataSource.data = this.boards;
  }

  pageChanged(pageEvent: PageEvent) {
    this.paging.emit(pageEvent);
  }

  initSearch() {
    this.boardSearchValues.title = this.filterTitle;
    this.boardSearchValues.sortColumn = this.filterSortColumn;
    this.boardSearchValues.sortDirection = this.filterSortDirection;

    this.searchAction.emit(this.boardSearchValues);

    this.changed = false; // сбрасываем флаг изменения
  }

  checkFilterChanged() {
    this.changed = false;

    // поочередно проверяем все фильтры (текущее введенное значение с последним сохраненным)
    if (this.boardSearchValues.title !== this.filterTitle) {
      this.changed = true;
    }

    if (this.boardSearchValues.sortColumn !== this.filterSortColumn) {
      this.changed = true;
    }

    if (this.boardSearchValues.sortDirection !== this.filterSortDirection) {
      this.changed = true;
    }

    return this.changed;
  }

  initSortDirectionIcon() {
    if (this.filterSortDirection === 'desc') {
      this.sortIconName = this.iconNameDown;
    } else {
      this.sortIconName = this.iconNameUp;
    }
  }

  changedSortDirection() {
    if (this.filterSortDirection === 'asc') {
      this.filterSortDirection = 'desc';
    } else {
      this.filterSortDirection = 'asc';
    }
    this.initSortDirectionIcon();
  }

  //обновить локальные переменные поиска
  initSearchValues() {

    if (!this.boardSearchValues) {
      return;
    }

    this.filterTitle = this.boardSearchValues.title;
    this.filterSortColumn = this.boardSearchValues.sortColumn;
    this.filterSortDirection = this.boardSearchValues.sortDirection;
  }

  //обновить локальные переменные поиска
  clearSearchValues() {
    this.filterTitle = '';
    this.filterSortColumn = this.defaultSortColumn;
    this.filterSortDirection = this.defaultSortDirection;
  }

  onToggleSearch() {
    this.toggleSearch.emit(!this.showSearch);
  }


  openAddAdvertDialog() {

  }

  openAdvertContent(boards: any) {

  }
}
