import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";


export const AUTH_URL_TOKEN = new InjectionToken<string>('u rl');
export const LOGIN_URL_TOKEN = new InjectionToken<string>('login url');

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn: boolean;
  currentUser = new BehaviorSubject<User>(null); // текущий залогиненный пользователь (по умолчанию null)

  constructor(private httpClient: HttpClient,
              @Inject(AUTH_URL_TOKEN) private url,
              @Inject(LOGIN_URL_TOKEN) private loginUrl) {
  }

  // авто логин пользователя (если есть в куках JWT (от backend'a вернется статус 200 и текущий пользователь))
  public autoLogin(): Observable<User> {
    return this.httpClient.post<User>(this.url + '/auto', null); // ничего не передаем
  }

  public onNavigate(): void {
    window.open(this.loginUrl);
  }

  public logout(): void {
    this.currentUser.next(null); // обнуление текущего пользователя
    this.isLoggedIn = false; // указываем что пользователь разлогинился
    // чтобы удалить кук с флагом httpOnly необходимо попросить об этом сервер, т.к. клиент не имеет доступ к куку
    this.httpClient.post<any>(this.url + '/logout', null).subscribe();
    this.onNavigate();
  }
}

// пользователь (хранит свои данные)
export class User {
  id: number; // обязательное поле, по нему определяется пользователь
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  patronymicName: string;
  description: string;
  password: string; // не передается с сервера (только от клиента к серверу, например, при обновлении)
  roleSet: Array<Role>; // USER, ADMIN, MODERATOR и т.д.
}

// роль пользователя
export class Role {
  id: number;
  name: string;
  viewName: string;
  description: string;

  constructor(id: number, name: string, viewName?: string, description?: string) {
    this.id = id;
    this.name = name;
    this.viewName = viewName;
    this.description = description;
  }
}
