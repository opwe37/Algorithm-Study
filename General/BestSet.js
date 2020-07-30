function solution(n, s) {
    var answer = [-1];
    
    if (n > s) return answer;
    
    const val = Math.floor(s / n);
    const remainder = s % n;
    answer = new Array(n).fill(val);
    for (let i = n-1; i >= n - remainder; i--) {
        answer[i] += 1;
    }
    
    return answer;
}
