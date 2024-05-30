import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DELAY_TIME_CLOSE_FOR_TOOLTIP, DELAY_TIME_OPEN_FOR_TOOLTIP, DialogResult, UserRoleAuth} from "../../../../../app.constant";
import {OpenDialogService} from "../../../../data/service/OptionalService/open-dialog.service";
import {ToastService} from "../../../../data/service/OptionalService/toast.service";
import {User} from "../../../../../auth/service/auth.service";
import {EventService} from "../../../../data/service/OptionalService/event.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  currentApptRoleList: UserRoleAuth[];
  selectedCurrentRole: UserRoleAuth;

  user: User;
  @Input('user')
  set setUser(user: User) {
    if (user) {
      this.user = user;
      this.initRoleList();
    }
  }

  @Output()
  logout = new EventEmitter();
  @Output()
  readonly researchPage = new EventEmitter<void>();

  constructor(private openDialogService: OpenDialogService,
              private toastService: ToastService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.selectCurrentRole$(this.currentApptRoleList[0]);
  }


  initRoleList(): void {
    this.currentApptRoleList = [];
    Object.keys(UserRoleAuth).forEach(key => {
      this.user.roleSet.forEach(role => {
        if (role.name === UserRoleAuth[key]) this.currentApptRoleList.push(UserRoleAuth[key]);
      });
    })
  }

  public get DELAY_TIME_OPEN_FOR_TOOLTIP(){
    return DELAY_TIME_OPEN_FOR_TOOLTIP;
  }
  public get DELAY_TIME_CLOSE_FOR_TOOLTIP(){
    return DELAY_TIME_CLOSE_FOR_TOOLTIP;
  }

  onClickSelectRole(event: any): void {
    this.eventService.selectCurrentRole$(event.target.value);
  }

  getRoleViewName(roleName: string): string {
    return (this.user.roleSet.find(role => role.name == roleName).viewName.split(':').pop());
  }

  onClickLogout(): void {
    this.logout.emit();
  }

  getUserFIO(user: User): string {
    return user.firstName.charAt(0).toUpperCase() + (user.firstName.slice(1)).toLowerCase() + ' ' +
      user.lastName.charAt(0).toUpperCase() + (user.lastName.slice(1)).toLowerCase();
  }

  onClickOpenSettingsDialog(){
    this.openDialogService.openSettingsDialog().closed.subscribe( result => {
      if (result == DialogResult.ACCEPT){
        this.researchPage.emit();
        this.toastService.showPositive('Настройки изменены')
      }
    })
  }
}

