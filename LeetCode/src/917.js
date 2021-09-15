var reverseOnlyLetters = function(s) {
    let stack = [];
    let answer = s.split('');
    
    for (let i = 0; i < s.length; i++) {
        if (isAlpha(s[i])) {
            stack.push(s[i]);
        }
    }
    
    for (let i = 0; i < s.length; i++) {
        if (isAlpha(answer[i])) {
            answer[i] = stack.pop();
        }
    }
    
    return answer.join('');
};

var isAlpha = function(char) {
    const code = char.charCodeAt(0)
    return 65 <= code && code <= 90 || 97 <= code && code <= 122;
}
