# 173. Binary Search Tree Iterator

출처 : https://leetcode.com/problems/binary-search-tree-iterator/

## 문제

Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.
(이진 탐색 트리의 반복자를 구현하라. 박복자는 이진탐색트리의 루트노드로 초기화 된다.)

Calling  `next()`  will return the next smallest number in the BST.
(`next()`의 호출은 이진탐색트리에서 다음으로 가장작은 숫자를 반환할 것이다.)

## 예제
![](https://assets.leetcode.com/uploads/2018/12/25/bst-tree.png)
- Example 1
	````
	BSTIterator iterator = new BSTIterator(root);
	iterator.next();    // return 3
	iterator.next();    // return 7
	iterator.hasNext(); // return true
	iterator.next();    // return 9
	iterator.hasNext(); // return true
	iterator.next();    // return 15
	iterator.hasNext(); // return true
	iterator.next();    // return 20
	iterator.hasNext(); // return false
	````

## 접근방법

스택(Stack)과 전위순회(Preorder Traversal) 방식을 사용하여 문제 해결

이진탐색트리의 구조상 왼쪽 자식 노드는 현재 노드보다 작고 오른쪽 자식 노드는 현재 노드보다 크기 때문에 전위순회 방식으로 트리를 탐색 시에 가장 작은 수부터 가장 큰 수까지 오름차순으로 값을 얻을 수 있음

문제에서 원하는 것이 `next()` 호출을 통해서 값을 하나씩 순회하는 것이기 때문에 스택 자료구조를 이용하여 이를 구현함
- 스택은 현재 노드의 왼쪽 자식 노드를 따라가며 단말 노드까지 저장
- next()가 호출될때 스택에서 pop()하고, 해당 값을 반환
- 또한 pop()이 수행될 때, 해당 노드의 오른쪽 자식 노드를 대상으로 하여 1번 과정을 수행

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
 */
var BSTIterator = function(root) {
    this.stack = [];

    let node = root;
    while (node != null) {
        this.stack.push(node);
        node = node.left;
    }
};

/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    let result = this.stack.pop();
    
    let node = result.right;
    while (node != null) {
        this.stack.push(node);
        node = node.left;
    }
    return result.val;
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.stack.length > 0 ? true : false;
};
</code>
</pre>
