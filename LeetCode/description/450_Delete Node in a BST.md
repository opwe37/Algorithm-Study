# 450. Delete Node in a BST

출처: https://leetcode.com/problems/delete-node-in-a-bst/

## 문제

Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

1.  Search for a node to remove.
2.  If the node is found, delete the node.

**Follow up:** Can you solve it with time complexity  `O(height of tree)`?

BST의 루트와 키가 주어지면, BST에서 주어진 키 값을 갖는 노드를 삭제하고 루트 노드를 반환하라.

삭제는 다음 두 단계로 나눌 수 있다:
1. 삭제하고자 하는 노드를 찾는다.
2. 노드를 찾았다면, 노드를 삭제하라.

`O(height of tree)`의 시간복잡도로 이 문제를 풀 수 있는가?

## 예제

![](https://assets.leetcode.com/uploads/2020/09/04/del_node_1.jpg)
```
Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
```
위 예의 경우, 또 다른 답 `[5,2,6,null,4,null,7]`이 존재한다.

![](https://assets.leetcode.com/uploads/2020/09/04/del_node_supp.jpg)

## 접근 방법

이진 탐색 특징에 따라, 주어진 BST에서 키 값이 존재하는지 찾는다. 찾는 방법은 반복문 또는 재귀를 이용하는 등의 방법이 있겠으나, 여기서는 이후 단계에서 삭제하는 과정을 대비하여 재귀 방식으로 구현하고자 한다. 
<pre>
<code>
function solution(root, key) {
	if (key < root.val) {
		root.left = solution(root.left, key);
	} else if (key > root.val) {
		root.right = solution(root.right, key);
	}
	return root
}
</code>
</pre>

BST에서 키를 찾았다면, 해당 키를 삭제하는 작업을 수행해야한다. 이때 노드를 삭제한 이후에도 BST 구조를 유지해야 하므로 찾아진 노드의 상태에 따라 다른 동작을 수행해야 한다. 여기서 노드의 상태란 자식의 수를 이야기 하며, 다음과 같이 3가지 경우로 나뉘게 된다.
1. **리프 노드** 
2. **자식이 하나** 
3. **자식이 두 개** 

만약 리프 노드라면, 단순하게 삭제하는 것으로 해결 가능하다. 또한 자식이 하나인 경우에도 자식을 자신의 부모 노드와 연결하는 것으로 쉽게 해결 가능하다(부모 노드와 연결해야 하는 이 상황때문에 재귀로 구현한 것).
<pre>
<code>
function solution(root, key) {
	if (key < root.val) {
		root.left = solution(root.left, key);
	} else if (key > root.val) {
		root.right = solution(root.right, key);
	} else { // key 노드를 찾음	
		// 리프 노드라면
		if (root.left == null && root.right == null) {
			return null;
		} 
		// 노드의 자식이 하나 라면
		if (root.left == null) {
			return root.right;
		} else if (root.right == null) {
			return root.left;
		}
	}
	return root
}
</code>
</pre>

자식이 두개라면  BST의 규칙을 위배하지 않으면서 현재 노드를 대체할 수 있는 노드를 찾아야한다. 이 대체 노드는 현재 우측 자식보다는 작고, 좌측 자식보다는 큰 값이여야 한다. BST 상에서 현재 노드 다음으로 큰 값 또는 작은 값을 찾으면 된다. 대안 노드를 찾고 난 이후에는 값을 복사하여 현재 노드 위치에 넣고, 현재 노드의 하위 트리에서 대안 노드의 값을 찾아 지워야 한다.
<pre>
<code>
// 대안 노드 찾기
alternative_node = root.right;
while (alternative_node .left) {
	alternative_node = alternative_node.left;
}

// 대안 노드의 값을 복사하여 넣고, 삭제해야 할 값 재설정
root.val = alternative_node.val;
root.right = solution(root.right, root.val);
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|JavaScript|[450.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/450.js)|
|Python3|[450.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/450.py)|
