var reverseWords = function(s) {
    let answer = '';
    
    const words = splitWords(s);
    while (words.length) {
    	answer += words.pop() + (words.length ? ' ' : '');
    }
    
    return answer;
}

function splitWords(s) {
    const words = [];
    
    let word = '';
    for (let i = 0; i < s.length; i++) {
    	if (s[i] === ' ') {
            if (word) {
            	words.push(word);
            	word = '';
            }
            continue;
        }
        word += s[i];
    }
    if (word) { words.push(word); }
    
    return words;
}
