var NumArray = function(nums) {
    this.nums = nums.slice();
};

NumArray.prototype.sumRange = function(left, right) {
    let answer = 0;
    for (let i = left; i <= right; i++) { answer += this.nums[i]; }
    return answer;
};

// =============================================================================
// Prefix Sum
var NumArray_prefixSum = function(nums) {
    this.prefix = [nums[0]];
    
    for (let i = 1; i < nums.length; i++) {
        this.prefix[i]  = nums[i] + this.prefix[i-1];
    }
};

NumArray_prefixSum.prototype.sumRange = function(left, right) {
    return this.prefix[right] - (left-1 < 0 ? 0 : this.prefix[left-1]);
};

