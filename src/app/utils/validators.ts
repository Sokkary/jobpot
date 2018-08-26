declare let require: any;
const Web3 = require('web3');
import { FormControl, ValidationErrors } from '@angular/forms';
import validator from 'validator';

export function emailValidator(control: FormControl): ValidationErrors {
  console.log('emailValidator: ', control.value);
  return validator.isEmail(control.value || '') ? null : { 'email': true };
}

export function mobileValidator(control: FormControl): ValidationErrors {
  const regex = /^\+(?:[0-9] ?){8,14}[0-9]$/;
  return regex.test(control.value || '') ? null : { 'mobile': true };
}

export function ethAddressValidator(control: FormControl): ValidationErrors {
  return  !control.value || !control.value.trim().length || Web3.utils.isAddress(control.value) ? null : { 'ethAddress': true };
}

export function minLengthValidator(control: FormControl): ValidationErrors {
  return (control.value || '').length >= 8 ? null : { 'minLength': true };
}

export function alphaValidator(control: FormControl): ValidationErrors {
  return /^[a-zA-Z\d\-_\s]+$/.test(control.value || '') ? null : { 'alpha': true };
}

export function alphaNoSpaceValidator(control: FormControl): ValidationErrors {
  return /^[a-zA-Z\d\-_]+$/.test(control.value || '') ? null : { 'alphaNoSpace': true };
}

export function firstLastNameValidator(control: FormControl): ValidationErrors {
  return (control.value || '').trim().split(' ').length > 1 ? null : { 'firstLastName': true };
}
