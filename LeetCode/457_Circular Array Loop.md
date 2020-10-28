# 457. Circular Array Loop

출처 : https://leetcode.com/problems/circular-array-loop/

## 문제

You are given a  **circular**  array  `nums`  of positive and negative integers. If a number  _k_  at an index is positive, then move forward  _k_  steps. Conversely, if it's negative (-_k_), move backward  _k_ steps. Since the array is circular, you may assume that the last element's next element is the first element, and the first element's previous element is the last element.
(양과 음의 정수를 갖는 원형 배열 `nums`가 주어진다. 인덱스 k가 양수라면 시계방향으로 k만큼 움직이고 반대로 음수 (-k)라면 k만큼 반시계 방향으로 움직인다. 배열이 원형이기 때문에 배열의 마지막 요소 다음에는 배열의 첫 요소가 위치해있고 첫 요소 이전 요소는 마지막 요소이다.)

Determine if there is a loop (or a cycle) in  `nums`. A cycle must start and end at the same index and the cycle's length > 1. Furthermore, movements in a cycle must all follow a single direction. In other words, a cycle must not consist of both forward and backward movements.
(`nums`에 사이클이 있는지 확인하라. 사이클은 처음과 끝이 같은 인덱스이며 길이는 1보다 크다. 게다가, 사이클에서의 방향은 한 방향이다. 다른 말로 표현하면, 사이클은 시계 방향 그리고 반 시계 방향 모두를 포함하고 있지 않다.)

## 예제

- Example 1
	```
	Input: [2,-1,1,2,2]
	Output: true
	Explanation: There is a cycle, from index 0 -> 2 -> 3 -> 0. The cycle's length is 3.
	```
- Example 2
	```
	Input: [-1,2]
	Output: false
	Explanation: The movement from index 1 -> 1 -> 1 ... is not a cycle, because the cycle's length is 1. By definition the cycle's length must be greater than 1.
	```
## 접근방법

배열의 어떤 요소가 사이클의 시작점인지 알 수 없기 때무에 배열의 모든 요소가 한번씩 시작점이 되도록 지정하고 사이클 발생 여부를 확인하는 방식

사이클을 찾기 위해 Floyd's Slow and Fast Pointers 방식을 사용하였음
- 해당 방식은 한 스텝당 하나의 요소씩 이동하는 Slow Pointer와 두 요소씩 이동하는 Fast Pointer를 사용
- 한 스텝이 지날때 마다 slow와 fast는 점점 더 멀어짐
- 하지만, 사이클이 존재한다면 fast와 slow가 같게 되는(혹은 따라잡는) 순간이 존재함

Pointer(다음 인덱스)를 지정하는 방식은 다음과 같음
- nextPointer = (currentPointer + nums[currentPointer]) % nums.length
- if (nextPointer < 0) nextPointer += nums.length

NextPointer를 찾을 때마다 다음 두 가지 사항을 고려
- 시작 지점에서의 방향과 nextPointer의 방향이 다르다면 사이클이 아님 (사이클은 한 방향으로만 이동해야 하므로)
- currentPointer와 nextPointer가 같다면 사이클이 아님 (사이클의 길이는 1보다 커야 하므로)

## Code
<pre>
<code>
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var circularArrayLoop = function(nums) {
    const n = nums.length;
    var isCycle = false;
    for (let start = 0; start < n; start++) {
        let fast = start,
            slow = start;
        isCycle = false;
        let dir = nums[start] > 0 ? 1 : 0;
        while (true) {
            fast = getNextIdx(nums, dir, fast);
            slow = getNextIdx(nums, dir, slow);
            if (fast != -1) {
                fast = getNextIdx(nums, dir, fast);
            }
            
            if (fast == -1 || slow == -1) break;
            if (fast != -1 && fast == slow) {
                isCycle = true;
                break;
            }
        }
        if (isCycle) break;
    }
    
    return isCycle;
};

var getNextIdx = function(nums, dir, curIdx) {
    var idxDir = nums[curIdx] > 0 ? 1 : 0;
    if (idxDir != dir) return -1;
    
    var nextIdx = (curIdx + nums[curIdx]) % nums.length;
    if (nextIdx < 0) nextIdx += nums.length;
    
    if (curIdx == nextIdx) return -1;
    
    return nextIdx;
}
</code>
</pre>
