function solution(n) {
    var answer = 0;

    function check_Q(queen_site, cur_q_col) {
        for (let i = 0; i < cur_q_col; i++) {
            if (queen_site[i] == queen_site[cur_q_col]) return false;
            if (Math.abs(queen_site[i]-queen_site[cur_q_col]) == Math.abs(i-cur_q_col)) return false;
        }
        return true;
    }

    function batch_Q(queen_site, cur_q_col, n) {
        if (cur_q_col == n) {
            answer++;
            return;
        }

        for (let i = 0; i < n; i++) {
            queen_site[cur_q_col] = i;
            if (check_Q(queen_site, cur_q_col)) batch_Q(queen_site, cur_q_col+1, n);
        }
    }

    var queen_site = new Array(n);
    batch_Q(queen_site, 0, n);

    return answer;
}
