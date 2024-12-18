import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setLocalStorage(name: string, value: string, days: number = 7): void {
    const valueToSave = JSON.stringify({ value, expires: new Date().getTime() + (days * 24 * 60 * 60 * 1000) });
    localStorage.setItem(name, valueToSave);
  }

  addValueLocalStorage(name: string, jsonValue: string, days: number = 365): void {
    let valueParse = JSON.parse(this.getLocalStorage(name));
    let valueNewParse = JSON.parse(jsonValue);
    if (!valueParse) valueParse = {};
    Object.keys(valueNewParse).forEach(key => {
      valueParse[key] = valueNewParse[key];
    });
    this.setLocalStorage(name, JSON.stringify(valueParse), days);
  }

  getLocalStorage(name: string): string {
    const value = localStorage.getItem(name);
    if (value) {
      const parsedValue = JSON.parse(value);
      if (parsedValue.expires && parsedValue.expires < new Date().getTime()) {
        this.deleteLocalStorage(name);
        return null;
      }
      return parsedValue.value;
    } else {
      return null;
    }
  }

  deleteLocalStorage(name: string): void {
    localStorage.removeItem(name);
  }
}
