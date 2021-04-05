/**
 * // This is the master's API interface.
 * // You should not implement it, or speculate about its implementation
 * function Master() {
 *
 *     @param {string[]} wordlist
 *     @param {Master} master
 *     @return {integer}
 *     this.guess = function(word) {
 *         ...
 *     };
 * };
 */
/**
 * @param {string[]} wordlist
 * @param {Master} master
 * @return {void}
 */

var calcMatchScore = function(word1, word2) {
    let score = 0;
    for (let i = 0; i < 6; i++) {
        if (word1[i] == word2[i]){
            score += 1;
        }
    }
    return score;
}

// 공통의 문자가 많이 속한 단어를 선정하는 방법
var findSecretWord_1 = function(wordlist, master) {
    let try_num = 0;
    while (wordlist.length!=0 && try_num < 10) {
        try_num += 1;
        
        const test = countChar(wordlist);
        const guessWord = getCommonWord(test, wordlist)
        const guess_score = master.guess(guessWord);
        if (guess_score == 6) break;
        wordlist = wordlist.filter(s => guess_score == calcMatchScore(guessWord, s));
    }
};

var countChar = function(wordlist) {
    const result = Array(6).fill(0).map(val => Array(26).fill(0));
    for (let idx in wordlist) {
        const word = wordlist[idx];
        for (let i = 0; i < 6; i++) {
            result[i][word[i].charCodeAt() - 'a'.charCodeAt()] += 1;
        }
    }
    return result;
}

var getCommonWord = function(arr, wordlist) {
    let max = 0;
    let max_idx = 0;
    for (let i = 0; i < wordlist.length; i++) {
        let score = 0;
        for (let j = 0; j < 6; j++) {
            score += arr[j][wordlist[i][j].charCodeAt() - 'a'.charCodeAt()];
        }
        if (score > max) {
            max = score;
            max_idx = i;
        }
    }
    return wordlist[max_idx];
}

// Random을 이용한 방법
var findSecretWord_2 = function(wordlist, master) {
    // wordlist.sort()
    let try_num = 0;
    while (wordlist.length!=0 && try_num < 10) {
        try_num += 1;
        
        const idx = Math.floor(Math.random() * wordlist.length);
        let guess_score = master.guess(wordlist[idx]);
        if (guess_score == 6) break;
        wordlist = wordlist.filter(s => guess_score == calcMatchScore(wordlist[idx], s));
    }
};
