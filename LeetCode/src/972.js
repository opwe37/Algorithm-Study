var isRationalEqual = function(s, t) {
    return Math.abs(convert(s) - convert(t)) < 1e-9;
}

function convert(s) {
    if (!s.includes('(')) {
        return parseFloat(s);
    }
    
    const ratios = [1.0, 1.0/9, 1.0/99, 1.0/999, 1.0/9999];
    const integerPart = Number(s.split('.')[0]);
    
    let nonRepeatingPart = s.split('.')[1].split('(')[0];
    const nonRepeatingPart_length = nonRepeatingPart.length;
    nonRepeatingPart = Number(nonRepeatingPart) * Math.pow(0.1, nonRepeatingPart_length);
    let repeatingPart = s.split('.')[1].split('(')[1].split(')')[0];
    repeatingPart = Number(repeatingPart) * Math.pow(0.1, nonRepeatingPart_length) * ratios[repeatingPart.length];
    
    console.log(integerPart + nonRepeatingPart + repeatingPart)
    return integerPart + nonRepeatingPart + repeatingPart
}
