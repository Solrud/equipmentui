import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {finalize, Observable} from "rxjs";
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService {
  activeRequests: number = 0;

  constructor(private eventsService: EventService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.eventsService.showSpinner$();
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(()=>{
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.eventsService.hideSpinner$();
        }
      })
    );
  }
}
