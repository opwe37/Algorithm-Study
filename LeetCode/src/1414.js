function findMinFibonacciNumbers_1(k) {
	const fibonacci = [1, 1];
    while (fibonacci[fibonacci.length-1] < k) {
    	fibonacci.push(fibonacci[fibonacci.length-1] + fibonacci[fibonacci.length-2]);
    }
    
    let ans = 0;
    for (let i = fibonacci.length-1; i >= 0; i--) {
    	if (fibonacci[i] <= k) {
        	k -= fibonacci[i];
            ans += 1;
            if (k == 0) { break; } 
        }
    }
    
    return ans;
}


// ========================================================================================

// Using Binary Search
var findMinFibonacciNumbers_2 = function(k) {
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
