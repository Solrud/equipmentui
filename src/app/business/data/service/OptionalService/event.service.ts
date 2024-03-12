import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {initNavBar, TableData, TableType} from "../../../../app.constant";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  selectedSpravTable$: BehaviorSubject<TableType> = new BehaviorSubject<TableType>(initNavBar);

  selectSpravTab$(navTab: TableType){
    this.selectedSpravTable$.next(navTab);
  }

  tableDataSource$ = new BehaviorSubject(new TableData());
  pushTableDataSource$(columnList: string[], dataTableList: object[]){
    this.tableDataSource$.next(new TableData(columnList, dataTableList))
  }

  spinnerVisibility = new BehaviorSubject(false);
  showSpinner$(): void {
    console.log('спиннер есть');
    this.spinnerVisibility.next(true);
  }
  hideSpinner$(): void {
    console.log('спиннера нету');
    this.spinnerVisibility.next(false);
  }
}
