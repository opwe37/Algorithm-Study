function solution(n, times) {
    var answer = 0;

    if (n == 1) return Math.min.apply(null, times);

    var min = 0
      , max = Math.max.apply(null, times)*n;
    while (min <= max) {
      let mid = Math.floor((min+max)/2);
      
      let quotient = 0;
      for (let t of times) {
          quotient += parseInt(mid/t);
      }

      if (quotient >= n) {
          if (answer == 0) answer = mid;
          else {
            answer = answer > mid ? mid : answer;
          }
          max = mid - 1;
      } else {
        min = mid + 1;
      }
    }

    return answer;
}
