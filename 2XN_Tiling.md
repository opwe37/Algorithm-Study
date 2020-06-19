function solution(n) {    
    var pre_pre_val = 1,
        pre_val = 2,
        current_val;
    for (let i = 3; i <= n; i++) {
        let tmp = pre_val;
        current_val = (pre_pre_val+pre_val) % 1000000007;
        pre_pre_val = tmp;
        pre_val = current_val;
    }
    return current_val;
}
