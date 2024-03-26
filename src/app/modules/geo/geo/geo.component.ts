import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IpConsultResponse } from '../../../utils/types';
import { GeoService } from '../service/geo.service';
import { Environment } from '../../../env/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrl: './geo.component.scss'
})
export class GeoComponent implements OnInit {

  constructor(
    private geoService: GeoService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.geoService.getOwnPublicAddress().subscribe({
      next: (resp: any) => {
        this.ownIpAdress = resp.ip;
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  loading: Boolean = false;

  isOwnIpCheck: Boolean = false;

  ownIpAdress: string = '';

  gMapsStreetViewUrl: any = '';

  gMapsStaticUrl: any = '';

  ipAddressFormControl: FormControl = new FormControl({value: "", disabled: false}, [Validators.required, this.isValidIp()]);

  regexp: any = {
    ipv4: /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm,
    ipv6: /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/gm
  }

  ipConsultResponse: Partial<IpConsultResponse> = {}

  ipConsultResponseValues: {
    name: String,
    value: String | Number
  }[] | [] = []

  setIpConsultResponseValues() {
    this.ipConsultResponseValues = Object.entries(this.ipConsultResponse).map(([key, value]) => {
      return {
        name: key,
        value: value
      }
    });
  }

  setGMapsUrl() {
    let unsafeStreetViewUrl = `https://www.google.com/maps/embed/v1/streetview?key=${Environment.g_maps_api_key}&location=${this.ipConsultResponse.Latitude},${this.ipConsultResponse.Longtitude}`
    let unsafeStaticUrl = `https://www.google.com/maps/embed/v1/place?key=${Environment.g_maps_api_key}&q=${this.ipConsultResponse.Latitude},${this.ipConsultResponse.Longtitude}&center=${this.ipConsultResponse.Latitude},${this.ipConsultResponse.Longtitude}`
    this.gMapsStreetViewUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(unsafeStreetViewUrl);
    this.gMapsStaticUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(unsafeStaticUrl);
  }

  isValidIp(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        
        const value = control.value;
        if (!value) {
            return null;
        }
        let isValid = this.regexp.ipv4.test(value) || this.regexp.ipv6.test(value);
        return isValid ? null : { 'invalidIp': { value: control.value } };
    }
  }

  isIpConsultResponseEmpty() {
    return Object.keys(this.ipConsultResponse).length != 0 && Object.values(this.ipConsultResponse).every(value => value !== null && value !== undefined)
  }

  handleConsultClick() {
    this.loading = true;
    this.geoService.consultIpAddress(this.ipAddressFormControl.value || this.ownIpAdress).subscribe(
      {
        next: (resp: any) => {
          this.ipConsultResponse = resp;
          this.setIpConsultResponseValues();
          this.setGMapsUrl();
        },
        error: error => {
          console.error(error);
        },
        complete: () => {
          this.loading = false;
        }
      }
    );
  }

  handleCheckOwnIpClick() {
    if (this.isOwnIpCheck) {
      this.ipAddressFormControl.disable();
      this.ipAddressFormControl.reset();
    } else {
      this.ipAddressFormControl.enable();
    }
  }

}
