var hIndex = function(citations) {
    let ans = 0;
        
    const N = citations.length
    let lo = 0, hi = N-1;
    while (lo <= hi) {
        const mid = lo + Math.trunc((hi - lo)/2);
        
        if (citations[mid] >= N - mid) {
            ans = Math.max(ans, N - mid);
            hi = mid - 1;
        } else {
            if (citations[mid]) ans = Math.max(ans, citations[mid]);
            lo = mid + 1;
        }
    }
    return ans;
};
