function solution1(cookie) {
    var answer = 0;

    for (let m = 0; m < cookie.length-1; m++) {
        let l_idx = 0, r_idx = cookie.length -1;

        let l_val = l_idx == 0 ? sum[m] : sum[m] - sum[l_idx-1];
        let r_val = sum[r_idx] - sum[m];

        while (true) {
            if (l_val == r_val && answer < l_val) {
                answer = l_val;
                break;
            }

            if (l_val <= r_val && r_idx > m+1){
                r_idx--;
                r_val = sum[r_idx] - sum[m];
            } else if (r_val <= l_val && l_idx < m) {
                l_idx++;
                l_val = sum[m] - sum[l_idx-1];
            } else {
                break;
            }
        }
    }

    return answer;
}

function solution2(cookie) {
    var answer = 0;

    var sum = [];
    sum.push(cookie[0]);
    for (let i = 1; i < cookie.length; i++) {
        sum.push(cookie[i] + sum[i-1]);
    }

    for (let m = 0; m < cookie.length-1; m++) {
        let l_idx = 0, r_idx = cookie.length -1;

        let l_val = l_idx == 0 ? sum[m] : sum[m] - sum[l_idx-1];
        let r_val = sum[r_idx] - sum[m];

        while (true) {
            console.log(l_val, l_idx, r_val, r_idx, m);
            if (l_val == r_val && answer < l_val) {
                answer = l_val;
                break;
            }

            if (l_val < r_val && r_idx > m+1){
                r_idx--;
                r_val = sum[r_idx] - sum[m];
            } else if (r_val < l_val && l_idx < m) {
                l_idx++;
                l_val = sum[m] - sum[l_idx-1];
            } else {
                break;
            }
        }
    }

    return answer;
}
