// 정규표현식을 이용한 풀이
var isValidSerialization = function(preorder) {
    const re = /(\d+,#,#)/g;
    while (re.test(preorder)) {
        preorder = preorder.replaceAll(re, '#');
    }
    
    return preorder === '#';
};

//========================================================

// Stack을 이용한 풀이
var isValidSerialization = function(preorder) {
    let nodes = preorder.split(',');
    let stack = [];
    for (let node of nodes) {
        stack.push(node);
        
        while (stack.length >= 3 && node == '#' && stack[stack.length-2] == '#' && stack[stack.length-3] !== '#') {
            stack.pop();
            stack.pop();
            stack[stack.length-1] = '#';
        }
    }
    
    return stack.length == 1 && stack[0] == '#';
};
