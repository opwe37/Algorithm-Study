# 1579. Remove Max Number of Edges to Keep Graph Fully Traversable

출처 : https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/

## 문제
Alice and Bob have an undirected graph of `n` nodes and 3 types of edges:
(Alice와 Bob은 `n`개의 노드와 3 유형의 간선을 갖는 무방향 그래프를 갖고 있다.)
-   Type 1: Can be traversed by Alice only. (유형 1 : 오직 Alice만이 갈 수 있는 길)
-   Type 2: Can be traversed by Bob only. (유형 2 : 오직 Bob만이 갈 수 있는 길)
-   Type 3: Can by traversed by both Alice and Bob. (유형 3 : Alice 와 Bob, 둘 다 갈 수 있는 길)

Given an array `edges` where `edges[i] = [typei, ui, vi]` represents a bidirectional edge of type `typei` between nodes `ui` and `vi`, find the maximum number of edges you can remove so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.
(`edges`의 배열이 주어질 때, 제거 가능한 간선의 최대 수를 찾아라. 단, 간선이 제거된 후에도 Alice와 Bob은 모든 노드를 여행할 수 있어야한다.  `edges[i] = [typei, ui, vi]`는 노드 `ui`와 `vi`사이 유형 `typei`의 양방향 간선을 의미합니다. )

Return  _the maximum number of edges you can remove, or return_  `-1`  _if it's impossible for the graph to be fully traversed by Alice and Bob._
(제거 가능한 간선의 최대 수를 반환하거나 Alice와 Bob이 모든 노드를 방문할 수 없을때 -1을 반환하라)

## 예제
![](https://assets.leetcode.com/uploads/2020/08/19/ex1.png)
- Example 1
	```
	Input: n = 4, edges = [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]
	Output: 2
	Explanation: If we remove the 2 edges [1,1,2] and [1,1,3]. 
	The graph will still be fully traversable by Alice and Bob. 
	Removing any additional edge will not make it so. 
	So the maximum number of edges we can remove is 2.
	```
	
## 접근방법

1. 주어진 그래프에서 삭제하는 방식이 아닌, 노드만 주어진 그래프에서 간선을 추가하는 형식으로 진행
2. Alice와 Bob을 따로 따로 고려 : 그래프 두개를 그린다고 생각
3. 유형 3 간선을 최우선으로 고려 (간선 우선 순위 3 > 1 = 2)
 
노드간의 연결은 Union-Find 알고리즘을 사용
- Union-Find 알고리즘을 통해 사이클 구조가 생기는 것을 방지
- 모든 노드를 연결하는데 불필요한 간선을 식별할 수 있음

위에서 언급한 바와 같이 노드 연결 작업은 Alice와 Bob이 따로 진행되지만, 그 결과는 한 곳에 저장하여 최종적으로 어떤 간선들이 살아남아야 하는지 기억. 또한 n개의 노드를 연결하기 위해서는 n-1개의 간선이 필요함을 이용하여 Alice와 Bob이 모든 노드를 갈 수 있는지 확인할 수 있도록 해야 함
 
## Code
<pre>
<code>
var maxNumEdgesToRemove = function(n, edges) {
    var Alice_UnionFind = Array(n).fill(0).map((val, idx) => idx);
    var Bob_UnionFind = Array(n).fill(0).map((val, idx) => idx);
    
    var addEdges = [];
    var Alice_numOfEdges = 0, Bob_numOfEdges = 0;
    
    for (let edge of edges) {
        edge[1]--;
        edge[2]--;
        
        if (edge[0] == 3) {
            let isAdd = false;
            if (uion(Alice_UnionFind, edge[1], edge[2])) {
                isAdd = true;
                Alice_numOfEdges++;
            }
            
            if (uion(Bob_UnionFind, edge[1], edge[2])) {
                isAdd = true;
                Bob_numOfEdges++;
            }
            
            if (isAdd) {
                addEdges.push(edge);
            }
        }
    }
    
    for (let edge of edges) {
        if (edge[0] == 1) {
            if (uion(Alice_UnionFind, edge[1], edge[2])) {
                addEdges.push(edge);
                Alice_numOfEdges++;
            }
        } else if (edge[0] == 2) {
            if (uion(Bob_UnionFind, edge[1], edge[2])) {
                addEdges.push(edge);
                Bob_numOfEdges++;
            }
        }
    }
    
    if (Alice_numOfEdges != n-1 || Bob_numOfEdges != n-1) return -1
    
    return edges.length - addEdges.length;
};

var findParent = function(arr, idx) {
    if (arr[idx] != idx) {
        arr[idx] = findParent(arr,arr[idx]);
    }
    return arr[idx]; 
}

var uion = function(arr, u, v) {
    var uParent = findParent(arr, u),
        vParent = findParent(arr, v);
    if (uParent == vParent) return false;
    
    arr[vParent] = uParent;
    return true;
}
</code>
</pre>
