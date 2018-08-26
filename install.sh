#!/bin/bash
echo 'Starting global istallation...'
npm i -g @angular/cli &&
npm i -g truffle &&
npm i -g ganache-cli &&
echo 'Starting app NPM modules installation...'
npm i &&
echo 'Starting ganache...'
cd truffle &&
ganache-cli &
echo 'Starting contracts migrations...'
truffle migrate --network local --reset &&
cd ../ &&
echo 'Starting the app...'
ng serve
