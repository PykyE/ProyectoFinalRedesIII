import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IpConsultResponse } from '../../../utils/types';
import { GeoService } from '../service/geo.service';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrl: './geo.component.scss'
})
export class GeoComponent implements OnInit {

  constructor(
    private geoService: GeoService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.geoService.getOwnPublicAddress().subscribe({
      next: (resp: any) => {
        this.ownIpAdress = resp.ip;
        console.log('this.ownIpAdress:', this.ownIpAdress);
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
    console.log(this.ipConsultResponseValues);
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

  test () {
    console.log(this.ipConsultResponse)
  }

  handleConsultClick() {
    this.loading = true;
    this.geoService.consultIpAddress(this.ipAddressFormControl.value || this.ownIpAdress).subscribe(
      {
        next: (resp: any) => {
          this.ipConsultResponse = resp;
          this.setIpConsultResponseValues();
        },
        error: error => {
          console.log(error);
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
