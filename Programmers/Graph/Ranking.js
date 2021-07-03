function solution(n, results) {
  var answer = 0;
  

  var fight = new Array(n).fill(0).map(val => new Array(n).fill(0));
  for (let result of results) {
      let winner = result[0]-1
        , loser = result[1]-1;
      fight[winner][loser] = 1;
      fight[loser][winner] = -1;
  }

  for (let k = 0; k < n; k++) {
    let winner = []
      , loser = [];
    for (let i = 0; i < n; i++) {
      if (fight[k][i] == 0) continue;
      if (fight[k][i] == 1) winner.push(i);
      else loser.push(i);
    }

    for (let w of winner) {
      for (let l of loser) {
        fight[w][l] = -1;
        fight[l][w] =1;
      }
    }
  }

  fight.forEach(val => {
    let count = 0;
    val.forEach(val => {if (val != 0) count++;})
    if (count == (n-1)) answer++;
  })

  return answer;
}
