function solution(s) {
    var answer = 0;

    const n = s.length;

    for (let i = 0; i < n; i++) {
      let odd_answer = 0;
      for (let j = 0; j < n-i; j++) {
        if (i-j < 0 || i+j >= n) break;
        
        if (s[i-j] == s[i+j])  odd_answer = j == 0 ? odd_answer+1 : odd_answer+2;
        else break;
      }

      let even_answer = 0;
      for (let j = 0; j < n-i; j++) {
        if (i-j < 0 || i+j >= n) break;
        
        if(s[i-j] == s[i+(j+1)]) even_answer = even_answer+2;
        else break;
      }

      answer = answer > odd_answer ? answer : odd_answer;
      answer = answer > even_answer ? answer : even_answer;
    }

    return answer;
}
