var judgeSquareSum = function(c) {
    let a = 0;
    while (c - (a*a) >= 0) {
        const b = c - (a * a);
        if (Number.isInteger(Math.sqrt(b))) { return true; }
        a += 1;
    }
    return false;
};
