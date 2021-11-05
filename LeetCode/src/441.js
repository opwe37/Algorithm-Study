var arrangeCoins = function(n) {
    let left = 0,
        right = n;
    
    // Low Bound
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        const needCoin = sigmaN(mid);
        
        if (needCoin < n) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    if (sigmaN(left) === n) { return left; }
    else { return left-1; }
};

function sigmaN(n) {
    return n*(n+1)/2
}
