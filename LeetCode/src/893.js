var numSpecialEquivGroups = function(words) {
    const arr = new Set();
    words.forEach(s => {
        let evenStr = [],
            oddStr = [];
        for (let i = 0; i < s.length; i = i+2) {
            evenStr.push(s[i]);
            if (i+1 < s.length) oddStr.push(s[i+1]);
        }
        arr.add(evenStr.sort().join('') + oddStr.sort().join(''));
    });
    
    return arr.size;
};
