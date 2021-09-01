var findMin = function(nums) {
    let left = 0, right = nums.length-1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[left] <= nums[mid] && nums[mid] <= nums[right]) {
            break;
        }
        
        if (nums[mid] >= nums[left]) {
            left = mid + 1;
        } else if (nums[mid] < nums[right]) {
            right = mid;
        }
    }
    
    return nums[left];
};
