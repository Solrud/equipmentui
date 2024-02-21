import {InjectionToken} from "@angular/core";

export const GRUPPA_URL_TOKEN = new InjectionToken<string>('url');
export const KOMPL_URL_TOKEN = new InjectionToken<string>('url');
export const MODEL_URL_TOKEN = new InjectionToken<string>('url');
export const OBORUD_EKZ_URL_TOKEN = new InjectionToken<string>('url');
export const OBORUD_VID_URL_TOKEN = new InjectionToken<string>('url');
export const PODR_URL_TOKEN = new InjectionToken<string>('url');
export const PROIZV_URL_TOKEN = new InjectionToken<string>('url');
export const UCH_URL_TOKEN = new InjectionToken<string>('url');




// export enum TableType {
//   OBORUD_EKZ = 'OBORUD_EKZEMPLYAR',
//   MODEL = 'MODEL',
//   GRUPPA = 'GRUPPA',
//   KOMPL = 'KOMPLEX'
// }


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
