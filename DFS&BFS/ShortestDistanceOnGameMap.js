function solution(maps) {
    var answer = -1;

    const map_w = maps[0].length;
    const map_h = maps.length;

    var q = [[0, 0, 1]];
    const moveX = [0, 0, -1, 1];
    const moveY = [-1, 1, 0, 0];
    while (q.length != 0) {
        let cur_site = q.shift();
        if (cur_site[0] == map_w-1 && cur_site[1] == map_h-1) {
            answer = cur_site[2];
            break;
        }

        for (let i = 0; i < 4; i++) {
            let nextX = cur_site[0] + moveX[i];
            let nextY = cur_site[1] + moveY[i];
            if (nextX >= map_w || nextY >= map_h || nextX < 0 || nextY < 0 || maps[nextY][nextX] == 0) continue;
            q.push([nextX, nextY, cur_site[2]+1]);
            maps[nextY][nextX] = 0;
        }
    }

    return answer;
}
