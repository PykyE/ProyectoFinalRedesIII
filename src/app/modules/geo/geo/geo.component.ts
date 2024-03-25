import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrl: './geo.component.scss'
})
export class GeoComponent {

  isOwnIpCheck = false;

  ipAddressFormControl = new FormControl({value: "", disabled: false}, [Validators.required, this.isValidIp()]);

  regexp = {
    ipv4: /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm,
    ipv6: /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/gm
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

  handleConsultClick() {
    console.log(this.ipAddressFormControl)
    console.log('Consulting IP: ', this.ipAddressFormControl.value);
    console.log('Is own IP: ', this.isOwnIpCheck);
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
