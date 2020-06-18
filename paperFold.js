function solution(n) {
  return paperFold1(n);
  // return paperFold2(n);
}

var dp = [0, [0]]

function paperFold1(n) {
  if (n == 1) return dp[1];
  if (dp[n] != undefined) return dp[n];

  var tmp = [];
  var x = paperFold1(n-1)
  for (let i = 0; i < x.length; i++) {
    if (i % 2 == 0) {
      tmp.push(0);
      tmp.push(x[i]);
      tmp.push(1);
    } else {
      tmp.push(x[i]);
    }
  }
  dp[n] = tmp.slice();
  return dp[n];
}

function paperFold2(n) {
  if (dp[n] != undefined) return dp[n];

  var left = paperFold2(n-1);
  var center = 0;
  var right = [];
  for (let i = 0; i < left.length; i++) {
    let e = left[left.length-(1+i)];
    e ? right.push(0) : right.push(1);
  }
  return left.concat(center).concat(right);
}
