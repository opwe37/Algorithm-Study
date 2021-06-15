var sumEvenAfterQueries = function(nums, queries) {
    const ans = []
    
    let evenSum = 0;
    for (let num of nums) {
        if (num % 2 == 0) { evenSum += num; }
    }
    
    for (let [val, index] of queries) {
        let prevIsEven = nums[index] % 2 ? false : true;
        nums[index] += val;
        let curIsEven = nums[index] % 2 ? false : true;
        
        if (prevIsEven && curIsEven ) { evenSum += val; }
        else if (prevIsEven && !curIsEven) { evenSum -= (nums[index] - val); }
        else if (!prevIsEven && curIsEven) { evenSum += nums[index]; }
        
        ans.push(evenSum);
    }
    
    return ans;
};
