var removeDuplicates = function(s) {
	const stack = [];
    
    for (let i = 0; i < s.length; i++) {
    	if (stack.length != 0 && stack[stack.length-1] == s[i]) {
        	stack.pop();
            continue;
        }
        
        stack.push(s[i]);
    }
    
    return stack.join('');
}
