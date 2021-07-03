# 513. Find Bottom Left Tree Value

출처 : https://leetcode.com/problems/find-bottom-left-tree-value/

## 문제

Given a binary tree, find the leftmost value in the last row of the tree.
(주어진 이진트리에서 마지막 줄의 가장 왼쪽 값을 찾아라.)

## 예제

- Example 1
	```
	Input:

	    2
	   / \
	  1   3

	Output:	1
	```
- Example 2
	```
	Input:

	        1
	       / \
	      2   3
	     /   / \
	    4   5   6
	       /
	      7

	Output:	7
	```

## 접근 방법

트리의 최하단에 도착하기 위해서 어떤 노드를 따라 가야하는지 불명확하기 때문에 모든 노드를 탐색해야한다고 생각하고 접근함

트리를 탐색함에 있어 DFS 또는 BFS 방식을 떠올릴 수 있고,  BFS를 사용하여 문제를 해결하고자 하였음
기본적인 BFS 방식을 따라가지만, 어떤 노드들이 같은 레벨에 위치하고 있는지 체크하고 같은 레벨에 위치한 노드 중 맨 왼쪽 노드는 무엇인지 지속적으로 체크

## Code
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
var findBottomLeftValue = function(root) {
    var answer = root.val;
    var queue = [root];
    var num = 1;
    while (queue.length != 0) {
        const node = queue.shift();
        if (node.left != null) {queue.push(node.left);}
        if (node.right != null) {queue.push(node.right);}
        num--;
        
        if (num == 0 && queue.length != 0) {
            num = queue.length;
            answer = queue[0].val;
        }
    }
    return answer;
};
</code>
</pre>
