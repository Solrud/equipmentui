import {Component, TemplateRef} from '@angular/core';
import {ToastService} from "../../../data/service/OptionalService/toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  constructor(public toastService: ToastService) {
  }
  show = true;

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
