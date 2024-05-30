import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../data/service/OptionalService/event.service";
import {UserRoleAuth} from "../../../../app.constant";
import {AuthService, Role, User} from "../../../../auth/service/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  user: User;

  constructor(private authService: AuthService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      // this.user = user;
      //создаем юзверя и кидаем ему захардкоденый тип прав, для проверки работы (следующие 5 строк потом удалить)
      this.user = new User();
      this.user.id = 1;
      this.user.firstName = 'кто';
      this.user.lastName = 'ктович';
      this.user.roleSet = [];
      this.user.roleSet.push(new Role(1, UserRoleAuth.ADMIN, 'Справочник оборудования: Администратор'));
      this.user.roleSet.push(new Role(2, UserRoleAuth.SUPER_ADMIN, 'Справочник оборудования: СУПЕР Администратор'));
      this.user.roleSet.push(new Role(3, UserRoleAuth.VIEW, 'Гость'));
    });
  }

  logout(): void {
    this.authService.logout();
  }

  disableContextMenu(){
    this.eventService.isOpenContextMenu$.next(false);
  }
}

