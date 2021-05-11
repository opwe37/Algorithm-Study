var shortestCompletingWord = function(licensePlate, words) {
    const letters = new Map();
    licensePlate = licensePlate.replace(/\d|\s/g, '').toLowerCase();
    for (let ch of licensePlate) {
        if (!letters.has(ch)) { letters.set(ch, 0); }
        letters.set(ch, letters.get(ch)+1);
    }
    
    let answer = '';
    words.forEach(word => {
        const word_letters = new Map();
        for (let ch of word) {
            if (!word_letters.has(ch)) { word_letters.set(ch, 0); }
            word_letters.set(ch, word_letters.get(ch)+1);
        }
        
        for (let [letter, count] of letters) {
            if (!word_letters.has(letter) || word_letters.get(letter) < count) {
                return;
            }
        }
        answer = !answer ? word : answer.length > word.length ? word : answer;
    });
    return answer;
};
