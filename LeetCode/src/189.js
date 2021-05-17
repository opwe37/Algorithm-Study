var rotate = function(nums, k) {
    const N = nums.length;
    
    let count = 0;
    for (let start = 0; count < N; start++) {
        let current = start;
        let pre_val = nums[start];
        do {
            const next = (current + k) % N;
            [nums[next], pre_val] = [pre_val, nums[next]];
            count += 1;
            current = next;
        } while (current != start);
    }
        
    return;
};
