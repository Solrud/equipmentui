import {Injectable, TemplateRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastList: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toastList.push({ textOrTpl, ...options });
  }

  showPositive(textOrTpl: string | TemplateRef<any>) {
    this.toastList.push({ textOrTpl, classname: 'bg-success text-light', delay: 3500, autoHide: true});
  }
  //Вариант с закрытием с хедером
  // showNegative(textOrTpl: string | TemplateRef<any>) {
  //   this.fastNotificationList.push({ textOrTpl, classname: 'bg-danger text-light', delay: 3000000, header: "Ошибка!"});
  // }

  showNegative(textOrTpl: string | TemplateRef<any>) {
    this.toastList.push({ textOrTpl, classname: 'bg-danger text-light', delay: 4000, autoHide: true});
  }

  showNegativeFixed(textOrTpl: string | TemplateRef<any>) {
    this.toastList.push({ textOrTpl, classname: 'bg-danger text-light', autoHide: false});
  }

  showNegativeFixedAdm(textOrTpl: string | TemplateRef<any>) {
    this.toastList.push({ textOrTpl, classname: 'bg-danger text-light', autoHide: false, header: "Информация для разработчика!"});
  }

  remove(toast) {
    this.toastList = this.toastList.filter((t) => t !== toast);
  }

  clear() {
    this.toastList.splice(0, this.toastList.length);
  }
}
