function solution_BottomUp(left, right) {
  var answer = 0;
  
  var dp = new Array(left.length+1).fill(0).map(val => new Array(left.length+1).fill(0));

  for (let i = left.length-1; i >= 0; i--) {
      for (let j = right.length-1; j >= 0; j--) {
          if (left[i] > right[j]) dp[i][j] = dp[i][j+1] + right[j];
          else {
              dp[i][j] = dp[i+1][j] > dp[i+1][j+1] ? dp[i+1][j] : dp[i+1][j+1];
          }
      }
  } 
  answer = dp[0][0];

  return answer;
}

function solution_TopDown(left, right) {
  var answer = 0;
  
  var dp = new Array(left.length+1).fill(0).map(val => new Array(left.length).fill(-1));

 function top_down(leftIdx, rightIdx) {
    if (leftIdx == left.length || rightIdx == right.length) return 0;
    if (dp[leftIdx][rightIdx] != -1) return dp[leftIdx][rightIdx];

    if (left[leftIdx] > right[rightIdx]) {
        dp[leftIdx][rightIdx] = top_down(leftIdx, rightIdx + 1) + right[rightIdx];
    } else {
        let dropLeft = top_down(leftIdx+1, rightIdx)
          , dropBoth = top_down(leftIdx+1, rightIdx+1);
        dp[leftIdx][rightIdx] = dropLeft > dropBoth ? dropLeft : dropBoth;
    }
    return dp[leftIdx][rightIdx];
  }

  top_down(0, 0);
  answer = dp[0][0];

  return answer;
}
