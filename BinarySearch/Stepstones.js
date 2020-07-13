function solution(distance, rocks, n) {
  var answer = 0;
  rocks.sort((a, b) => a - b);
  rocks.push(distance);
  
  var min = 0, 
      max = distance;
  while (min <= max) {
    let mid = Math.floor((min + max) / 2);

    let numOfRemove = 0;
    let preRock = 0;
    for (let i = 0; i < rocks.length; i++) {
      if (mid > rocks[i]-preRock) numOfRemove++;
      else preRock = rocks[i];
    }

    if (numOfRemove > n) {
      max = mid -1;
    } else if(numOfRemove <= n) {
      if (answer < mid) {
        answer = mid;
      }
      min = mid + 1;
    }
  }

  return answer;
}
