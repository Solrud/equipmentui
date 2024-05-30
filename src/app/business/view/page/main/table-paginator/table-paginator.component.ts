import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DELAY_TIME_CLOSE_FOR_TOOLTIP, DELAY_TIME_OPEN_FOR_TOOLTIP } from 'src/app/app.constant';
import {ABaseSearchDTO} from "../../../../data/model/search/ABaseSearchDTO";

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css']
})
export class TablePaginatorComponent implements OnInit {

  @Input()
  objectSearch: ABaseSearchDTO;
  @Input()
  totalFoundedObjects: number;

  @Output('objectSearchOutput')
  objectSearchOutput: EventEmitter<ABaseSearchDTO> = new EventEmitter<ABaseSearchDTO>();

  constructor() {
  }

  ngOnInit(): void {

  }

  public get DELAY_TIME_OPEN_FOR_TOOLTIP(){
    return DELAY_TIME_OPEN_FOR_TOOLTIP;
  }
  public get DELAY_TIME_CLOSE_FOR_TOOLTIP(){
    return DELAY_TIME_CLOSE_FOR_TOOLTIP;
  }

  getCurrentElementNumbers(pageNumber: number, pageSize: number, totalElements: number): string {
    if (totalElements < pageSize || totalElements < pageNumber * pageSize) return ((pageNumber - 1) * pageSize) + 1 + '-' + totalElements;
    return ((pageNumber - 1) * pageSize) + 1 + '-' + pageNumber * pageSize;
  }

  onClickPageChanged(pageChange: any): void {
    if (this.objectSearch.pageNumber !== (pageChange - 1)) {
      this.objectSearch.pageNumber = pageChange - 1;
      this.objectSearchOutput.emit(this.objectSearch);
    }
  }

  onClickPageSizeChanged(pageSizeChange: any): void {
    if (this.objectSearch.pageSize !== pageSizeChange) {
      this.objectSearch.pageNumber = 0;
      this.objectSearch.pageSize = pageSizeChange;
      this.objectSearchOutput.emit(this.objectSearch);
    }
  }
}
