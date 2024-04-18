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
  GAB_ZO_URL_TOKEN,
  GRUPPA_URL_TOKEN,
  KOMPL_URL_TOKEN,
  MODEL_URL_TOKEN,
  NAL_PU_URL_TOKEN,
  OBORUD_EKZ_URL_TOKEN,
  OBORUD_KLASS_URL_TOKEN,
  OBORUD_VID_URL_TOKEN,
  PODR_URL_TOKEN,
  PROIZV_URL_TOKEN,
  UCH_URL_TOKEN
} from "./app.constant";
import {TableComponent} from './business/view/page/main/table/table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerInterceptorService} from "./business/data/service/OptionalService/spinner-interceptor.service";
import {SpinnerComponent} from './business/view/page/spinner/spinner.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {InformationDialogComponent} from './business/view/dialog/information-dialog/information-dialog.component';
import {KomplElementEditDialogComponent} from './business/view/dialog/EntityEditDialogs/kompl-element-edit-dialog/kompl-element-edit-dialog.component';
import {GruppaElementEditDialogComponent} from './business/view/dialog/EntityEditDialogs/gruppa-element-edit-dialog/gruppa-element-edit-dialog.component';
import {ModelElementEditDialogComponent} from './business/view/dialog/EntityEditDialogs/model-element-edit-dialog/model-element-edit-dialog.component';
import {OborudEkzElementEditDialogComponent} from './business/view/dialog/EntityEditDialogs/oborud-ekz-element-edit-dialog/oborud-ekz-element-edit-dialog.component';
import {KomplRelationshipDialogComponent} from './business/view/dialog/TableRelationshipDialogs/kompl-relationship-dialog/kompl-relationship-dialog.component';
import {GruppaRelationshipDialogComponent} from './business/view/dialog/TableRelationshipDialogs/gruppa-relationship-dialog/gruppa-relationship-dialog.component';
import {ModelRelationshipDialogComponent} from './business/view/dialog/TableRelationshipDialogs/model-relationship-dialog/model-relationship-dialog.component';
import {OborudEkzRelationshipDialogComponent} from './business/view/dialog/TableRelationshipDialogs/oborud-ekz-relationship-dialog/oborud-ekz-relationship-dialog.component';
import {ConfirmDialogComponent} from './business/view/dialog/confirm-dialog/confirm-dialog.component';
import {SettingsDialogComponent} from './business/view/dialog/settings-dialog/settings-dialog.component';
import {PartOfKodKlassEditDialogComponent} from './business/view/dialog/OtherSpravochnikEdit/part-of-kod-klass-edit-dialog/part-of-kod-klass-edit-dialog.component';
import {ProizvEditDialogComponent} from './business/view/dialog/OtherSpravochnikEdit/proizv-edit-dialog/proizv-edit-dialog.component';
import {PodrEditDialogComponent} from './business/view/dialog/OtherSpravochnikEdit/podr-edit-dialog/podr-edit-dialog.component';
import {UchEditDialogComponent} from './business/view/dialog/OtherSpravochnikEdit/uch-edit-dialog/uch-edit-dialog.component';
import {ToastComponent} from './business/view/page/toast/toast.component';
import { TablePaginatorComponent } from './business/view/page/main/table-paginator/table-paginator.component';
import { AttachedElementFromTableEditDialogComponent } from './business/view/dialog/attached-element-from-table-edit-dialog/attached-element-from-table-edit-dialog.component';
import { FilterComponent } from './business/view/page/main/filter/filter.component';

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
    TableComponent,
    SpinnerComponent,
    InformationDialogComponent,
    KomplElementEditDialogComponent,
    GruppaElementEditDialogComponent,
    ModelElementEditDialogComponent,
    OborudEkzElementEditDialogComponent,
    KomplRelationshipDialogComponent,
    GruppaRelationshipDialogComponent,
    ModelRelationshipDialogComponent,
    OborudEkzRelationshipDialogComponent,
    ConfirmDialogComponent,
    SettingsDialogComponent,
    PartOfKodKlassEditDialogComponent,
    ProizvEditDialogComponent,
    PodrEditDialogComponent,
    UchEditDialogComponent,
    ToastComponent,
    TablePaginatorComponent,
    AttachedElementFromTableEditDialogComponent,
    FilterComponent,
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
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: GRUPPA_URL_TOKEN, useValue: environment.backendURL + '/gruppa'},
    {provide: KOMPL_URL_TOKEN, useValue: environment.backendURL + '/kompl'},
    {provide: MODEL_URL_TOKEN, useValue: environment.backendURL + '/model'},
    {provide: OBORUD_EKZ_URL_TOKEN, useValue: environment.backendURL + '/oborud-ekz'},

    {provide: OBORUD_VID_URL_TOKEN, useValue: environment.backendURL + '/oborud-vid'},
    {provide: OBORUD_KLASS_URL_TOKEN, useValue: environment.backendURL + '/oborud-klass'},
    {provide: GAB_ZO_URL_TOKEN, useValue: environment.backendURL + '/gab-zo'},
    {provide: NAL_PU_URL_TOKEN, useValue: environment.backendURL + '/nal-pu'},

    {provide: PODR_URL_TOKEN, useValue: environment.backendURL + '/podr'},
    {provide: PROIZV_URL_TOKEN, useValue: environment.backendURL + '/proizv'},
    {provide: UCH_URL_TOKEN, useValue: environment.backendURL + '/uch'},

    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
