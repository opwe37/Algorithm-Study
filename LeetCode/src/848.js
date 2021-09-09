var shiftingLetters = function(s, shifts) {
    const cntShift = Array(shifts.length).fill(0);
    
    cntShift[shifts.length-1] = shifts[shifts.length-1]
    
    for (let i = shifts.length-2; i >= 0; i--) {
        cntShift[i] = shifts[i] + cntShift[i+1];
    }
    
    let answer = '';
    
    const a = 'a'.charCodeAt(0);
    for (let i = 0; i < shifts.length; i++) {
        let alphabet = s[i].charCodeAt(0) - a;
        alphabet += cntShift[i];
        alphabet %= 26;
        answer += String.fromCharCode(alphabet + a);
    }
    
    return answer;
};
