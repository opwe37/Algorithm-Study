var complexNumberMultiply = function(num1, num2) {
    const [num1Real, num1Imagi] = splitRealImaginary(num1);
    const [num2Real, num2Imagi] = splitRealImaginary(num2);
    
    const multiplyReal = (num1Real * num2Real) - (num1Imagi * num2Imagi);
    const multiplyImagi = (num1Imagi * num2Real) + (num2Imagi * num1Real);
    
    return `${multiplyReal}+${multiplyImagi}i`;
}

var splitRealImaginary = function(num) {
    const reg = /(-?\d+)\+(-?\d+)i/g;
    const splitResult = reg.exec(num);
    
    return [parseInt(splitResult[1]), parseInt(splitResult[2])];
}
