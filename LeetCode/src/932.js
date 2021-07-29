var beautifulArray = function(n) {
    if (n == 1) { return [1]; }
    
    const prevN = n % 2 == 1 ? Math.floor(n/2)+1 : n/2;
    const prevArr = beautifulArray(prevN);
    
    const ans = [];
    for (let val of prevArr) {
        if (2*val - 1 <= n) { ans.push(2*val - 1); }
    }
    for (let val of prevArr) {
        if (2*val <= n) { ans.push(2*val); }
    }
    return ans;
};
