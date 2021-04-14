# 876. Middle of the Linked List

출처: https://leetcode.com/problems/middle-of-the-linked-list/

## 문제

### 번역

단방향 연길 리스트의 헤드 노드 `head`가 주어지면, 연결리스트의 중간 노드를 반환하라.

만약, 중간 노드가 두개라면, 두번째 중간 노드를 반환하라.

### 원문

Given a non-empty, singly linked list with head node  `head`, return a middle node of linked list.

If there are two middle nodes, return the second middle node.

## Example
```
Input: [1,2,3,4,5]
Output: Node 3 from this list (Serialization: [3,4,5])
The returned node has value 3.  (The judge's serialization of this node is [3,4,5]).
Note that we returned a ListNode object ans, such that:
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, and ans.next.next.next = NULL.
```
```
Input: [1,2,3,4,5,6]
Output: Node 4 from this list (Serialization: [4,5,6])
Since the list has two middle nodes with values 3 and 4, we return the second one.
```

## 접근 방법

일반적으로 생각할 수 있는 방법은 두번의 리스트 탐색을 통한 방법이다. 첫번째 탐색에서 리스트의 길이를 알아내고, 두번째 탐색에서 리스트의 중간 위치에 접근하여 값을 가져오는 방식이다. 
<pre>
<code>
function solution(head) {
	let node = head,
		list_size = 0;
	while (node != null) {
		node = node.next;
        list_size += 1;
	}
    
	let middle_idx = Math.floor(list_size / 2);
	node = head;
	for (let i = 0; i < middle_idx; i++) {
		node = node.next;
	}
	return node;
}
</code>
</pre>

연결리스트를 배열로 변환하는 방식도 생각해볼 수 있다. 배열이라면 인덱스 접근을 통해서 별도의 탐색이 필요없기 때문이다. 단, 반환 형태가 노드임을 감안해서 배열에 삽입되는 것은 노드의 값이 아닌 노드 그 자체이여야 한다.
<pre>
<code>
function solution(head) {
	let node = head;
	const arr = [];
	while (node != null) {
		arr.push(node);
		node = node.next;
	}
    
	return arr[Math.floor(arr.length / 2)];
}
</code>
</pre>

마지막으로 언급할 방법은 `Slow-Fast Runner`(혹은 `Slow-Fast Pointer`) 기법을 이용하는 것이다. 이 알고리즘은 자료구조에서 싸이클 여부를 체크하기 위한 방법으로 소개되곤 하는 기법이다. 두개의 포인터를 사용하는 것이 특징인 알고리즘으로, `slow pointer`는 한번에 한 칸씩 움직이고, `fast pointer`는 한번에 두칸씩 움직이게 한다. 이와 같이 두 포인터가 이동하는 거리의 차이로 인해 `fast pointer`가 끝에 다다르게 되면, `slow pointer`는 해당 자료구조의 중간에 위치하게 되는 것이다.

<pre>
<code>
function solution(head){
	let slow = head,
		fast = head;
	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;
	}
	return slow;
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|Javascript|[876.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/876.js)|
