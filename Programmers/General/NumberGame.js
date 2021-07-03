function solution(A, B) {
    var answer = 0;

    A.sort((a, b) => b-a);
    B.sort((a, b) => b-a);

    const n = A.length;
    var a_idx = 0
      , b_idx = 0;
    while(a_idx != n && b_idx != n) {
        if (B[b_idx] > A[a_idx]) {
            b_idx++;
            answer++;
        }
        a_idx++;
    }
    
    return answer;
}
