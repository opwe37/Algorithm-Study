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

// Approach 2 : Using UnionFind
function solution(land, height) {
    var answer = 0;
    const area = [];
    const landSize = land.length;
    const visit = Array.from(Array(landSize), () => Array(landSize).fill(-1))
    var moveSet = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    var areaNum = 0;

    land.forEach((land_val, i) => {
      land_val.forEach((val, j) => {
        if (visit[i][j] == -1) {
          let tmp_area = [];
          let possibleMovePoints = [[i, j]];
          while (possibleMovePoints.length != 0) {
            let point = possibleMovePoints.shift();
            visit[point[0]][point[1]] = areaNum;
            tmp_area.push([point[0], point[1]]);

            for (let move of moveSet) {
              const newX = point[0] + move[0];
              const newY = point[1] + move[1];
              if (newX >= 0 && newX < landSize && newY >= 0 && newY < landSize && visit[newX][newY] == -1) {
                let sub = Math.abs(land[newX][newY] - land[point[0]][point[1]]); 
                if (sub <= height) {
                  visit[newX][newY] = areaNum;
                  possibleMovePoints.push([newX, newY]);
                }
              }
            }
          }
          areaNum++;
          area.push(tmp_area);
        }
      })
    });

    // Calc Min Distance among Areas
    var arr = [];
    area.forEach((area_val, area_id) => {
      area_val.forEach((val) => {
        for (let move of moveSet) {
          const newX = val[0] + move[0];
          const newY = val[1] + move[1];
          if (newX >= 0 && newX < landSize && newY >= 0 && newY < landSize && visit[newX][newY] != area_id) {
            let cost = Math.abs(land[newX][newY] - land[val[0]][val[1]]);
            const s = area_id < visit[newX][newY] ? area_id : visit[newX][newY];
            const e = area_id > visit[newX][newY] ? area_id : visit[newX][newY];
            arr.push([s, e, cost])
          }
        }
      })
    });
    arr.sort((a,b) => a[2] - b[2])

    let t = new A(areaNum);
    arr.forEach(val => {
      if (t.find(val[0]) == t.find(val[1])) return;
      answer += val[2];
      t.merge(val[0], val[1]);
    })
    return answer;

  }

  class A {
    constructor(n) {
      this.root = new Array(n).fill(0);
      this.root.forEach((e, i) => this.root[i] = i);
    }
    find(n) {
      if (this.root[n] == n) return n;
      return this.root[n] = this.find(this.root[n]);
    }
    merge(a, b) {
      this.root[this.find(a)] = this.root[b];
    }
}
