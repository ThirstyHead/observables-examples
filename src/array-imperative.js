'use strict';

let statusCodes = ['ok', 'warning', 'OK', 'Error', 'Ok', 'ok', 'OK', 'Warning'];

//TODO: Normalize codes
//TODO: Only show warnings
let warnings = [];
for(let i=0; i<statusCodes.length; i++){
  let code = statusCodes[i].toLowerCase();
  if(code === 'warning'){
    warnings.push(code);
  }
}

console.log(`All Warnings: ${warnings}`);
