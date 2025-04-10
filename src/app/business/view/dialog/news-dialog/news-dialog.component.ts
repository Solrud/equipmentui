import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {News} from "../../../data/model/shared/news.class";
import {EventService} from "../../../data/service/OptionalService/event.service";
import {DEFAULT_APP_VERSION} from "../../../../app.constant";

@Component({
  selector: 'app-news-dialog',
  templateUrl: './news-dialog.component.html',
  styleUrls: ['./news-dialog.component.css']
})
export class NewsDialogComponent implements OnInit{
  oldAppVersion: string;
  currentAppVersion: string = DEFAULT_APP_VERSION;
  allNews: News[] = [];
  isFirstTimeOpened: boolean = false;

  constructor(private activeModal: NgbActiveModal,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    this._currentAppVersion();
    this.packNewsList();
  }

  _currentAppVersion(){
    this.eventService.currentAppVersion$.subscribe( version => {
      if(version){
        this.oldAppVersion = version;
        if (this.oldAppVersion !== this.currentAppVersion)
          this.isFirstTimeOpened = true;
      }
    })
  }

  packNewsList(){
    this.allNews = [
      new News('v.1.0.8', this.makeDate(10, 4, 2025),
        ["Во вкладки модели у таблицы связанного экземпляра оборудования, можно создать новый, уже привязанный к этой модели экземпляр.",
          "При создании/редактировании экземпляра из под вкладки модели, экземпляру автоматически присваивается модель без возможности присвоить иную.",
          "В таблицу экземпляра оборудования добавились 2 столбца: подразделение (цех), участок.",
          "Для неавторизованных пользователей показывается информационное окно и открывается Platform.", "Мелкие доработки."]),
      new News('v.1.0.7', this.makeDate(26,12, 2024),
        ['Добавились куки!', 'Теперь приложение запоминает какая роль пользователя была выбрана и какая вкладка на главной странице открыта.',
          'Появилась вкладка с новостями!', 'Если появилась новая версия приложения, то вкладка с новостями привлечет ваше внимание значком!', "Обновлена инструкция.",
          "Появилось новогоднее настроение на сайте."]),
      new News('v.1.0.6', this.makeDate(5,12, 2024),
        ["Добавилась авторизация через платформу Platform testbazis.", 'В меню настроек добавлена инструкция открывающаяся в новой вкладке в формате PDF.',
          "Цвета кнопок изменены.", "В настройках переделаны названия справочников.",
          "Исправлены несколько багов фильтра.", "Выпадающие списки теперь без поиска(отображаются все элементы).", "Некоторые изменения цветов."]),
      new News('v.1.0.5', this.makeDate(1,6, 2024),
        ['Код на Класс, Активность на Актуальность, Отчет скрыт, Фильтр по умолчанию открыт.']),
      new News('v.1.0.4', this.makeDate(1,6, 2024),
        ['Испрален баг с отображением неправильных фильтров при переходе из вкладок сущностей.', "Фильтр актуальности изменен на список."]),
      new News('v.1.0.3', this.makeDate(1,6, 2024),
        ['Появились роли пользователей гость/пользователь/администратор.', "Для каждой роли есть свои разрешения:", "-Гость имеет право только просматривать информацию;",
          "-Пользователь имеет право изменять/добавлять данные;", "-Администратор имеет право изменять/добавлять данные и удалять записи из базы данных."]),
      new News('v.1.0.2', this.makeDate(1,6, 2024),
        ['Добавлены таблицы взаимосвязей, отображаются связи сущностей.', "Работает сортировка таблиц.", "Добавлен фильтр для каждой вкладки.",
          "Реализован переход в другую табличку из выбранного связанного элемента.", "Рефактор кода приложения."]),
      new News('v.1.0.1', this.makeDate(1,6, 2024),
        ['Добавились настройки.', 'Работает пагинация.', 'Основные кнопки добавления/изменения/изменения активности/удаления.',
          'Работают все методы взаимодействия для основных сущностей.']),
      new News('v.1.0.0', this.makeDate(1,6, 2024),
        ['Началась разработка ПО.', 'Вкладки навигации основных справочников и их таблицы.'])
    ]
  }

  makeDate(day: number, month: number, year: number): Date{
    return new Date(year, month - 1, day);
  }

  onClickCancel(): void {
    this.activeModal.close();
  }
}
