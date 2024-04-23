import {Component, EventEmitter, Output} from '@angular/core';
import {DELAY_TIME_CLOSE_FOR_TOOLTIP, DELAY_TIME_OPEN_FOR_TOOLTIP, DialogResult, UserRoleAuth} from "../../../../../app.constant";
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

  public get DELAY_TIME_OPEN_FOR_TOOLTIP(){
    return DELAY_TIME_OPEN_FOR_TOOLTIP;
  }
  public get DELAY_TIME_CLOSE_FOR_TOOLTIP(){
    return DELAY_TIME_CLOSE_FOR_TOOLTIP;
  }

  onClickOpenSettingsDialog(){
    this.openDialogService.openSettingsDialog().closed.subscribe( result => {
      if (result == DialogResult.ACCEPT)
        this.researchPage.emit();
    })
  }
}
//ToDo выбор роли из списка(тут вообще роль то нужна?.. наверное нет)
