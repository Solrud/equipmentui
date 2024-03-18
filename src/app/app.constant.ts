import {InjectionToken} from "@angular/core";

export const GRUPPA_URL_TOKEN = new InjectionToken<string>('url');
export const KOMPL_URL_TOKEN = new InjectionToken<string>('url');
export const MODEL_URL_TOKEN = new InjectionToken<string>('url');
export const OBORUD_EKZ_URL_TOKEN = new InjectionToken<string>('url');
export const OBORUD_VID_URL_TOKEN = new InjectionToken<string>('url');
export const PODR_URL_TOKEN = new InjectionToken<string>('url');
export const PROIZV_URL_TOKEN = new InjectionToken<string>('url');
export const UCH_URL_TOKEN = new InjectionToken<string>('url');


export const DEFAULT_PAGE_NUMBER = 0;
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_SORT_COLUMN = 'id';
export const DEFAULT_SORT_DIRECTION = 'desc';

export enum TableType {
  OBORUD_EKZ = 'Экземпляр оборудования',
  MODEL = 'Модель',
  GRUPPA = 'Группа',
  KOMPL = 'Комплекс',
  PODR = 'Подразделение',
  PROIZV = 'Производитель',
  UCH = 'Участки'
}

export enum UserRoleAuth {
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

export const INIT_NAV_BAR = TableType.GRUPPA;

// export const FIELD_COLUMN_KOMPL_LIST = ['id', 'akt', 'kod', 'naim'];
// export const FIELD_COLUMN_GRUPPA_LIST = ['id', 'akt', 'kod', 'kodKlass', 'modely', 'naim', 'rod', 'tip', 'vid'];
// export const FIELD_COLUMN_MODEL_LIST = ['id', 'akt', 'ekzemplary', 'kod', 'naim', 'obozn', 'tip'];
// export const FIELD_COLUMN_OBORUD_EKZ_LIST = ['id', 'akt', 'invNom', 'model', 'naim', 'podr', 'proizv', 'serNom', 'uch'];
export const FIELD_COLUMN_KOMPL_LIST = ['id', 'kod', 'naim'];
export const FIELD_COLUMN_GRUPPA_LIST = ['id', 'kod', 'naim', 'kodKlass'];
export const FIELD_COLUMN_MODEL_LIST = ['id', 'kod', 'naim', 'obozn'];
export const FIELD_COLUMN_OBORUD_EKZ_LIST = ['id', 'invNom', 'model', 'naim', 'podr', 'proizv', 'serNom', 'uch'];
