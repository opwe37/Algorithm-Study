# 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree
출처 : https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/

## 문제 

Given a weighted undirected connected graph with  `n` vertices numbered from  `0`  to  `n - 1`, and an array  `edges` where  `edges[i] = [ai, bi, weighti]`  represents a bidirectional and weighted edge between nodes `ai` and  `bi`. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.

Find  _all the critical and pseudo-critical edges in the given graph's minimum spanning tree (MST)_. An MST edge whose deletion from the graph would cause the MST weight to increase is called a _critical edge_. On the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.

Note that you can return the indices of the edges in any order.

`0`에서 `n - 1`로 표기된 `n`개의 정점과 노드 `ai`와 `bi`의 가중치가 `edges[i] = [ai, bi, weighti]`으로 표현된 간선 배열 `edges`로 이루어진 무방향 가중 그래프가 주어진다. 최소신장트리(MST)는 모든 정점이 사이클없이 연결되어 있고 전체 간선의 가중치가 가능한 최소인 그래프의 간선으로 구성된 서브셋이다.

 _주어진 그래프의 최소신장트리에서 모든 임계 간선과 유사-임계 간선_ 찾아라. 그래프에서 삭제되면 MST의 가중치를 상승시키는 MST의 간선이 _임계 간선_ 이다. 반면에 _유사-임계_ 간선은 일부 MST에서 나타나지만 모든 MST에서 나타나지는 않는 간선이다.

결과에서 간선의 순서는 어떤 순서로 반환하야도 된다.

## 예제
![](https://assets.leetcode.com/uploads/2020/06/04/ex1.png)
```
Input: n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
Output: [[0,1],[2,3,4,5]]
Explanation: The figure above describes the graph.
The following figure shows all the possible MSTs:
```
![](https://assets.leetcode.com/uploads/2020/06/04/msts.png)
```
Notice that the two edges 0 and 1 appear in all MSTs, therefore they are critical edges, 
so we return them in the first list of the output.
The edges 2, 3, 4, and 5 are only part of some MSTs, therefore they are considered pseudo-critical edges.
We add them to the second list of the output.
```

## 접근 방법

문제에서 임계와 유사-임계 간선을 나누는 기준을 보면, 최초 그래프의 MST 가중치를 기준으로 하는 것을 알 수 있다.
- 임계(critical) 간선: 모든 MST에 필수적으로 포함되는 간선 = 해당 간선이 없으면 MST 가중치 값이 증가 또는 MST 생성 불가
- 유사-임계(pseudo-critical) 간선: 일부 MST에만 포함되는 간선 = 해당 간선이 없더라도 MST 가중치 값은 유지

위의 정보에 따라 임의의 간선이 임계 간선인지 확인하는 것은 간단하다. 판단하고자 하는 간선을 제외시키고 MST 가중치를 계산, 원래 MST 가중치와 비교를 통해 값이 커졌다면 임계간선으로 판단하면 된다.

유사-임계 간선의 경우, 단순히 간선을 제거하고 MST값이 유지되는지만 판단하면 안된다. 그 이유는 해당 간선이 MST를 만드는데 사용이 안되는 간선일 수 있기 때문이다. 즉, MST 가중치 비교 이외에도 임의의 간선이 MST를 만드는데 사용되는 간선인지 아닌지에 대한 판단이 추가적으로 필요하다.</br>
이를 위해 간선을 제거하는 대신, 해당 간선이 포함된 MST에 대해서 생각해보자. 만약 간선이 MST를 만드는데 사용되는 유사-임계 간선이라면 MST 가중치는 유지될 것이고, 그렇지 않다면 MST 가중치는 기존보다 증가할 것다.

지금까지의 내용을 정리하면 다음과 같다 :
1. 최초 그래프의 MST 가중치를 계산
2. i-th 간선을 제거하고 MST 가중치를 계산하여 임계 간선 판단
	- if) 기존 MST 가중치 < i-th 간선을 제거한 MST 가중치: i-th 간선은 임계 간선임
3. (임계 간선이 아닌 간선에 대해) i-th 간선을 포함하는 MST 가중치를 계산하여 유사-임계 간선 판단
	- if) 기존 MST 가중치 == i-th 간선을 포함한 MST 가중치: i-th 간선은 유사-임계 간선임

이제 문제 해결하기 위해 남은 것은 MST 가중치를 계산하는 일이다. MST 가중치의 계산은 Kruskal 혹은 Prim 알고리즘을 이용하여 계산가능하다.
- Kruskal: 탐욕(Greedy)적인 방법을 이용하여 가장 작은 가중치부터 선택하는 방법
- Prim: 시작 정점부터 시작하여 단계적으로 정점과 인접한 간선중 가장 작은 간선을 선택하는 방법

여기서는 Kruskal 알고리즘을 이용하여 문제를 해결하였다.

## Code

<pre>
<code>
var findCriticalAndPseudoCriticalEdges = function(n, edges) {
    let sortedEdges = [];
    for (let i = 0; i < edges.length; i++) {
        sortedEdges.push([...edges[i], i]);
    }
    sortedEdges = sortedEdges.sort((a, b) => a[2] - b[2]);
    
    const criticalEdges = [],
          pseudoEdges = [];
    
    const mstCost = kruskal(n, sortedEdges, 0, 0);
    
    // find critical and pseudo-critical path
    for (let i = 0; i < sortedEdges.length; i++) {
        const critical = kruskal(n, sortedEdges, i, 0, false),
              pseudo = kruskal(n, sortedEdges, i, sortedEdges[i][2], false);
        
        if (critical > mstCost) {
            // criticalPath
            criticalEdges.push(sortedEdges[i][3]);
        } else if (pseudo == mstCost) {
            // pseudoPath
            pseudoEdges.push(sortedEdges[i][3]);
        }
    }
    
    return [criticalEdges, pseudoEdges];
};

let kruskal = function(n, edges, edgeIdx, initCost, init = true) {
    let ct = Array(n).fill(0).map((val, idx) => idx);
    let totalCost = 0;
    
    if (initCost != 0) {
        totalCost = union(ct, edges[edgeIdx][0], edges[edgeIdx][1], edges[edgeIdx][2]);
    }
    
    edges.forEach((val, idx) => {
        if (!init && idx == edgeIdx) return;
        totalCost += union(ct, val[0], val[1], val[2]);
    });
    
    // 모든 노드가 연결되었는지 확인
    for (let i = 0; i < n-1; i++) {
        if (find(ct, i) != find(ct, i+1)) {
            totalCost = Infinity;
            break;
        }
    }
    
    return totalCost;
}

let find = function(parent, edge) {
    if (edge == parent[edge]) {
        return edge;
    }
    
    return parent[edge] = find(parent, parent[edge]);
}

let union = function(parent, edge1, edge2, cost) {
    // edge1 < edge2
    let a = find(parent, edge1),
        b = find(parent, edge2);
    
    if (a == b) return 0;
    
    parent[b] = a;
    return cost;
}
</code>
</pre>
