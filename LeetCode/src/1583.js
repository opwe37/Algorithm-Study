var unhappyFriends = function(n, preferences, pairs) {
    let cur_p = new Array(n).fill(0);
    for (let [x, y] of pairs) {
        cur_p[x] = preferences[x].indexOf(y);
        cur_p[y] = preferences[y].indexOf(x);
    }
    
    let answer = 0;
    for (let i = 0; i < n; i++) {
        if (cur_p[i] != 0) {
            for (let j = 0; j < cur_p[i]; j++) {
                const prefer = preferences[i][j];
                if (preferences[prefer].indexOf(i) < cur_p[prefer]) {answer += 1; break;}
            }
        }
    }
    
    return answer;
};
