var reachableNodes = function(edges, maxMoves, n) {
    let answer = 0;
    
    const adj = Array(n).fill(0).map(val => []);
    for (let [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }
    
    const used = new Map();
    
    // 현재 모든 노드를 최대 maxMoves로는 도달 불가능한 거리로 초기화     
    const dist = Array(n).fill(maxMoves + 1);
    dist[0] = 0;
    
    const queue = [[0, 0]];
    while (queue.length) {
        const [d, node] = queue.shift();
        
        // dist[]은 maxMoves+1로 초기화가 되었고, 이후 과정에서 도달가능한 최단거리로 업데이트될 것임
        if (d > dist[node]) { continue; }         
        answer += 1;
        
        for (let [n, w] of adj[node]) {
            // node => n 으로 가는 간선에서 몇개의 sub node를 갈 수 있는지 체크
            used.set(`${node}to${n}`, Math.min(w, maxMoves - d))
            
            // 0 => node => n 으로 가기 위해 필요한 총 weight 계산
            const pathDist = d + w + 1;
            if (pathDist < dist[n]) {
                dist[n] = pathDist;
                queue.push([pathDist, n]);
            }
        }
        
        queue.sort((a, b) => a[0] - b[0]);
    }
    
    // maxMoves 내로 도달 가능한 sub node의 수 계산
    for (let [u, v, w] of edges) {
        const used1 = used.get(`${u}to${v}`) ? used.get(`${u}to${v}`) : 0;
        const used2 = used.get(`${v}to${u}`) ? used.get(`${v}to${u}`) : 0;
        answer += Math.min(w, used1 + used2);
    }
    
    return answer;
};
