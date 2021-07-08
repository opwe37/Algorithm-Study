//===================== Sorting =====================

var kthSmallest_sort = function(matrix, k) {
    const elements = matrix.flat();
    elements.sort((a, b) => a - b);
    
    return elements[k-1];
};


//================== Binary Search ==================

var kthSmallest_bs = function(matrix, k) {
    const n = matrix.length;
    
    let l = matrix[0][0],
        r = matrix[n-1][n-1];
    while (l <= r) {
        const m = l + Math.floor((r-l)/2);
        
        // count: martix에 m 보다 작은 값의 개수
        const count = lessOrEqualCount(matrix, m);
        
        if (count < k) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return l;
};

var lessOrEqualCount = function(matrix, target) {
    const n = matrix.length;
    
    let count = 0;
    let j = n-1;
    for (let i = 0; i < n; i++) {
        while (j >= 0 && matrix[i][j] > target) { j -= 1; }
        count += j+1;
        
        if (j < 0) { break; }
    }
    
    return count;
}
