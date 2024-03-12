import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy} from '@angular/core';
import {debounceTime, Subscription} from "rxjs";
import {EventService} from "../../../data/service/OptionalService/event.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements AfterViewInit, OnDestroy{
  loadingSubscription: Subscription;

  constructor(private spinnerService: EventService,
              private elementRef: ElementRef,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.display = 'none';
    this.loadingSubscription = this.spinnerService.spinnerVisibility.pipe(debounceTime(300)).subscribe( (status: boolean) => {
        this.elementRef.nativeElement.style.display = status ? 'block' : 'none';
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

}
