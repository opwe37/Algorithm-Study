// ============= Hash Map =============
// N = strs.length, M = strs[i]'s max length
// Time Complexity = O(M * N * logN)
var groupAnagrams = function(strs) {
    const group = new Map();
    strs.forEach(str => {
        const sortedStr = str.split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join('');
        if (!group.has(sortedStr)) {
            group.set(sortedStr, []);
        }
        group.get(sortedStr).push(str);
    });
    
    const answer = [];
    for (let [ _, g ] of group) {
        answer.push(g);
    }
    return answer;
};
