const { toColonNotation, toMilliseconds } = require('colon-notation');

console.log(toColonNotation(3600001139000)) //00:10

console.log(toMilliseconds('1000000:18:59')) //80000