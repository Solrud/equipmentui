import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environment/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'equipmentui';

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }
}
