import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, Output, EventEmitter} from '@angular/core';
import {debounceTime, Subscription} from "rxjs";



@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
}
