import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './CommonService';
import {Board} from '../../model/Board';
import {BoardDAO} from '../interface/BoardDAO';
import {BoardSearchValues} from '../SearchObjects';

export const BOARD_URL_TOKEN = new InjectionToken<string>('url');


@Injectable({
  providedIn: 'root'
})
export class BoardService extends CommonService<Board> implements BoardDAO {

  constructor(
    @Inject(BOARD_URL_TOKEN) private baseUrl,
    public httpClient: HttpClient
  ) {
    super(baseUrl, httpClient);
  }


  findAdvert(boardSearchValues: BoardSearchValues): Observable<any> {
    return this.httpClient.post<Board[]>(this.baseUrl + '/search', boardSearchValues);
  }
}
