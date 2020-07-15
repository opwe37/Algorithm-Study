function solution(K, travel) {
    var answer = 0;
    
    const n = travel.length;
    
    var dp = new Array(travel.length).fill(0).map(val => new Array(K+1).fill(0));
    dp[0][travel[0][0]] = travel[0][1];
    dp[0][travel[0][2]] = travel[0][3];

    for (let i = 1; i < n; i++) {
        for (let time = 0; time < K+1; time++) {
            let walk_time = travel[i][0]
              , walk_value = travel[i][1]
              , bicycle_time = travel[i][2]
              , bicycle_value = travel[i][3];

            if ((time - walk_time) >= 0 && dp[i-1][time - walk_time] != 0) {
                let val = dp[i-1][time - walk_time] + walk_value;
                dp[i][time] = val > dp[i][time] ? val : dp[i][time];
            }
            if ((time - bicycle_time) >= 0 && dp[i-1][time - bicycle_time] != 0){
                let val = dp[i-1][time - bicycle_time] + bicycle_value;
                dp[i][time] = val > dp[i][time] ? val : dp[i][time];
            }
        }
    }

    return answer = Math.max.apply(null, dp[travel.length-1]);
}
