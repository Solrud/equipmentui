import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {News} from "../../../data/model/shared/news.class";

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.css']
})
export class NewsDialogComponent {
  allNews: News[] = [];

  constructor(private activeModal: NgbActiveModal) {
    let desc = ['Добавились куки!', 'Теперь приложение запоминает какая роль пользователя была выбрана и какая вкладка на главной странице открыта',
      'Появилась вкладка с новостями!', 'Если появилась новая версия приложения, то вкладка с новостями привлечет ваше внимание значком!']
    let tstnew = new News('1.0.7', '13/12/2024', desc);
    this.allNews.push(tstnew);
  }

  onClickCancel(): void {
    this.activeModal.close();
  }
}
