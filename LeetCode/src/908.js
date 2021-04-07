var smallestRangeI = function(A, K) {
    let min_val = A[0];
    let max_val = A[0];
    for (let val of A){
        min_val = Math.min(min_val, val);
        max_val = Math.max(max_val, val);
    }
    if (max_val - min_val < 2*K) {
        return 0;
    }
    return Math.abs((max_val - K) - (min_val + K));
};
