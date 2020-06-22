// Approach 1 (Not Effieciency)
var moveSet = [[-1, 0], [1, 0], [0, -1], [0, 1]]
function solution(land, height) {
  var answer = 0;
  var landSize = land.length;
  var landCondition = Array.from(Array(landSize), () => new Array(landSize).fill(false))
  
  var possibleMovePoints = [[0, 0]];
  landCondition[0][0] = true;
  var candidateLadder = [];

  function searchLand(possibleMovePoints) {
    while (possibleMovePoints.length != 0) {
      let point = possibleMovePoints.shift();
      landCondition[point[0]][point[1]] = true;

      for (let val of moveSet) {
        if (point[0]+val[0] >= 0 && point[0]+val[0] < landSize && point[1]+val[1] >= 0 && point[1]+val[1] < landSize && landCondition[point[0]+val[0]][point[1]+val[1]] == false) {
          let sub = Math.abs(land[point[0]+val[0]][point[1]+val[1]] - land[point[0]][point[1]]); 
          if (sub <= height) {
            landCondition[point[0]+val[0]][point[1]+val[1]] = true;
            possibleMovePoints.push([point[0]+val[0], point[1]+val[1]]);
          } else {
            candidateLadder.push([[point[0]+val[0], point[1]+val[1]], sub]);
          }
        }
      }
    }

    if (candidateLadder.length != 0) {
      candidateLadder = candidateLadder.filter(val => landCondition[val[0][0]][val[0][1]] == false);
    }
  }

  while (true) {
    searchLand(possibleMovePoints)
    if (candidateLadder.length != 0) {
      let nextPoint = candidateLadder.reduce(function(pre, cur) {
        return pre[1] > cur[1] ? cur : pre;
      });
      possibleMovePoints = [nextPoint[0]];
      answer += nextPoint[1];
    } else {
      break;
    }
  }

  return answer;
}
