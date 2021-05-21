var nthMagicalNumber = function(n, a, b) {
    const MOD = 1000000007;
    
    gcd = (x, y) => {
        if (x == 0) return y;
        return gcd(y % x, x);
    }
    
    const lcm = (a * b) / gcd(a, b);
    
    let lo = 0, hi = n * Math.min(a, b);
    while (lo < hi) {
        const mid = lo + Math.trunc((hi - lo) / 2);
        
        if (Math.trunc(mid / a) + Math.trunc(mid / b) - Math.trunc(mid / lcm) >= n) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    
    return lo % MOD;
};
