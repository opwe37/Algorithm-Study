function solution(N, stages) {
  var answer = [];

  var stage = new Map();
  for (let i = 0; i < N; i++) {
    stage.set(i+1, 0);
  }

  for (let i = 0; i < stages.length; i++) {
    stage.set(stages[i], stage.get(stages[i])+1);
  }
  stage.delete(N+1);

  var player = stages.length;
  stage.forEach(function(value, key, map){
    let failureRate = 0
    if (player > 0) failureRate = value / player;
    player = player - value;
    map.set(key, failureRate);
  });

  var mapAsc = new Map([...stage.entries()].sort(function(a, b){
    if (a[1] == b[1]) return a[0] - b[0];
    else return b[1] - a[1];
  }));
  console.log(mapAsc)
  mapAsc.forEach((value, key) => answer.push(key));

  return answer;
}
