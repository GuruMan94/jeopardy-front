import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterDto} from "./register/dto/RegisterDto";
import {Observable} from "rxjs";
import {LoginDto} from "./login/dto/LoginDto";
import {UserDto} from "./dto/UserDto";
import {map} from "rxjs/operators";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080";

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private router: Router) {

  }

  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.url}/user/register`, dto)
  }

  login(loginDto: LoginDto) {
    return this.http.post(`${this.url}/user/login`, loginDto, {observe: 'response'})
      .pipe(map(resp => {
        console.log(resp);
        this.localStorageService.store('userName', loginDto.userName);
        this.localStorageService.store('authToken', resp.headers.get('X-Auth-Token'));
        return true;
      }));
  }

  isAuthenticated() {
    return this.localStorageService.retrieve('authToken') != null;
  }

  logout() {
    return this.http.post(`${this.url}/user/logout`, {}, {observe: 'response'})
      .pipe(map(() => {
        this.localStorageService.clear('userName');
        this.localStorageService.clear('authToken');
        return true;
      }));
  }
}
