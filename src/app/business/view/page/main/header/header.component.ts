import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {DEFAULT_APP_VERSION, DELAY_TIME_CLOSE_FOR_TOOLTIP, DELAY_TIME_OPEN_FOR_TOOLTIP, DialogResult, UserRoleAuth} from "../../../../../app.constant";
import {OpenDialogService} from "../../../../data/service/OptionalService/open-dialog.service";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";
import {Role, User} from "../../../../../auth/service/auth.service";
import {EventService} from "../../../../data/service/OptionalService/event.service";
import {FileService} from "../../../../data/service/OptionalService/file.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  readonly defaultAppVersion = DEFAULT_APP_VERSION;
  currentUser: User;
  currentRole: Role;
  // currentLanguage: string;
  showNewsAttention: boolean;

  @Input()
  currentAppRoleList: Role[];

  @Output()
  readonly researchPage = new EventEmitter<void>();

  constructor(private openDialogService: OpenDialogService,
              private toastService: ToastService,
              private eventService: EventService,
              private fileService: FileService) {
  }

  ngOnInit(): void {
    this._getCurrentUser();
    this._changeRole();
    // this._changeLanguage();
    this._changeAppVersion();
  }


  public get DEFAULT_APP_VERSION(){
    return DEFAULT_APP_VERSION;
  }
  public get DELAY_TIME_OPEN_FOR_TOOLTIP(){
    return DELAY_TIME_OPEN_FOR_TOOLTIP;
  }
  public get DELAY_TIME_CLOSE_FOR_TOOLTIP(){
    return DELAY_TIME_CLOSE_FOR_TOOLTIP;
  }

  //подписка на получение пользователя
  _getCurrentUser() {
    this.eventService.currentUser$.subscribe(currentUser => {
      if (currentUser) this.currentUser = currentUser;
    });
  }

  //подписка на смену языка
  _changeLanguage() {
    // this.eventService.currentLanguage$.subscribe(currentLanguage => {
    //   if (currentLanguage) this.currentLanguage = currentLanguage;
    // });
  }

  //подписка на смену роли
  _changeRole() {
    this.eventService.currentRole$.subscribe(currentRole => {
      if (currentRole) this.currentRole = currentRole;
    });
  }

  //подписка на версию приложения
  _changeAppVersion() {
    this.eventService.currentAppVersion$.subscribe(currentVersion => {
      if (currentVersion) this.showNewsAttention = currentVersion != this.defaultAppVersion;
    });
  }

  //получение названия роли
  getRoleViewName(role: Role): string {
    return role.viewName.split(':').pop();
  }

  //выбор роли из списка
  onClickSelectRole(event: any): void {
    this.eventService.changeRole(this.currentAppRoleList.find(role => role.name === event.target.value));
  }

  //смена пользователя
  onClickChangeUserOrLogout() {
    this.eventService.logout();
  }

  getUserFIO(user: User): string {
    return user.firstName.charAt(0).toUpperCase() + (user.firstName.slice(1)).toLowerCase() + ' ' +
      user.lastName.charAt(0).toUpperCase() + (user.lastName.slice(1)).toLowerCase();
  }

  onClickOpenNewsDialog(){
    this.openDialogService.openNewsDialog().closed.subscribe( result => {
      this.eventService.changeAppVersion(this.defaultAppVersion);
    });
  }

  onClickOpenSettingsDialog(){
    this.openDialogService.openSettingsDialog().closed.subscribe( result => {
      if (result == DialogResult.ACCEPT){
        this.researchPage.emit();
        this.toastService.showPositive('Настройки изменены')
      }
    })
  }

  onClickOpenInstruction(): void{
    this.fileService.openFileInNewTab('assets/files/тестовая справочник оборудования инструкция.pdf')
  }
}

