# 632. Smallest Range Covering Elements from K Lists
출처: https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/

## 문제

You have  `k`  lists of sorted integers in  **non-decreasing order**. Find the  **smallest**  range that includes at least one number from each of the  `k`  lists.

We define the range  `[a, b]`  is smaller than range  `[c, d]`  if  `b - a < d - c`  **or**  `a < c`  if  `b - a == d - c`.

**오름차순**으로 정렬된 `k`개의 리스트가 있다. `k`개의 리스트의 원소가 최소 한개 포함되는 **가장 작은** 범위를 찾아라.

범위 `[a, b]`는 만약 `b - a < d - c` 또는 `b - a == d - c`라면 `a < c`인 `[c, d]`보다 더 작은 범위이다.

## 예제
```
Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
```

## 접근 방법

주어진 `k`개의 리스트가 모두 오름차순으로 정렬되어 있음을 이용하였다.

문제에서 찾고자 하는 범위는 주어진 `k`개의 리스트의 원소가 최소 한개는 포함되는 범위이기 때문에 최초 범위를 `k`개의 리스트의 0 인덱스가 포함되는 범위로 설정한다. 범위를 찾기 위해서는 선택된 `k`개 원소에서 최소 값과 최대 값을 찾아야 할 것이다.
<pre>
<code>
// pointer : 현재 각 리스트에서 몇 번째 요소가 선택되어 있는지를 저장
// low, high : 리스트에서 선택된 요소 중 몇 번재 리스트가 최소 혹은 최대 값을 갖고 있는지를 저장
pointer = Array(k).fill(0);
low = 0;
high = 0;
for (i = 0; i < k; i++) {
	if (nums[low][pointer[low]]> nums[i][pointer[i]]) {
		low = i;
	}
	if (nums[high][pointer[high]]< nums[i][pointer[i]]) {
		high = i;
	}
}
</code>
</pre>

최초 구한 범위를 어떻게 갱신할 것인지 생각해보자. 각 리스트의 값을 가르키고 있는 포인터 배열의 값을 이동 시켜야 할텐데, 어떤 값을 이동시켜야 하는지 생각해보면 현재 가장 작은 값을 가르키고 있는 리스트의 포인터를 이동시켜야 한다. 이유는 다른 포인트를 이동시킨다면 각 리스트가 오름차순으로 정렬되어 있기 때문에 범위는 커지기만 할 것이다(범위의 최소값은 고정되어 있기 때문).

<pre>
<code>
pointer = Array(k).fill(0);
while (true) {
	low = high = 0;
	for (i = 0; i < k; i++) {
		if (nums[low][pointer[low]]> nums[i][pointer[i]]) {
			low = i;
		}
		if (nums[high][pointer[high]]< nums[i][pointer[i]]) {
			high = i;
		}
	}
	pointer[low] += 1;
	if (pointer[low] >= nums[low].length) {
		break;
	}
}
</code>
</pre>

구해진 범위와 현재 알고 있는 범위와 비교를  통해 더 작은 범위로 갱신하는 작업이 필요할 것이다.
<pre>
<code>
global_min = Infinity;
global_max = 0;

while (true) {
	...
	
	if (global_max - global_min > nums[high][pointer[high]] - nums[low][pointer[low]]) {
		global_min = low;
		global_max = high;
	} 
	
	...
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|JavaScript|[632.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/632.js)|
|Python3|[632.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/632.py)|
