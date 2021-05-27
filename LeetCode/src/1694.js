var reformatNumber = function(number) {
    let arr_nums = number.replace(/[' '-]/g, '').split('');
    const N = arr_nums.length;
    
    let ans = '';
    const val = Math.trunc(N / 3);
    let index = -1;
    for (let i = 0; i < val; i++) {
        ans += arr_nums[index+1] + arr_nums[index+2] + arr_nums[index+3] + '-';
        index += 3;
    }
    
    let i = index+1;
    if (N % 3 == 0) { ans = ans.slice(0, ans.length-1); }
    else if (N % 3 == 1) {
        ans = ans.slice(0, ans.length-2) + '-';
        i = N-2;
    }
    for (; i < N; i++) {
        ans += arr_nums[i];
    }
    
    return ans;
};
