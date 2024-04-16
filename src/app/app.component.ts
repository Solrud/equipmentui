import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {defaultLocale} from "./app.constant";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    //Todo потом что нибудь передалть с куками
    this.translateService.use(defaultLocale);
  }
}
