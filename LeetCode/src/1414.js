var findMinFibonacciNumbers = function(k) {
    const fibo = [1,1];
    while (fibo[fibo.length-1] < k) {
        const fiboLen = fibo.length;
        fibo.push(fibo[fiboLen-1] + fibo[fiboLen-2]);
    }
    
    let ans = 0;
    while (k != 0) {
        k -= fibo[biSearch(fibo, 0, fibo.length-1, k)]
        ans += 1;
    }
    
    return ans;
};

function biSearch(arr, left, right, target) {
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] == target) { return mid; }
        if (arr[mid] > target) {
            right = mid; 
        } else {
            left = mid + 1;
        }
    }
    return arr[left] == target ? left : left-1;
}
