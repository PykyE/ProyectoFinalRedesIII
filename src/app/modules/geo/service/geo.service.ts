import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../env/environment';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(
    private http: HttpClient,
  ) { }

  getOwnPublicAddress() {
    return this.http.get('https://api.ipify.org/?format=json');
  }
  
  consultIpAddress(ip: string | number) {
    return this.http.get(Environment.api_url + `?ip=${ip}`);
  }

}
