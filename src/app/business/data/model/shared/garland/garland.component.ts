import {Component, Input} from '@angular/core';
import {Holiday} from "../../../../../app.constant";

@Component({
  selector: 'app-garland',
  templateUrl: './garland.component.html',
  styleUrls: ['./garland.component.css']
})
export class GarlandComponent {
  @Input()
  currentHoliday: Holiday | null = null;

  get Holiday(){
    return Holiday;
  }
}
