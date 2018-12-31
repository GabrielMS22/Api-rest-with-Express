'use strict'

var params = process.argv.slice(2);
var number1 = parseFloat(params[0]);
var number2 = parseFloat(params[1]);

var plantilla = `
La suma es ${number1 + number2}
La resta es ${number1 - number2}
La multipicacion es ${number1 * number2}
La division es ${number1 /number2}`;
console.log(plantilla);

console.log('Hello world with NODEJS');