import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AuthService} from "../../auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate{
  constructor(private authService: AuthService,
              private router: Router /* для навигации, перенаправления на другие страницы*/) {

  }

  /*Метод автоматически вызывается каждый раз при переходе по URL, связанному с route (если данный класс указан для этого route).
  * Возвращается: true - если осуществляется переход, false - если переход запрещен*/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // route - параметр, который хранит начение URL, по которому хотим перейти
    // 1. Залогинен ли вообще пользователь
    // 2. Есть ли у него соответствующие роли
    if (this.authService.isLoggedIn) { // если пользователь уже залогинен
      // если у пользователя есть права на эту страницу, то вернется true и произойдет переход на запрошенный url
      return this.userHasRequiredRole(this.authService.currentUser.getValue().roleSet, route.data['allowedRoles']);
    }

    // пытаемся провести автоматическую аутентификацию.
    // если в браузере был сохранен jwt-кук, он будет отправлен на backend и пользователь автоматически залогинится
    // отправляем запрос для получения пользователя (т.к. пользователь не хранится локально, это не безопасно)
    // при каждом обновлении страницы нужно получить заново пользователя из backend'a
    return this.authService.autoLogin().pipe( // не путать pipe из angular и pipe из rxjs
      map(result => {
        if (result) {
          const user = result; // получаем пользователя из JSON
          // сохраняем пользователя в сервис для дальнейшего использования из сервиса
          this.authService.currentUser.next(user);
          this.authService.isLoggedIn = true; // индикатор, что пользователь залогинился
          // если у пользователя есть права на эту страницу, то возвращаем true и перебрасываем на запрошенный url
          return this.userHasRequiredRole(user.roleSet, route.data['allowedRoles']);
        } else { // если пользователь неавторизован, то отправить его на главную страницу
          this.authService.onNavigate();
          return false; // не переходить по запрошенному url
        }
      }),
      catchError(err => {
        this.authService.onNavigate();
        // return of(false); // не переходить по запрошенному url
        //https://rxjs.dev/deprecations/scheduler-argument
        return of(false); // не переходить по запрошенному url
      })
    )
  }

  /*проверяет пересечение ролей из 2-х списков
  * userRoles - роли пользователя
  * allowedRoles - роли для доступа к URL*/
  private userHasRequiredRole(userRoles: Array<any>, allowedRoles: Array<string>): boolean {
    for (const r of allowedRoles) {
      if (userRoles.find(e => e.name === r)) {
        return true; // если совпала хотя бы одна найденная запись
      }
    }
    this.router.navigate(['/access-denied']); // есди нет доступа, то перенаправляем на страницу access-denied
    return false; // нужная роль не найдена
  }
}
