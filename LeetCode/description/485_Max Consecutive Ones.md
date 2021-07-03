# 485. Max Consecutive Ones

출처: https://leetcode.com/problems/max-consecutive-ones/

## 문제

### 번역

이진 배열 `nums`에서 _최대 연속 _`1`_ 의 수_ 를 반환하라.

### 원문

Given a binary array `nums`, return _the maximum number of consecutive_ `1`_'s in the array_.

## Example
```
Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
```
```
Input: nums = [1,0,1,1,0,1]
Output: 2
```
## 접근 방법

가장 먼저 떠올릴 수 있는 방법은 `max_count`와 `local_count` 선언하여 `nums`를 탐색하면서 `local_count`를 갱신하고 연속된 `1`이 끝나는 순간에 `max_count`와 비교를 하는 방법이 있다.
<pre>
<code>
let max_count= 0;
let local_count = 0;
let pre = 1;
for (let num of nums) {
	if (pre && num) local_count += 1;
	pre = num;
	if (num == 0) {
		pre = 1;
		max_count = Math.max(max_count, local_count );
		local_count = 0;
	}
}
global_max = Math.max(max_count, local_count );
</code>
</pre> 
위 코드에서 특이한(?) 점은 현재 관찰 값(`num`) 이전의 값을 저장하는 `pre` 변수의 초기값 `1`인 것이다. 이것은 `local_count`의 증가 조건을 보면 이해가 가능하다. `1`이 연속해서 나왔다는 것을 체크하기 위해 이전과 현재 값의 비교를 통해 `local_count`를 증가시키도록 하였는데, 이 조건에서의 문제는 `1`이 한번만 나왔을 때는 체크하지 못한다는 것이고 이를 예방하기 위해 `pre`의 값을 `1`로 초기화한 것이다.

다음으로는 **슬라이딩 윈도우** 방법으로 접근할 수 있다. `nums`를 탐색하면서 `1`일 때는 윈도우를 늘리고, `0`을 만나면 윈도우를 줄이는 방식으로 연속된 `1`의 수를 체크하는 것이다.
<pre>
<code>
let l = 0;
for (let r = 0; r < nums.length; r++) {
	if (nums[r] == 0) {
		l = r + 1;
	} else {
		result = Math.max(result, r - l + 1);
	}
}
</code>
</pre>
`l` 변수가 윈도우의 시작, `r` 변수가 윈도우의 끝을 가르킨다. 반복문을 통해 `r`을 0부터 증가시켜가며 윈도우의 사이즈를 키우는 작업을 수행하는데, 이때 `0`을 만나게 되면 `l`을 이동시켜 윈도우 안에는 `1`만 유지되도록 사이즈를 조절하는 것이다. 이때, `l`이 `r+1`의 위치로 이동하는데, 이는 현재 `r` 위치에는 `0`이 있기 때문이다.

마지막 방법으로는 값들을 누적시키는 방법이다. 코드 먼저 보면 아래와 같다.
<pre>
<code>
result = nums[0] == 1 ? 1 : 0;
for (let i = 1; i < nums.length; i++) {
	if (nums[i] == 1) {
		nums[i] += nums[i-1];
	}
	result = Math.max(result, nums[i]);
}
</code>
</pre>
`nums` 배열을 탐색하면서 값이 `1`인 위치를 발견하면 자신과 이전의 값을 더하여 계속해서 누적해나가는 것이다. 값이 `0`인 곳에서는 더하지 않기 때문에 `0` 그대로의 값이 유지되므로 결과적으로 연속되어 `1`이 나오는 범위의 끝 위치에는 그 길이가 저장된다. 위 코드에서는 모든 순간에 그 값을 체크하도록 했지만, 최종적으로 마지막 순간에 배열을 재 탐색하며 가장 큰 값을 가져오도록 해도 된다.

## Full Code
|language|url|
|--------|---|
|Javascript|[485.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/485.js)|
