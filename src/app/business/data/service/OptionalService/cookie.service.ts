import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  setCookie(nameCookie: string, valueCookie: string, days: number = 7): void {
    const date = new Date();
    const value = encodeURI(valueCookie);
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));// установка времени жизни кука (7 дней по умолчанию)
    document.cookie = encodeURI(nameCookie) + '=' + value + '; expires=' + date.toUTCString() + '; path=/; SameSite=Strict; Secure;';
  }

  addValueCookie(nameCookie: string, jsonCookie: string, days: number = 365): void {
    let valueCookieParse = JSON.parse(this.getCookie(nameCookie));
    let valueCookieNewParse = JSON.parse(jsonCookie);
    if (!valueCookieParse) valueCookieParse = {};
    Object.keys(valueCookieNewParse).forEach( key => {
      valueCookieParse[key] = valueCookieNewParse[key];
    });
    this.setCookie(nameCookie, JSON.stringify(valueCookieParse), days);
  }

  getCookie(nameCookie: string): string {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + encodeURI(nameCookie) + '=');
    if (parts.length === 2) {
      return decodeURI(parts.pop().split(';').shift());
    } else {
      return null;
    }
  }


  deleteCookie1(nameCookie: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = encodeURI(nameCookie) + '=; expires=' + date.toUTCString() + '; path=/';
  }
}
