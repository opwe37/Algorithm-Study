# 430. Flatten a Multilevel Doubly Linked List

출처 : https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/

## 문제

You are given a doubly linked list which in addition to the next and previous pointers, it could have a child pointer, which may or may not point to a separate doubly linked list. These child lists may have one or more children of their own, and so on, to produce a multilevel data structure, as shown in the example below.

Flatten the list so that all the nodes appear in a single-level, doubly linked list. You are given the head of the first level of the list.

(next, prev 그리고 자식 포인터가 있는 이중 연결 리스트가 주어진다. 자식 또한 이중 연결 리스트의 형태이다. 이 이중 연결 리스트를 평면화 시켜 반환하여라)

## 예제

- Example 1
	```
	Input: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
	Output: [1,2,3,7,8,11,12,9,10,4,5,6]
	```
	![](https://assets.leetcode.com/uploads/2018/10/12/multilevellinkedlist.png)

	After flattening the multilevel linked list it becomes:

	![](https://assets.leetcode.com/uploads/2018/10/12/multilevellinkedlistflattened.png)
	
## 접근방법

- 평탄화를 위해서 임의의 노드에 Child와 Next가 있을 때, Child 먼저 방문 후 Next를 방문해야 함
- Stack을 이용하여 리스트를 순회
	- Push()우선 순위 : Child > Next (next와 child가 존재할 경우 child 노드 먼저 push)
	- Pop() : 해당 노드의 방문을 의미, 방문한 노드의 child와 next를 확인하여 push 우선 순위에 맞게 stack에 push를 수행
	- 초기화 : root 노드
- 위와 같이 Stack을 이용하면서 주어진 리스트를 순회하면서 방문 순서대로 새로운 리스트 생성

## Code
<pre>
<code>
/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function(head) {
    if (head == null) return head;
    
    var stack = [head];
    
    var newList = new Node(null, null, null, null);
    var root = newList;
    
    while (stack.length != 0) {
        var node = stack.pop();
        root.next = node;
        node.prev = root;
        if (node.next != null) stack.push(node.next);
        if (node.child != null) stack.push(node.child);
        node.child = null;
        root = root.next;
    }
    
    newList = newList.next;
    newList.prev = null;
    
    return newList;
};
</code>
</pre>
