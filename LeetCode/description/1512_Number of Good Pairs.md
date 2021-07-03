# 1512. Number of Good Pairs
출처: https://leetcode.com/problems/number-of-good-pairs/

## 문제

Given an array of integers `nums`.

A pair `(i,j)` is called  _good_  if `nums[i]`  ==  `nums[j]`  and  `i`  <  `j`.

Return the number of  _good_  pairs.

정수 배열 `nums`가 주어질 때, _good_ 페어를 반환하라.
_good_ 페어는 `nums[i]` == `nums[j]`이고 `i` < `j`인 `(i, j)`의 쌍을 말한다.

## 예제
```
Input: nums = [1,2,3,1,1,3]
Output: 4
Explanation: There are 4 good pairs (0,3), (0,4), (3,4), (2,5) 0-indexed.
```
```
Input: nums = [1,1,1,1]
Output: 6
Explanation: Each pair in the array are _good_.
```

## 접근 방법

가장 단순한 방법으로 모든 `i < j`의 경우를 탐색하는 것이다.
<pre>
<code>
n = nums.length;
count = 0;
for (i = 0; i < n; i++) {
	for (j = i+1; j < n; j++) {
		if (nums[i] == nums[j]) count++;
	}
}
</code>
</pre>
이중 반복문을 사용하고, 내부 반복문에서 `j`의 시작점을 `i+1`로 두어 `i < j`를 보장하였다. 이 방법은 O(n<sup>2</sup>)에 가까운 시간복잡도를 갖을 것이다.

O(n)의 시간에 안에 해결할 수 있는 방법이 존재하는데, 인덱스 `0 ~ i`까지 1이 3번 등장했다고 가정해보자. 인덱스 `i`까지 1로 만들 수 있는 _good_ 페어는 3개일 것이다. 이제  `i+1`번째 인덱스에 1이 등장했고, 이때 `i+1`을 이용하여 만들 수 있는 _good_ 페어의 수는 `i+1` 이전에 등장한 1의 수가 될 것이다. 즉, 3개의 _good_ 페어를 추가로 만들 수 있다. `0 ~ i+1`까지는 3 + 3 = 6개의 _good_ 페어를 만들 수 있을 것이다.
<pre>
<code>
element_count = {} // key: element, value: count
result = 0;
for (i = 0; i < n; i++) {
	if (element_count doesn't have nums[i]) {
		element_count[nums[i]] = 0;
	}
	result += element_count[nums[i]];
	element_count[nums[i]] += 1;
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|JavaScript|[1512.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1512.js)|
|Python3|[1512.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1512.py)|
