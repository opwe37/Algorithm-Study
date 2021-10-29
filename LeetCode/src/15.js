var threeSum = function(nums) {
    const answer = [];
    
    if (nums.length < 3) { return answer; }
    
    nums.sort((a, b) => a - b);
    
    for (let first = 0; first < nums.length-2; first++) {
        if (first !== 0 && nums[first] === nums[first-1]) { continue; }
        
        let second = first + 1;
        let third = nums.length-1;
        while (second < third) {
            const sumVal = nums[first] + nums[second] + nums[third];
            
            if (sumVal > 0) {
                third -= 1;
            } else if (sumVal < 0) {
                second += 1;
            } else {
                answer.push([nums[first], nums[second], nums[third]]);
                
                const curSecondVal = nums[second];
                while (second < third && curSecondVal == nums[second]) { second += 1; }
            }
        }
    }
    
    return answer;
};
