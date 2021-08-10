var addStrings = function(num1, num2) {
    const num1Str = num1.split('').map(char => char.charCodeAt(0) - 48);
    const num2Str = num2.split('').map(char => char.charCodeAt(0) - 48);
    
    let answer = '';
    let carry = 0;
    while (num1Str.length || num2Str.length) {
        const n1Digit = num1Str.length ? num1Str.pop() : 0;
        const n2Digit = num2Str.length ? num2Str.pop() : 0;
        
        const digitSum = carry + n1Digit + n2Digit;
        carry = digitSum > 9 ? 1 : 0;
        
        answer = (digitSum % 10) + answer;
    }
    
    if (carry) { answer = carry + answer; }
    
    return answer;
};
