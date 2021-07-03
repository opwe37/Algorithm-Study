# 700. Search in a Binary Search Tree
출처: https://leetcode.com/problems/search-in-a-binary-search-tree/

## 문제

You are given the  `root`  of a binary search tree (BST) and an integer  `val`.

Find the node in the BST that the node's value equals  `val`  and return the subtree rooted with that node. If such a node does not exist, return  `null`.

이진탐색트리(BST)의 `root`와 정수 `val`가 주어진다.

BST에서 노드의 값이 `val`와 동일한 노드를 찾고 그 서브트리의  루트를 반환하라. 만약 존재하지 않는다면 `null`을 반환하라.

## 예제
![](https://assets.leetcode.com/uploads/2021/01/12/tree1.jpg)
```
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]
```

## 접근 방법

이진 탐색 트리 : 왼쪽 자식은 루트보다 작고, 오른쪽 자식을 루트보다 큰 값으로 이루어진 트리

주어진 `val`와 현재 노드의 값과의 비교를 통해서 `val`이 더 크다면 오른쪽으로, 작다면 왼쪽으로 이동하면서 값을 비교해 나가도록 해야 한다. 
탐색 도중 동일한 노드를 찾게 된다면, 그 노드를 반환하고 리프노드까지 탐색을 마쳤지만 동일한 노드가 없다면 `null`을 반환하게 해야 한다.
<pre>
<code>
function find(root, val) {
	if (root == null) return null;
	
	node = root
	if (val < node.val) {
		node = node.leftChild;
	} else if (val > node.val) {
		node = node.rightChild;
	} else {
		return node;
	}
	return find(node, val)
}
</code>
</pre>
위의 재귀호출 방식으로 설명한 접근 방법을 구현한 결과이다.

## Full Code
|language|url|
|--------|---|
|JavaScript|[700.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/700.js)|
