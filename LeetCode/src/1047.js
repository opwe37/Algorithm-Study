var removeDuplicates = function(s) {
    const stack = [];
    
    for (let i = 0; i < s.length; i++) {
        if (stack.length == 0) { 
            stack.push(s[i]); 
            continue; 
        }
        
        if (s[i] == stack[stack.length-1]) {
            stack.pop();
            continue;
        }
        
        stack.push(s[i]);
    }
    
    return stack.join('')
};
