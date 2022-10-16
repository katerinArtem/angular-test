import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PictureService {
  consoleText(arg) {
    console.log(arg);
  }
  constructor(private httpClient: HttpClient) {}
}
