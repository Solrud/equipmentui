import {InjectionToken} from "@angular/core";

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


export const DEFAULT_PAGE_NUMBER = 0;
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_SORT_COLUMN = 'id';
export const DEFAULT_SORT_DIRECTION = 'desc';

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
  GAB_ZO = 'Габариты зоны обработки'
}

export const INIT_NAV_BAR = TableType.GRUPPA; // Какая таблица откроется по-умолчанию

export enum OriginSourceTable{               // Происхождение создания компонента таблицы
  MAIN_TABLE,
  SETTINGS_TABLE,
  RELATIONSHIP_TABLE
}

export enum TypePartOfKodKlass{              // Тип составной части классификатора кода
  KLASS_OBORUD,
  VID_OBORUD,
  NAL_PU,
  GAB_ZO
}

export enum DialogMode {                     //Режим диалогового окна
  VIEW,
  CREATE,
  COPY,
  EDIT,
  AGREE,
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

export enum UserRoleAuth {                   // Роль авторизированного юзверя
  ADMIN = 'EQUIPMENT_ADMIN',
  VIEW = 'EQUIPMENT_VIEW',
}

export class TableData{
  fieldColumnList: string[];
  dataTableNavSource: object[];

  constructor(fieldColumnList: string[] = [], dataTableNavSource: object[] = []) {
    this.fieldColumnList = fieldColumnList;
    this.dataTableNavSource = dataTableNavSource;
  }
}

// export const FIELD_COLUMN_KOMPL_LIST = ['id', 'akt', 'kod', 'naim'];
// export const FIELD_COLUMN_GRUPPA_LIST = ['id', 'akt', 'kod', 'kodKlass', 'modely', 'naim', 'rod', 'tip', 'vid'];
// export const FIELD_COLUMN_MODEL_LIST = ['id', 'akt', 'ekzemplary', 'kod', 'naim', 'obozn', 'tip'];
// export const FIELD_COLUMN_OBORUD_EKZ_LIST = ['id', 'akt', 'invNom', 'model', 'naim', 'podr', 'proizv', 'serNom', 'uch'];
export const FIELD_COLUMN_KOMPL_LIST = ['id', 'kod', 'naim'];
export const FIELD_COLUMN_GRUPPA_LIST = ['id', 'kod', 'naim', 'kodKlass'];       //колонки основных таблиц
export const FIELD_COLUMN_MODEL_LIST = ['id', 'kod', 'naim', 'obozn'];
export const FIELD_COLUMN_OBORUD_EKZ_LIST = ['id', 'invNom', 'naim', 'proizv', 'serNom'];

export const FIELD_COLUMN_OBORUD_KLASS_LIST = ['id', 'kodKlass', 'naim'];
export const FIELD_COLUMN_OBORUD_VID_LIST = ['id', 'kodKlass', 'naim', 'klass'];
export const FIELD_COLUMN_NAL_PU_LIST = ['id', 'kodKlass', 'naim'];               //колонки таблиц настроек
export const FIELD_COLUMN_GAB_ZO_LIST = ['id', 'kodKlass', 'naim'];
export const FIELD_COLUMN_PROIZV_LIST = ['id', 'naim', 'polnNaim'];
export const FIELD_COLUMN_PODR_LIST = ['id', 'kod', 'kodIsp', 'naim', 'obozn', 'rod'];

export const DELAY_TIME = 300;
