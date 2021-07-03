function solution(n) {
    var answer = [];
    
    function hanoi(n, s, t, r) {
        if (n == 1) {
         answer.push([s, t])
         return;
        }

        hanoi(n-1, s, r, t);
        answer.push([s, t]);
        hanoi(n-1, r, t, s);
    }
    hanoi(n, 1, 3, 2);
    return answer;
}
