function solution(strs, t) {
    var answer = false;

    var dp = new Array(t_length).fill(Infinity);

    for (let i = 0; i < t.length; i++) {
        let candidates = [];
        strs.forEach(val => {
            if (val[val.length -1] == t[i]) {
                candidates.push(val);
            }
        });

        if (candidates.length == 0) continue;

        let subTarget = t.substr(0, i+1);
        candidates.forEach(val => {
            let strIdx = subTarget.indexOf(val, (i+1) - val.length);
            if (strIdx != -1) {
                if (strIdx == 0) dp[i] = 1;
                else{
                    dp[i] = Math.min(dp[i], dp[i-val.length] +1);
                }
            }
        });
    }
    answer = dp[t.length -1] == Infinity ? -1 : dp[t.length -1];

    return answer;
}
