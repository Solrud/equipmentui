import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IBaseDTO} from "../../model/dto/IBaseDTO";

export interface ICRUDService<D extends IBaseDTO>{
  create(d: D): Observable<D>;
  read(d: D): Observable<D>;
  update(d: D): Observable<D>;
  delete(id: number): Observable<boolean>;
}
