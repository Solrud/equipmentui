import {Component, EventEmitter, Output} from '@angular/core';
import {DialogResult, UserRoleAuth} from "../../../../../app.constant";
import {OpenDialogService} from "../../../../data/service/OptionalService/open-dialog.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentApptRoleList: UserRoleAuth[];
  selectedCurrentRole: UserRoleAuth;

  @Output()
  readonly researchPage = new EventEmitter<void>();

  constructor(private openDialogService: OpenDialogService) {
  }

  onClickOpenSettingsDialog(){
    this.openDialogService.openSettingsDialog().closed.subscribe( result => {
      if (result == DialogResult.ACCEPT)
        this.researchPage.emit();
    })
  }
}
//ToDo выбор роли из списка(тут вообще роль то нужна?.. наверное нет)
