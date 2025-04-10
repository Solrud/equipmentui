import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {defaultLocale} from "./app.constant";
import {environment} from "../environment/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isProd = false;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.isProd = environment.production
    this.translateService.use(defaultLocale);
  }
}
