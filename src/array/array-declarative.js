'use strict';

let statusCodes = ['ok', 'warning', 'OK', 'Error', 'Ok', 'ok', 'OK', 'Warning'];

//TODO: Normalize codes
//TODO: Only show warnings
//TODO: Stretch goal -- show count of warnings

// using shorthand ES6 'fat arrow'
// This code demonstrates a 'fluent interface' (aka 'method chaining')
let result = statusCodes.map( it => it.toLowerCase() )
                        // .filter( it => it === 'warning')
                        // .reduce( count => count + 1, 0 );
console.log(result);


// This code is declarative
// This code is functional
// Each function (map, filter, reduce) is 'highly cohesive'
// This code demonstrates a 'fluent interface' (aka 'method chaining')



////////////////////////////
// alternate syntax,
// identical results
////////////////////////////


// // 1. using 'function' instead of ES6 'fat arrow'
// let result = statusCodes.map( function(currentValue, index, array){
//                           return currentValue.toLowerCase();
//                         });
// console.log(result);
//
//
//
// // 2. using longform ES6 'fat arrow'
// let result = statusCodes.map( (currentValue, index, array) => {
//                           return currentValue.toLowerCase();
//                         });
//
// console.log(result);
//
//
//
//
// // 3. using shorthand ES6 'fat arrow'
// let result = statusCodes.map( currentValue => currentValue.toLowerCase() );
// console.log(result);
