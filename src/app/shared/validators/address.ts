import {FormControl} from '@angular/forms';

declare let require: any;

const Web3 = require('web3');

export class EthAddressValidator {

  static isValid(control: FormControl) {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/Pjuqwe1f8zc0UUwAkZRJ'));
    return web3.utils.isAddress( control.value ) ? null : { 'invalidAddress': true };
  }
}
