var kthSmallestPrimeFraction = function(arr, k) {
    let lo = 0, hi = 1;
    while (lo < hi) {
        const mid = lo + (hi - lo) / 2;
        
        let tmpMax = 0;
        let count = 0, p, q;
        
        for (let i = 0; i < arr.length-1; i++) {
            let j = i + 1;
            while (j < arr.length && arr[i] > mid * arr[j]) { j += 1; }

            count += (arr.length - j);
            
            if (j == arr.length) { break; }
            
            const frac = arr[i] / arr[j];
            if (tmpMax < frac) {
                tmpMax = frac;
                p = arr[i];
                q = arr[j];
            }
        }
        
        if (count == k) { return [p, q]; }
        else if (count < k) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    
    return [];
};
