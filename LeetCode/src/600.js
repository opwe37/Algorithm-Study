// =============== Brute Force ===============
var findIntegers_brute = function(n) {
    return find(0, 0, n, false)
};

var find = function(i, num, limit, prev) {
    if (num > limit) { return 0; }
    if ((1 << i) > limit) { return 1; }
    if (prev) {
        // 이전 비트가 1이면, 현재는 0비트
        // 현재 비트가 0이라는 것은, 숫자의 변화X
        return find(i+1, num, limit, false)
    }
    return find(i+1, num, limit, false) + find(i+1, num+(1<<i), limit, true)
};

// =============== Bit Manipulation ===============
var findIntegers_bit = function(n) {
    let memo = [1, 2];
    let i = 2;
    for (; ; i++) {
        memo.push(memo[i-1] + memo[i-2]);
        if (Math.pow(2, i) > n) { break; }
    }
    
    let num = n;
    let ans = 0, preBit = 0;
    while (i >= 0) {
        if (((1 << i) & num) != 0) {
            ans += memo[i];
            if (preBit == 1) {
                ans -= 1; //자기 자신 제외
                break;
            }
            preBit = 1;
        } else {
            preBit = 0;
        }
        i -= 1;
    }
    
    return ans + 1;
};
