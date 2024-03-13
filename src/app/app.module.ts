import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MainComponent} from './business/view/page/main/main.component';
import {HeaderComponent} from './business/view/page/main/header/header.component';
import {BodyComponent} from './business/view/page/main/body/body.component';
import {FooterComponent} from './business/view/page/main/footer/footer.component';
import {GeneralButtonsComponent} from './business/view/page/main/general-buttons/general-buttons.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MultiTranslateHttpLoader} from "ngx-translate-multi-http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import localeRu from '@angular/common/locales/ru'
import {registerLocaleData} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpBackend, HttpClientModule} from "@angular/common/http";
import {environment} from "../environment/environment";
import {
  GRUPPA_URL_TOKEN,
  KOMPL_URL_TOKEN,
  MODEL_URL_TOKEN,
  OBORUD_EKZ_URL_TOKEN,
  OBORUD_VID_URL_TOKEN,
  PODR_URL_TOKEN,
  PROIZV_URL_TOKEN,
  UCH_URL_TOKEN
} from "./app.constant";
import {NavbarComponent} from './business/view/page/main/navbar/navbar.component';
import {TableComponent} from './business/view/page/main/table/table.component';
import { FormsModule } from '@angular/forms';
import {SpinnerInterceptorService} from "./business/data/service/OptionalService/spinner-interceptor.service";
import { SpinnerComponent } from './business/view/page/spinner/spinner.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EquipmentDialogComponent } from './business/view/dialog/equipment-dialog/equipment-dialog.component';
import { SpravochnikDialogComponent } from './business/view/dialog/spravochnik-dialog/spravochnik-dialog.component';
import { InformationDialogComponent } from './business/view/dialog/information-dialog/information-dialog.component';

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
    GeneralButtonsComponent,
    NavbarComponent,
    TableComponent,
    SpinnerComponent,
    EquipmentDialogComponent,
    SpravochnikDialogComponent,
    InformationDialogComponent
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
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: GRUPPA_URL_TOKEN, useValue: environment.backendURL + '/gruppa'},
    {provide: KOMPL_URL_TOKEN, useValue: environment.backendURL + '/kompl'},
    {provide: MODEL_URL_TOKEN, useValue: environment.backendURL + '/model'},
    {provide: OBORUD_EKZ_URL_TOKEN, useValue: environment.backendURL + '/oborud-ekz'},
    {provide: OBORUD_VID_URL_TOKEN, useValue: environment.backendURL + '/oborud-vid'},
    // {provide: OBORUD_URL_TOKEN, useValue: environment.backendURL + '/oborud'},
    {provide: PODR_URL_TOKEN, useValue: environment.backendURL + '/podr'},
    {provide: PROIZV_URL_TOKEN, useValue: environment.backendURL + '/proizv'},
    {provide: UCH_URL_TOKEN, useValue: environment.backendURL + '/uch'},

    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
