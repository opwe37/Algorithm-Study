// All TestCase Pass
function solution(weight) {
  weight.sort((a, b) => a - b);
  var sum = 1;
  if (sum > 1) return 1;
  for (let i = 0; i < weight.length; i++) {
    if (sum < weight[i]) break;
    sum += weight[i];
  }
  return sum;
}

// Not Efficiency Approach : Using Recursive Method
function solution1(weight) {
  var answer = 0;

  function check(weight, target) {
    var max = 0;
    var idx;
    for (let i = 0; i < weight.length; i++) {
      if (weight[i] > max && target >= weight[i]) {max = weight[i]; idx = i}
    }
    if (max == 0) return false;
    
    if (target - max == 0) {
      return true;
    }

    weight.splice(idx, 1);
    let next = check(weight.slice(), target-max);
    if (next) return true;
    else return false;
  }
  
  for (let i = 1;; i++) {
    let result = check(weight.slice(), i);
    if (!result) return i;
  }

  return answer;
}
