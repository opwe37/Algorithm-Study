# 334. Increasing Triplet Subsequence

출처: https://leetcode.com/problems/increasing-triplet-subsequence/

## 문제

Given an integer array `nums`, return `true` _if there exists a triple of indices_ `(i, j, k)` _such that_ `i < j < k` _and_ `nums[i] < nums[j] < nums[k]`. If no such indices exists, return `false`.

정수 배열 `nums`를 입력받아서 `i < j < k`이고 `nums[i] < nums[j] < num[k]`인 인덱스 `(i, j, k)`가 존재한다면 `true` 반환하라. 만약 존재하지 않는다면 `false`를 반환하라.

## Example
```
Input: nums = [1,2,3,4,5]
Output: true
Explanation: Any triplet where i < j < k is valid.
```
```
Input: nums = [5,4,3,2,1]
Output: false
Explanation: No triplet exists.
```
```
Input: nums = [2,1,5,0,4,6]
Output: true
Explanation: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 4 < nums[5] == 6.
```
## 접근 방법

2가지 방법에 대해서 소개한다.

첫 번째 방식은 가능한 모든 경우의 수를 체크해보는 방식이다. nums의 사이즈를 n이라고 할 때, 인덱스 0부터 n-1까지 돌면서 아래의 규칙에 따라 스택을 만들어나감. 
- 스택을 저장할 배열(arr_stacks)을 선언
- arr_stacks를 순회하면서 인덱스 i의 원소가 삽입될 수 있는 stack을 탐색
	- 만약, arr_stacks[j]'s top < nums[i]면, arr_stacks[j]에 값을 삽입하고 다음 스택도 삽입 가능한지 체크
	- 만약, arr_stacks[j]'s top > nums[i]고 top아래의 요소보다는 크다면, top을 교체하고 다음 스택 체크
- 진행 도중에 arr_stacks[j]의 사이즈가 3이 되는 상황을 만나면 true를 반환. 그렇지 못했다면 false를 반환

<pre>
<code>
arr_stacks = new Array();
for (i = 0; i < n; i++) {
	num = nums[i];
	insert_chk = false;
	for (j = 0; j < arr_stacks.length; j++) {
		stack = arr_stacks[j]
		// 삽입
		if (stack [stack .length -1] < num) {
			stack.push(num);
			insert_chk = true;
			if (stack.size == 3) return true;
			continue;
		}
		// 교체
		if (stack.length == 1 && stack[stack.length -1] > num) {
			stack[0] = num;
			insert_chk = true;
		} else if (stack[stack.length -1] > num && stack[stack.length -2] > num) {
			stack[stack.length-1] = num;
			insert_chk = true;
		}
	}
	// 모든 stack을 확인했지만, 한번도 삽입 혹은 교체가 없었던 경우
	if (!insert_chk) {
		arr_stacks.push([num]);
	}
}
</code>
</pre>

위와 같은 코드로 주어진 테스트케이스는 모두 통과할 수 있었지만, 다른 사람의 풀이법에 비해 시간과 공간 측면에서 모두 효율적이지 못한 결과를 얻었다. 이에 다른 사람의 풀이를 참고한 아래의 접근방법을 소개한다.

<pre>
<code>
function solution(nums) {
	small_val = Infinity;
	second_small_val = Infinity;
	for (i = 0; i < n; i++) {
		if (small_val >= nums[i]) small_val = nums[i];
		else if (second_small_val > nums[i]) second_small_val = nums[i];
		else if (second_small_val < nums[i]) return true;
	}
	return false
}
</code>
</pre>

위 코드는 두개의 변수를 활용하여 `small_val < second_small_val`을 보장하면서 가능한 작은 값을 갖도록 되어있다. 또한 `second_small_val` 보다 큰 값이 등장하는 순간 `true`를 반환하는 것을 볼 수 있다.

여기까지 보았을 때 드는 의문점은 `small_val`가 가르키는 인덱스를 `i`, `second_small_val`을 가르키는 인덱스를 `j`라 할 때, `i < j` 보장여부 이다. 

아래의 상황을 생각해보자.
```
small_val = nums[a]
second_small_val = nums[b]

- nums[c] <= small_val인 c가 있다고 가정하면: 
	- small_val = nums[c], second_small_val = nums[b]
	- a, b, c의 관계: a < b < c, nums[c] < nums[a] < nums[b]
	- small_val의 변경으로 인해 문제에서 요구하는 관계를 유지하지 못하는 것으로 비춰짐

- 이후, nums[d] > second_small_val 케이스가 있다고 가정아래 a, b, c, d의 관계를 보면:
	- a < b < c < d 이고 nums[c] < nums[a] < nums[b] < nums[d]가 된다.
	- (a, b, d)에서 문제에서 요구하는 관계를 찾을 수 있음.
```
결국, `second_small_val` 입장에서 `small_val`이 바뀌는 것은 결과에 어떤 영향도 끼치지 않는다는 것을 알 수 있다.

## Full Code
|language|url|
|--------|---|
|Javascript|[334.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/334.js)|
