# 111. Minimum Depth of Binary Tree

출처: https://leetcode.com/problems/minimum-depth-of-binary-tree/

## 문제

### 번역

주어진 이진 트리에서 최소 깊이를 찾아라.

최소 깊이는 루트에서 최근 거리 단말 노드까지의 가장 짧은 경로의 노드의 수 이다.

### 원문

Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

**Note:** A leaf is a node with no children.

## Example
![](https://assets.leetcode.com/uploads/2020/10/12/ex_depth.jpg)
```
Input: root = [3,9,20,null,null,15,7]
Output: 2
```

## 접근 방법

트리의 탐색 기법인 **BFS**를 이용한 문제 해결. DFS로 탐색을 한다고 하면, 트리를 전부 탐색해야 어떤 단말 노드가 가장 짧은 경로인지 알 수있기 때문에 이 문제에서는 비효율적인 방법이라고 생각.

아래 코드는 BFS 방식으로 이진 트리를 탐색하는 코드이다.
<pre>
<code>
const queue = [root];
while (queue.length != 0) {
	const child_queue = [];
	for (let i = 0; i < queue.length; i++) {
		if (queue[i].left || queue[i].right) {
			if (queue[i].left) child_queue.push(queue[i].left);
			if (queue[i].right) child_queue.push(queue[i].right);
		}
	}
	queue = child_queue;
}
</code>
</pre>

먼저, 이 코드에서 현재 서치 중인 노드의 깊이를 알 수 있도록 변수(cur_depth)를 추가한다.

<pre>
<code>
const queue = [root];
let cur_depth = 0;
while (queue.length != 0) {
	const child_queue = [];
	for (let i = 0; i < queue.length; i++) {
		...
	}
	queue = child_queue;
	cur_depth += 1;
}
</code>
</pre>

이후, 탐색 종료 조건인 단말노드 여부를 체크하고, 단말 노드라면 현재 깊이를 반환하는 코드 추가
<pre>
<code>
const queue = [root];
let cur_depth = 0;
while (queue.length != 0) {
	const child_queue = [];
	for (let i = 0; i < queue.length; i++) {
		if (!queue[i].left && !queue[i].right) {
			return cur_depth;
		}
		...
	}
	queue = child_queue;
	cur_depth += 1;
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|Javascript|[111.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/111.js)|
