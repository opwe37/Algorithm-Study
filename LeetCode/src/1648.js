var maxProfit = function(inventory, orders) {
    const map = new Map();
    inventory.forEach(val => {
        if (!map.has(BigInt(val))) { map.set(BigInt(val), 0n); }
        map.set(BigInt(val), map.get(BigInt(val)) + 1n);
    });
    
    const inven = Array.from(map.entries());
    inven.sort((a, b) => {
        if (a[0] > b[0]) { return 1; }
        else if (a[0] < b[0]) { return -1; }
        else { return 0; }
    });
    
    let ans = 0n;
  
    let remain = BigInt(orders);
    let i = inven.length-1;
    let count = inven[i][1];
    while (remain > 0) {
        let r = inven[i][0];
        let l = i-1 < 0 ? 0n : inven[i-1][0];
        
        let curOrder = (r-l) * count;
        
        if (remain >= curOrder) {
            ans += (count * (sigma(r) - sigma(l)));
            remain -= curOrder;
        } else {
            const takeAll = remain / count;
            const takeRemain = remain % count;
            
            ans += (count * (sigma(r) - sigma(r-takeAll)));
            ans += (takeRemain * (r-takeAll));
            
            remain -= (count * takeAll) + (takeRemain);
        }
        
        count += i - 1 < 0 ? 0n : inven[i-1][1];
        i -= 1;
        ans %= BigInt((10**9) + 7);
    }
    
    return ans;
};

var sigma = function(val) {
    return (val * (val+1n)) / 2n;
}
