import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../data/service/OptionalService/event.service";
import {
  COOKIE_APP,
  CV_APP_VERSION,
  CV_INIT_NAV_TAB,
  CV_LANGUAGE,
  CV_ROLE,
  DEFAULT_LANGUAGE,
  INIT_NAV_BAR,
  UserRoleAuth
} from "../../../../app.constant";
import {AuthService, Role, User} from "../../../../auth/service/auth.service";
import {environment} from "../../../../../environment/environment";
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "../../../data/service/OptionalService/local-storage.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  host: {'class': "d-flex h-100 w-100 flex-column"}
})
export class MainComponent implements OnInit{
  userLocalStorageName: string;
  user: User;

  constructor(private authService: AuthService,
              private eventService: EventService,
              private translateService: TranslateService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if(environment.auth)
        this.user = user;
      if(!environment.auth){
        //создаем юзверя и кидаем ему захардкоденый тип прав, для проверки работы (следующие 5 строк потом удалить)
        this.user = new User();
        this.user.id = 1;
        this.user.firstName = 'кто';
        this.user.lastName = 'ктович';
        this.user.roleSet = [];
        this.user.roleSet.push(new Role(1, UserRoleAuth.USER, 'Справочник оборудования: Пользователь'));
        this.user.roleSet.push(new Role(2, UserRoleAuth.ADMIN, 'Справочник оборудования: Администратор'));
        this.user.roleSet.push(new Role(3, UserRoleAuth.VIEW, 'Справочник оборудования: Гость'));
      }

      this.userLocalStorageName = COOKIE_APP + ':' + this.user.id + this.user.firstName.toLowerCase() + this.user.lastName.toLowerCase()

      this._changeLanguage();
      this._changeRole();
      this._changeAppVersion();
      this._changeSelectedSpravochnik();
      this._resetLocalStorage();
      this._logout();

      this.eventService.setCurrentUser(this.user);//передаем для рассылки во все места текущего пользователя

      this.initLocalStorageValues();//инициализируем значения переменных из куков
    });
  }

//инициализация переменных из куков
  initLocalStorageValues(): void {
    let userCookieValuesParse = JSON.parse(this.localStorage.getLocalStorage(this.userLocalStorageName));
    if (!userCookieValuesParse) userCookieValuesParse = {};

    //инициализация начального языка приложения
    const languageCookie = userCookieValuesParse[CV_LANGUAGE];
    if (languageCookie) {
      this.eventService.changeLanguage(languageCookie);
    } else {
      this.eventService.changeLanguage(DEFAULT_LANGUAGE);
    }

    //инициализация начальной роли пользователя приложения
    const userRoleCookie = userCookieValuesParse[CV_ROLE];
    let userRole = null;
    if (userRoleCookie) userRole = this.getRoleList().find(role => {
      return role.name === userRoleCookie
    });
    if (userRole) {
      this.eventService.changeRole(userRole);
    } else {
      this.eventService.changeRole(this.getRoleList()[0]);
    }

    //инициализация версии приложения для отображения колокольчика уведомлений
    const versionCookie = userCookieValuesParse[CV_APP_VERSION];
    if (versionCookie) {
      this.eventService.changeAppVersion(versionCookie);
    } else {
      this.eventService.changeAppVersion('v.0.0.0');
    }

    // инициализация открытой вкладки
    const spravTab = userCookieValuesParse[CV_INIT_NAV_TAB];
    if (spravTab){
      this.eventService.selectSpravTab$(spravTab);
    } else {
      this.eventService.selectSpravTab$(INIT_NAV_BAR);
    }
  }

  _changeSelectedSpravochnik() {
    this.eventService.selectedSpravTable$.subscribe( currentSprav => {
      if (currentSprav) {
        this.localStorage.addValueLocalStorage(this.userLocalStorageName, JSON.stringify({[CV_INIT_NAV_TAB]: currentSprav}));
      }
    })
  }

  //подписка на смену языка
  _changeLanguage() {
    this.eventService.currentLanguage$.subscribe(currentLanguage => {
      if (currentLanguage) {
        this.translateService.use(currentLanguage);
        this.localStorage.addValueLocalStorage(this.userLocalStorageName, JSON.stringify({[CV_LANGUAGE]: currentLanguage}));
      }
    });
  }

  //подписка на смену роли
  _changeRole() {
    this.eventService.currentRole$.subscribe(currentRole => {
      if (currentRole)
        this.localStorage.addValueLocalStorage(this.userLocalStorageName, JSON.stringify({[CV_ROLE]: currentRole.name}));
    });
  }

  //подписка на версию приложения
  _changeAppVersion() {
    this.eventService.currentAppVersion$.subscribe(currentVersion => {
      if (currentVersion)
        this.localStorage.addValueLocalStorage(this.userLocalStorageName, JSON.stringify({[CV_APP_VERSION]: currentVersion}));
    })
  }

  //подписка на сброс куков
  _resetLocalStorage() {
    this.eventService.resetCookie$.subscribe(resetCookie => {
      if (resetCookie) {
        this.localStorage.deleteLocalStorage(this.userLocalStorageName);
        this.initLocalStorageValues();
      }
    })
  }

  //подписка на выход из приложения
  _logout() {
    this.eventService.changeUser$.subscribe(changeUser => {
      if (changeUser) this.authService.logout();
    });
  }

  //получение списка доступных ролей пользователя для данного приложения
  getRoleList(): Role[] {
    let currentAppRoleList = [];
    Object.keys(UserRoleAuth).forEach(key => {
      this.user.roleSet.forEach(role => {
        if (UserRoleAuth[key] === role.name) currentAppRoleList.push(role);
      });
    });
    return currentAppRoleList;
  }

  disableContextMenu(){
    this.eventService.isOpenContextMenu$.next(false);
  }
}

