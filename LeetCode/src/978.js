var maxTurbulenceSize = function(arr) {
    let answer = 1;
    
    if (arr.length < 2) { return answer; }
    
    let left = 0;
    // 0: equal, +: big, -: small
    let preValCompare = 0;
    for (let right = 0; right < arr.length-1; right++) {
        const nextValCompare = arr[right] - arr[right+1];
        answer = Math.max(answer, right - left +1);
        
        // left를 움직여야 하는 케이스
        if (nextValCompare == 0) {
            left = right + 1;
        } else if (preValCompare > 0 && nextValCompare > 0) {
            left = right;
        } else if (preValCompare < 0 && nextValCompare < 0) {
            left = right;
        }
        
        preValCompare = nextValCompare;
    }
    answer = Math.max(answer, arr.length - left)
    
    return answer;
};
