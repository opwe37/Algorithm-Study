// ==============================================================================
// O(nlogn) Sort Algorithm

var customSortString = function(order, str) {
    const customOrder = new Array(26).fill(27);
    
    const codeA = 'a'.charCodeAt(0);
    for (let i = 0; i < order.length; i++) {
        const ascii = order[i].charCodeAt(0)
        
        customOrder[ascii - codeA] = i + 1;
    }
    
    const strList = str.split('');
    const ansList = strList.sort((a, b) => {
        return customOrder[a.charCodeAt(0) - codeA] - customOrder[b.charCodeAt(0) - codeA]
    })
    
    return ansList.join('');
};


// ==============================================================================
// O(n + k) Counting Sort

var customSortString = function(order, str) {
    let ans = '';
    
    const charMap = new Map();
    for (let i = 0; i < str.length; i++) {
        if (!charMap.has(str[i])) { charMap.set(str[i], 0); }
        charMap.set(str[i], charMap.get(str[i]) + 1);
    }
    
    // order에 정의된 문자
    for (let i = 0; i < order.length; i++) {
        if (!charMap.has(order[i])) { continue; }
        
        ans += order[i].repeat(charMap.get(order[i]));
        charMap.delete(order[i]);
    }
    
    // order에 정의되지 않은 나머지 문자
    for (let [char, freq] of charMap.entries()) {
        ans += char.repeat(freq);
    }
    
    return ans;
};
