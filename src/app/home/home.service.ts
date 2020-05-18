import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GameDto} from "./dto/GameDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }

  getActiveGames(): Observable<Array<GameDto>> {
    return this.httpClient.post<Array<GameDto>>(`${this.url}/games`,{})
  }
}
