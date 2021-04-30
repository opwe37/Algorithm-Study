var smallestRangeII = function(A, K) {
    if (A.length == 1) return 0;

    A = A.sort((a, b) => a - b);
    let answer = A[A.length-1] - A[0];
    for (let i = 0; i < A.length-1; i++) {
        const max = Math.max(A[A.length-1] - K, A[i] + K);
        const min = Math.min(A[0] + K, A[i+1] - K);
        answer = Math.min(answer, max - min);
    }
    
    return answer;
};
