var grayCode1 = function(n) {
    function recursive(n) {
        if (n == 1) { return ['0', '1']; }
    
        const preGrayCode = recursive(n-1);
        
        const ans = [];
        
        for (let i = 0; i < preGrayCode.length; i++) {
            ans.push('0' + preGrayCode[i]);
        }
        for (let i = preGrayCode.length-1; i >= 0; i--) {
            ans.push('1' + preGrayCode[i]);
        }

        return ans;
    }
    
    return recursive(n).map(val => parseInt(val, 2));
}

// ====================================================================

var grayCode2 = function(n) {
    const ans = [];
    
    for (let i = 0; i < Math.pow(2, n); i++) {
        ans.push(i ^ (i >> 1));
    }
    
    return ans;
};
