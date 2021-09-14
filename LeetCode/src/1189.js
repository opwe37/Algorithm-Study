var maxNumberOfBalloons = function(text) {
    const dic = new Map();
    for (let char of text.split('')) {
        if (!dic.has(char)) {
            dic.set(char, 0);
        }
        dic.set(char, dic.get(char)+1);
    }
    
    return Math.min(dic.get('b') | 0, dic.get('a') | 0, dic.get('n') | 0, Math.min(dic.get('l')/2) | 0, Math.min(dic.get('o')/2) | 0);
};
