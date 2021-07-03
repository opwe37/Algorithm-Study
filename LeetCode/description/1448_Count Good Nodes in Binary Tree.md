# 1448. Count Good Nodes in Binary Tree

출처 : https://leetcode.com/problems/count-good-nodes-in-binary-tree/

## 문제

Given a binary tree  `root`, a node  _X_  in the tree is named **good**  if in the path from root to  _X_  there are no nodes with a value  _greater than_  X.
(이진 트리 `root`가 주어지면 루트에서 노드 _X_ 까지 _X_ 보다 더 큰 값을 갖는 노드가 존재하지 않는다면 해당 노드 _X_ 를 **good**이라고 부름)

Return the number of  **good**  nodes in the binary tree.
(이진 트리에서 **good**노드의 수를 반환하라)

## 예제
- Example 1
![](https://assets.leetcode.com/uploads/2020/04/02/test_sample_1.png)
	````
	Input: root = [3,1,4,3,null,1,5]
	Output: 4
	````

- Example 2
![](https://assets.leetcode.com/uploads/2020/04/02/test_sample_2.png)
	````
	Input: root = [3,3,null,4,2]
	Output: 3
	````

## 접근방법

DFS(Depth-First Search)방법을 통해 해결 가능

> 이진 트리는 이미 정의가 되어 입력으로 주어질  root를 통해 트리 탐색이 가능. 입력으로 주어질 값은 말 그대로 root 노드. 즉, 오브젝트 형태!!
- 서치 방법에는 BFS, DFS 등 여러 방식이 존재하겠지만, 현재 문제에서는 DFS 방식을 사용
- 깊이 우선으로 탐색하면서 지나온 경로에서의 최대값을 기억하도록 하고
- 현재 도달한 노드가 기억하고 있는 최대값보다 크다면 good노드의 수를 증가시키고, 최대값 변경

## code
<pre>
<code>
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var goodNodes = function(root) {
    let count = 0;
    const dfs = (node, preMax) => {
        if (!node) return;
        if (preMax <= node.val) count++;
        dfs(node.left, Math.max(preMax, node.val));
        dfs(node.right, Math.max(preMax, node.val));
    }
    dfs(root, -Infinity);
    return count;
};
</code>
</pre>
