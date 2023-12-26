import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './business/view/page/main/main.component';
import { HeaderComponent } from './business/view/page/main/header/header.component';
import { BodyComponent } from './business/view/page/main/body/body.component';
import { FooterComponent } from './business/view/page/main/footer/footer.component';
import { GeneralButtonsComponent } from './business/view/page/main/general-buttons/general-buttons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MultiTranslateHttpLoader} from "ngx-translate-multi-http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import localeRu from '@angular/common/locales/ru'
import {registerLocaleData} from "@angular/common";
import {HttpBackend, HttpClientModule} from "@angular/common/http";
import {environment} from "../environment/environment";
import {MAT_DATE_LOCALE} from "@angular/material/core";

registerLocaleData(localeRu)
function HttpLoaderFactory(httpClient: HttpBackend): MultiTranslateHttpLoader {
  return new MultiTranslateHttpLoader(httpClient, [
    {prefix: environment.frontendURL + '/assets/i18n/', suffix: '.json'}
  ]);
}


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    GeneralButtonsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
