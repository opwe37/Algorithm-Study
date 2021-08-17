var NumArray = function(nums) {
    this.nums = nums.slice();
};

NumArray.prototype.sumRange = function(left, right) {
    let answer = 0;
    for (let i = left; i <= right; i++) { answer += this.nums[i]; }
    return answer;
};
