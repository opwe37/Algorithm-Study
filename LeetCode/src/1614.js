var maxDepth = function(s) {
    let depth = 0;
    let max_depth = 0;
    for (let ch = 0; ch < s.length; ch++) {
        if (s[ch] == '(') {
            depth += 1;
        } else if (s[ch] == ')'){
            max_depth = Math.max(max_depth, depth);
            depth -= 1;
        }
    }
    return max_depth;
};
