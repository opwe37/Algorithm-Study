# 515. Find Largest Value in Each Tree Row
출처 : https://leetcode.com/problems/find-largest-value-in-each-tree-row/

## 문제

Given the `root` of a binary tree, return _an array of the largest value in each row_ of the tree **(0-indexed)**.
(이진트리의 `root`가 주어지면, 트리의 각 줄에서 가장 큰 값을 배열로 반환하라)

## 예제

- Example 1 
	![](https://assets.leetcode.com/uploads/2020/08/21/largest_e1.jpg)
	```
	Input: root = [1,3,2,5,3,null,9]
	Output: [1,3,9]
	```
- Example 2
	```
	Input: root = []
	Output: []
	```

## 접근 방법

BFS로 트리를 탐색하면서 각 줄의 최대 값을 찾아 저장

BFS 방식으로 트리를 탐색하는 중간 과정을 살펴보면 임의의 어떤 순간이든 Queue는 최대 두 행의 노드만을 포함하는 것을 알 수 있다.

예제 1의 트리를 예로 들면 다음과 같다.
```
1. BFS에 사용될 큐 초기화
queue = [1]
// 1 = root.val

2. 큐의 프론트를 추출하고, 그 자식들을 큐에 삽입하는 과정을 반복
queue = [3, 2], row = 2행에 위치한 노드
queue = [2, 5, 3], row = 2, 3행에 위치한 노드
queue = [5, 3, 9], row = 3행에 위치한 노드
queue = [3, 9], row = 3행에 위치한 노드
queue = [9], row = 3행에 위치한 노드
queue = [], row = 3행에 위치한 노드
```
이때 [3, 2] 에서 [2, 5, 3], [5, 3, 9]로 바뀌는 과정만을 자세히보면, 2행의 첫 노드가 빠지면서 그 자식인 3행의 노드가 최초로 삽입되고, 2행의 마지막 노드인 2가 빠지면서 3행의 마지막 노드가 삽입되는 것을 볼 수 있다. 이것을 이용하여 큐 내에서 행들을 구분할 수가 있음.

행의 구분이 가능해졌기 때문에 각 행에서 최대값을 찾아내는 것은 쉬움

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
 * @return {number[]}
 */
var largestValues = function(root) {
    if (root == null) return [];
    
    var queue = [root];
    var num = 1;
    
    var max = null;
    var answer = [];
    while (queue.length != 0) {
        let node = queue.shift();
        num--;
        if (node.left != null) queue.push(node.left);
        if (node.right != null) queue.push(node.right);
        
        if (max == null) {
            max = node.val;
        }
        
        if (max < node.val) {
            max = node.val;
        }
        
        if (num == 0) {
            num = queue.length;
            answer.push(max);
            max = null;
        }
    }
    return answer;
};
</code>
</pre>
