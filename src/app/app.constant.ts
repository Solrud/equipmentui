import {InjectionToken} from "@angular/core";

export enum TableType {                      // Тип таблицы
  OBORUD_EKZ = 'Экземпляр оборудования',
  MODEL = 'Модель',
  GRUPPA = 'Группа',
  KOMPL = 'Комплекс',
  PODR = 'Подразделение',
  UCH = 'Участки',
  PROIZV = 'Производитель',
  OBORUD_KLASS = 'Класс оборудования',
  OBORUD_VID = 'Вид оборудования',
  NAL_PU = 'Наличие программного устройства',
  GAB_ZO = 'Габариты зоны обработки',

  KOMPL_FROM_RELATION = 'Комплекс из связей',
  GRUPPA_FROM_RELATION = 'Группа из связей',
  MODEL_FROM_RELATION = 'Модель из связей',
  OBORUD_EKZ_FROM_RELATION = 'Экземпляр оборудования из связей',

  SETTINGS_RELATION_KOMPL = 'Таблица изменения связей Комплекса',
  SETTINGS_RELATION_GRUPPA = 'Таблица изменения связей Группы',
  SETTINGS_RELATION_MODEL = 'Таблица изменения связей Модели',
  SETTINGS_RELATION_EKZ = 'Таблица изменения связей Экземпляров оборудвоания',
}

export const GRUPPA_URL_TOKEN = new InjectionToken<string>('url');
export const KOMPL_URL_TOKEN = new InjectionToken<string>('url');
export const MODEL_URL_TOKEN = new InjectionToken<string>('url');
export const OBORUD_EKZ_URL_TOKEN = new InjectionToken<string>('url');

export const OBORUD_VID_URL_TOKEN = new InjectionToken<string>('url');
export const OBORUD_KLASS_URL_TOKEN = new InjectionToken<string>('url');
export const GAB_ZO_URL_TOKEN = new InjectionToken<string>('url');
export const NAL_PU_URL_TOKEN = new InjectionToken<string>('url');

export const PODR_URL_TOKEN = new InjectionToken<string>('url');
export const PROIZV_URL_TOKEN = new InjectionToken<string>('url');
export const UCH_URL_TOKEN = new InjectionToken<string>('url');

//наименования куков (this.cookie Values)
export const COOKIE_APP = 'equipment';
export const CV_LANGUAGE = 'language';
export const CV_ROLE = 'role';
export const CV_APP_VERSION = 'version';
export const CV_INIT_NAV_TAB = 'selectedSpravochnik';

export const DEFAULT_APP_VERSION = 'v.1.0.9';
export const DEFAULT_LANGUAGE = 'ru';

export const DEFAULT_PAGE_NUMBER = 0;
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_SORT_COLUMN = 'id';
export const DEFAULT_SORT_DIRECTION = 'asc';

export const INIT_NAV_BAR = TableType.MODEL; // Какая таблица откроется по-умолчанию

export const defaultLocale = 'ru'

export enum OriginSourceTable{               // Происхождение создания компонента таблицы
  MAIN_TABLE,
  SETTINGS_TABLE,
  RELATIONSHIP_TABLE,
  PRE_RELATION_TABLE,
  RELATION_SETTINGS,
  ATTACHED_TABLE
}

export enum TypePartOfKodKlass{              // Тип составной части классификатора кода
  KLASS_OBORUD,
  VID_OBORUD,
  NAL_PU,
  GAB_ZO
}

export enum ActionMode{
  CREATE,
  EDIT,
  DELETE,
  VIEW
}

export enum DialogMode {                     //Режим диалогового окна
  VIEW= 'Просмотр',
  CREATE= 'Добавление',
  COPY= 2,
  EDIT= 'Редактирование',
  AGREE=4,
  RETURN,
  CHANGE_ACTIVITY,
  DELETE
}

export enum DialogResult {                   //Результат закрытия диалогового окна
  ACCEPT,
  CANCEL,
  EXIT,
  STOP,
  RETURN
}

export enum Holiday{
  NEW_YEAR,
  WOMANS_DAY,
  MANS_DAY,
}

export enum UserRoleAuth {                   // Роль авторизированного юзверя
  ADMIN = 'EQUIPMENT_ADMIN',
  USER = 'EQUIPMENT_USER',
  VIEW = 'EQUIPMENT_VIEW',
}

export const FIELD_COLUMN_KOMPL_LIST = ['id', 'kod', 'naim'];
export const FIELD_COLUMN_GRUPPA_LIST = ['id', 'kod', 'naim', 'kodKlass'];       //колонки основных таблиц
export const FIELD_COLUMN_MODEL_LIST = ['id', 'kod', 'naim', 'obozn'];
export const FIELD_COLUMN_OBORUD_EKZ_LIST = ['id', 'invNom', 'naim', 'proizv', 'serNom', 'podr', 'uch'];

export const FIELD_COLUMN_OBORUD_KLASS_LIST = ['kodKlass', 'naim'];
export const FIELD_COLUMN_OBORUD_VID_LIST = ['kodKlass', 'naim'];
export const FIELD_COLUMN_NAL_PU_LIST = ['kodKlass', 'naim'];                    //колонки таблиц настроек
export const FIELD_COLUMN_GAB_ZO_LIST = ['kodKlass', 'naim'];
export const FIELD_COLUMN_PROIZV_LIST = ['naim', 'polnNaim'];
export const FIELD_COLUMN_PODR_LIST = ['kod', 'kodIsp', 'naim', 'obozn', 'rod'];
export const FIELD_COLUMN_UCH_LIST = ['kod', 'obozn', 'naim'];

export const DELAY_TIME = 300;
export const DELAY_TIME_FOR_FILTER = 500;
export const DELAY_TIME_OPEN_FOR_TOOLTIP = 600;
export const DELAY_TIME_CLOSE_FOR_TOOLTIP = 70;
