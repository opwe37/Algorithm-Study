var countNicePairs = function(nums) {
    let hash = new Map();
    nums.forEach(val => {
        const n = val - rev(val);
        if (!hash.has(n)) { hash.set(n, 0); }
        hash.set(n, hash.get(n) + 1);
    });
    
    let pairsNum = [0, 0, 1, 3, 6, 10];
    function getPairsNum(x) {
        if (pairsNum[x]) { return pairsNum[x]; }
        if (x == 0 || x == 1) return 0;
        
        pairsNum[x] = getPairsNum(x-1) + x - 1;
        return pairsNum[x];
    }
    
    let ans = 0;
    hash.forEach(val => {
        ans += getPairsNum(val);
        ans %= 1000000007;
    })
    
    return ans;
};

var rev = function(x) {
    let ans = '';
    
    while (x) {
        r = x % 10;
        ans += r;
        x = Math.trunc(x/10);
    }
    
    return Number(ans);
}
