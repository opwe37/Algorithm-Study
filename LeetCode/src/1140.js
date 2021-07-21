var stoneGameII = function(piles) {
    const dp = new Map();
    
    function findGetMaxStones (piles, m, k) {
        if (piles.length == 0) { return 0; }
        
        const sum = piles.reduce((acc, val) => acc + val);
        if (piles.length <= 2*m) { return sum; }
        
        const dpKey = k.toString() + m.toString();
        if (dp.has(dpKey)) {
            return dp.get(dpKey);
        }
                
        let maxStone = -Infinity;
        for (let i = 1; i <= 2*m; i++) {
            const tmpMaxStone = sum - findGetMaxStones(piles.slice(i), Math.max(i, m), k+i);
            maxStone = Math.max(maxStone, tmpMaxStone);
        }
        
        dp.set(dpKey, maxStone);
        
        return maxStone;
    }
    
    return findGetMaxStones(piles, 1, 0);
};
