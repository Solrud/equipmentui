import {Component, OnInit} from '@angular/core';
import {TableType} from "../../../../../app.constant";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  active = 1;
  tableType = TableType;
  selectedSpravochnik: string;

  ngOnInit(): void {
    // this.selectedSpravochnik = this.tableType.KOMPL;
  }

  onClickNavTab(selectedSpravochnik: string){
    console.log('CLICK ', selectedSpravochnik)
    this.selectedSpravochnik = selectedSpravochnik;
  }

}
