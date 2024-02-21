import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../data/service/OptionalService/event.service";
import {TableType} from "../../../../app.constant";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  ngOnInit(): void {
    // EventService.selectedSpravTable.subscribe(result =>{
    //   if(result) {
    //     EventService.selectedSpravTable.next('tesst');
    //   }
    // }
    // )


  }

  // te(){
  //   EventService.selectedSpravTable.next('kkkkkkkkk');
  //
  //
  //
  // }
}
