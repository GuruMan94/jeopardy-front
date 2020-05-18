import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.retrieve("authToken");
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('X-Auth-Token', token)
      })
      return this.handle(next, cloned)
    } else {
      return this.handle(next, req);
    }
  }

  handle(next, request) {
    return next.handle(request).pipe(tap(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.router.navigateByUrl('login').then(r => console.log("login"));
        }
      }));
  }

}
