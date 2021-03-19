var numIdenticalPairs = function(nums) {
    let answer = 0;
    
    const elements = new Map()
    for (let i = 0; i < nums.length; i++) {
        if (!elements.has(nums[i])){
            elements.set(nums[i], 0);
        }
        answer += elements.get(nums[i])
        elements.set(nums[i], elements.get(nums[i])+1);
    }
    
    return answer;
};
