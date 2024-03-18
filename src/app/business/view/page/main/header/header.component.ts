import { Component } from '@angular/core';
import {UserRoleAuth} from "../../../../../app.constant";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentApptRoleList: UserRoleAuth[];
  selectedCurrentRole: UserRoleAuth;


}
//ToDo выбор роли из списка(тут вообще роль то нужна?.. наверное нет)
