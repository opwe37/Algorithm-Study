var findNumOfValidWords = function(words, puzzles) {
    const a_charCode = 'a'.charCodeAt(0);
    const word_mask = Array(words.length).fill(0);
    for (let idx in words) {
        for (let ch of words[idx]) {
            const tmp = 1 << ch.charCodeAt(0) - a_charCode;
            word_mask[idx] |= tmp;
        }
    }
    
    const answer = puzzles.map(puzzle => {
        const first_letter = 1 << puzzle[0].charCodeAt(0) - a_charCode;
        let puzzle_mask = 0
        for (let ch of puzzle) {
            puzzle_mask |= 1 << ch.charCodeAt(0) - a_charCode;
        }
        
        let count = 0;
        for (let i = 0; i < words.length; i++) {
            if ((first_letter & word_mask[i]) == first_letter && (puzzle_mask & word_mask[i]) == word_mask[i]) count += 1
        }
        return count;
    });
    
    return answer;
};
