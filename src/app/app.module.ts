import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './business/view/page/main/main.component';
import { HeaderComponent } from './business/view/page/main/header/header.component';
import { BodyComponent } from './business/view/page/main/body/body.component';
import { FooterComponent } from './business/view/page/main/footer/footer.component';
import { GeneralButtonsComponent } from './business/view/page/main/general-buttons/general-buttons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';

import {MultiTranslateHttpLoader} from "ngx-translate-multi-http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import localeRu from '@angular/common/locales/ru'
import {registerLocaleData} from "@angular/common";
import {HttpBackend, HttpClientModule} from "@angular/common/http";
import {environment} from "../environment/environment";
import {
  GRUPPA_URL_TOKEN,
  KOMPL_URL_TOKEN,
  MODEL_URL_TOKEN,
  OBORUD_EKZ_URL_TOKEN,
  PODR_URL_TOKEN,
  PROIZV_URL_TOKEN, UCH_URL_TOKEN
} from "./app.constant";

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
    MatSidenavModule,
    MatButtonModule
  ],
  providers: [
    {provide: GRUPPA_URL_TOKEN, useValue: environment.backendURL + '/gruppa'},
    {provide: KOMPL_URL_TOKEN, useValue: environment.backendURL + '/kompl'},
    {provide: MODEL_URL_TOKEN, useValue: environment.backendURL + '/model'},
    {provide: OBORUD_EKZ_URL_TOKEN, useValue: environment.backendURL + '/oborud-ekz'},

    //?
    // {provide: OBORUD_URL_TOKEN, useValue: environment.backendURL + '/oborud'},


    {provide: PODR_URL_TOKEN, useValue: environment.backendURL + '/podr'},
    {provide: PROIZV_URL_TOKEN, useValue: environment.backendURL + '/proizv'},
    {provide: UCH_URL_TOKEN, useValue: environment.backendURL + '/uch'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
