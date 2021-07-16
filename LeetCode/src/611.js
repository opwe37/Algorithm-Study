// ======================== 선형적 방법 ========================
var triangleNumber_linear = function(nums) {
    if (nums.length < 3) { return 0; }
    
    let ans = 0;
    
    const N = nums.length;
    nums = nums.sort((a, b) => a - b);
    for (let i = 0; i < N - 2; i++) {
        for (let j = i+1; j < N - 1; j++) {
            let k = j+1;
            while (nums[i]+nums[j] > nums[k]) { k += 1; ans += 1; }
        }
    }
    
    return ans;
};

// ======================== 이진 탐색 방법 적용 ========================
var triangleNumber_bs = function(nums) {
	let ans = 0;
    
	nums = nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length-2; i++) {
    	for (let j = i+1; j < nums.length-1; j++) {
        	let low = j+1, high = nums.length;
            while (low < high) {
                const mid = low + Math.floor((high-low)/2);
                
                if (nums[i]+nums[j] > nums[mid]) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            ans += (low - 1 - j);
        }
    }
    
    return ans;
}

// ======================== 투포인터 방법 적용 ========================
var triangleNumber_tp = function(nums) {
	let ans = 0;
    
	nums = nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
    	let low = 0, high = i-1;
        while (low < high) {
            if (nums[low]+nums[high] > nums[i]) {
                ans += high - low;
                high -= 1;
            } else {
                low += 1;
            }
        }
    }
    
    return ans;
}
