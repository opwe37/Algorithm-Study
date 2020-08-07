function solution(N, road, K) {
    var answer = 0;

    var weight = new Array(N).fill(0).map(val => new Array(N).fill(Number.POSITIVE_INFINITY));
    for (let val of road) {
        let a = val[0]-1
            , b = val[1]-1
            , c = val[2];
        if (weight[a][b] != Number.POSITIVE_INFINITY) {
            c = weight[a][b] > c ? c : weight[a][b];
        }
        weight[a][b] = c;
        weight[b][a] = c;
    }
    for (let i = 0; i < N; i++) { weight[i][i] = 0; }

    var distance = new Array(N).fill(Number.POSITIVE_INFINITY);
    distance[0] = 0;
    var found = new Set();

    while (found.size != N) {
        let min = Number.POSITIVE_INFINITY
          , minIdx;
        for (let i = 0; i < N; i++) {
            if (!found.has(i) && min > distance[i]) {
                min = distance[i];
                minIdx = i;
            }
        }

        found.add(minIdx);
        for (let i = 0; i < N; i++) {
            if (weight[minIdx][i] == Number.POSITIVE_INFINITY || minIdx == i) continue;
            let val = min + weight[minIdx][i];
            if (distance[i] > val) distance[i] = val;
        }
    }

    for (let i = 0; i < N; i++) {
        if (distance[i] <= K) answer++;
    }

    return answer;
}
