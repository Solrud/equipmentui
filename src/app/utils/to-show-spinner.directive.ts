import {AfterViewInit, Directive, Inject, TemplateRef, ViewContainerRef} from '@angular/core';
import {EventService} from "../business/data/service/OptionalService/event.service";
import {DELAY_TIME} from "../app.constant";
import {debounceTime} from "rxjs/operators";

@Directive({
  selector: '[appToShowSpinner]'
})
export class ToShowSpinnerDirective<T> implements AfterViewInit{

  constructor(@Inject(TemplateRef) private templateRef: TemplateRef<T>,
              @Inject(ViewContainerRef) private viewContainerRef: ViewContainerRef,
              private spinnerService: EventService)
  { }

  ngAfterViewInit(): void {
    this.spinnerService.spinnerVisibility
      .pipe(debounceTime(DELAY_TIME))
      .subscribe( (status: boolean) => {
        this.viewContainerRef.clear();
        if (status)
          this.viewContainerRef.createEmbeddedView(this.templateRef)
        }
      )
  }
}
