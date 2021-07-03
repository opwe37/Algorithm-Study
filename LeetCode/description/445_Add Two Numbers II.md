# 445. Add Two Numbers II

출처 : https://leetcode.com/problems/add-two-numbers-ii/

## 문제

You are given two  **non-empty**  linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
(양의 정수를 지닌 두 연결 리스트가 주어진다. 리스트의 각 노드에는 단일 숫자가 들어있다. 두 정수를 더하고 그 값을 연결 리스트에 담아 반환하라.)

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

## 예제
- Example 1
	````
	Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
	Output: 7 -> 8 -> 0 -> 7
	````

## 접근방법

두 숫자를 더하기 위하여 주어진 입력 l1, l2를 뒤집을 필요가 있음.

예를 들어, 135은 1 => 3 => 5 순으로 리스트에 입력되어 있는데, 이를 5 => 3 => 1 순으로 재정렬해야 계산이 편할 것이라 생각

재정렬한 리스트를 대상으로 각 자리의 수를 더하여 결과 리스트의 root를 갱신하도록 한다(더하는 것은 1의 자리부터 이지만, 결과는 정상적인 순서로 표현해야하므로 root를 갱신하는 것). 이 때, 더해진 값이 10보다 크다면 이를 다음 자리수 계산에 반영해줘야 함을 잊지말자

## code
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
ListNode.prototype.reverse = function () {
    if (this.next == null) {
        return new ListNode(this.val);
    }
    
    var reverse_list = this.next.reverse();
    reverse_list.add(this.val);
    
    return reverse_list;
}

var addTwoNumbers = function(l1, l2) {    
    var l1_digit = l1.reverse(),
        l2_digit = l2.reverse();
    
    var answer = null;
    var carry = 0;
    while (l1_digit != null || l2_digit != null || carry) {
        let digit_sum = (l1_digit == null ? 0 : l1_digit.val) + (l2_digit == null ? 0 : l2_digit.val) + carry;
        
        carry = digit_sum >= 10 ? 1 : 0;
        
        var tmp = new ListNode(digit_sum % 10);
        tmp.next = answer;
        answer = tmp;
        
        l1_digit = l1_digit == null ? null : l1_digit.next;
        l2_digit = l2_digit == null ? null : l2_digit.next;
    }
    
    return answer;
};
</code>
</pre>
