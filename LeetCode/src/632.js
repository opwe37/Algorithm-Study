/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function(nums) {
    let result_x = 0, result_y = Infinity;
    const pointers = Array(nums.length).fill(0);
    
    while (true) {
        let min_i = 0, max_i = 0
        for (let i = 0; i < nums.length; i++) {
            if (nums[min_i][pointers[min_i]] > nums[i][pointers[i]]) {
                min_i = i;
            }
            if (nums[max_i][pointers[max_i]] < nums[i][pointers[i]]) {
                max_i = i;
            }
        }
        
        if (result_y - result_x > nums[max_i][pointers[max_i]] - nums[min_i][pointers[min_i]]) {
            result_x = nums[min_i][pointers[min_i]];
            result_y = nums[max_i][pointers[max_i]];
        }

        pointers[min_i] += 1;
        if (pointers[min_i] >= nums[min_i].length) {
            break;
        }
    }
    
    return [result_x, result_y];
};
