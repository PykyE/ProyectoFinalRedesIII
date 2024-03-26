import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

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
    // @ts-ignore
    return this.http.get(environment.lambda_url + `?ip=${ip}`);
  }

}
