function solution(n, s, a, b, fares) {
    var answer = Infinity;
    
    const dist = Array(n).fill(0).map(val => Array(n).fill(Infinity));
    for (let [u, v, fare] of fares) {
        dist[u-1][v-1] = fare;
        dist[v-1][u-1] = fare;
    }
    for (let v = 0; v < n; v++) {
        dist[v][v] = 0;
    }
    
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]){
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    
    for (let k = 0; k < n; k++) {
        answer = Math.min(answer, dist[s-1][k] + dist[k][a-1] + dist[k][b-1]);
    }
    
    return answer;
}
