# 206. Reverse Linked List

출처 : https://leetcode.com/problems/reverse-linked-list/

## 문제

Reverse a singly linked list.
(단일 연결리스트를 뒤집어라)

## 예제

- Example 1
	```
	Input: 1->2->3->4->5->NULL
	Output: 5->4->3->2->1->NULL
	```
	
## 접근방법

다음의 방식들로 해결이 가능 (이외에 여러 방법이 있을거라 생각함)
1. stack을 이용하여 원 리스트의 순서대로 push하고, pop을 하면서 새로운 리스트를 만드는 방법 가능
2. 결과 리스트를 하나 만들고, 원 리스트를 순서대로 읽으면서 값을 가져와 새로운 노드를 생성후 결과 리스트의 next로 설정하는 방식(기존 결과 리스트의 next는 새로 만들어진 노드의 next로 설정)

## Code
<pre>
<code>
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    var root = new ListNode();
    var point = head;
    while (point != null) {
        let newNode = new ListNode(point.val);
        newNode.next = root.next;
        root.next = newNode;
        point = point.next;
    }
}
</code>
</pre>
