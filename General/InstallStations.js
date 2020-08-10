function solution(n, stations, w) {
    var answer = 0;
    
    var uncovered = [];
    if (stations[0] - w - 1 > 0) {
        uncovered.push([1, stations[0] - w - 1]);
    }

    if (stations[stations.length -1] + w + 1 < n+1) {
        uncovered.push([stations[stations.length -1] + w + 1, n]);
    }

    for (let i = 0; i < stations.length-1; i++) {
        let start = stations[i] + w + 1;
        let end = stations[i+1] - w - 1;
        uncovered.push([start, end])
    }
    
    const coverLength = 1 + (2 * w);
    uncovered.forEach(val => {
        answer += Math.ceil((val[1] - val[0] +1) / coverLength);
    })

    return answer;
}
