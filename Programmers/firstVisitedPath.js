function solution(dirs) {
    var answer = 0;

    var visitedPath = new Array(11).fill(0).map(val => new Array(11).fill(0).map(val => new Array(4).fill(false)));

    var curSite = [5, 5];
    var moveX = [0, 0, -1, 1]
      , moveY = [1, -1, 0, 0];
    
    for (let i = 0; i < dirs.length; i++) {
        let dirIdx, objIdx;
        switch(dirs[i]) {
          case 'U':
            dirIdx = 0; objIdx = 1;
            break;
          case 'D':
            dirIdx = 1; objIdx = 0;
            break;
          case 'L':
            dirIdx = 2; objIdx = 3;
            break;
          case 'R':
            dirIdx = 3; objIdx = 2;
            break;
        }

        let nextX = curSite[0] + moveX[dirIdx]
          , nextY = curSite[1] + moveY[dirIdx];
        if (nextX < 0 || nextX > 10 || nextY < 0 || nextY > 10) continue;

        if (!visitedPath[curSite[1]][curSite[0]][dirIdx]) {
            visitedPath[curSite[1]][curSite[0]][dirIdx] = true;
            visitedPath[nextY][nextX][objIdx] = true;
            answer++;
        }
        curSite = [nextX, nextY];
    }

    return answer;
}
