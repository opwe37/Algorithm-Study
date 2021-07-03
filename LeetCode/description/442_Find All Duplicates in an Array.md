# 442. Find All Duplicates in an Array
출처: https://leetcode.com/problems/find-all-duplicates-in-an-array/

## 문제

Given an array of integers, 1 ≤ a[i] ≤  _n_  (_n_  = size of array), some elements appear  **twice**  and others appear  **once**.

Find all the elements that appear  **twice**  in this array.

Could you do it without extra space and in O(_n_) runtime?

1 ≤ a[i] ≤  _n_  (_n_  = 배열의 크기)인 배열이 주어질 때, 일부 원소는 **두 번** 나타나고 다른 원소는 **한 번** 나타난다.

**두 번** 나타나는 원소를 추가 공간을 사용하지 않고, O(_n_) 실행시간 내에 찾아라.

## 예제
```
Input: [4,3,2,7,8,2,3,1]
Output: [2,3]
```

## 접근 방법

추가 공간 없이 이 문제를 풀기 위해서는 문제에서 주어진 조건을 최대한 활용해야 한다.

문제에서 주어지는 배열의 원소의 범위가 `1 ≤ a[i] ≤ n`이고 n이 배열의 크기라고 하였는데, 이는 배열의 인덱스 범위(`0 ≤ i ≤ n-1`)와 동일하다. 이러한 특징으로 인해 a[i]를 통해 배열 a를 접근해도 인덱스 문제가 발생하지 않는다. 이제 a[i]값을 이용해서 배열 a를 접근하면서, 동일한 인덱스에 두 번 접근하는지의 여부를 체크해야한다. 이를 위해 a[i]값을 이용한 인덱스에 접근할 때, 값에 -1을 곱하도록 한다. 만약 이미 접근했던 인덱스라면 a[i] 값이 음수가 되어 있을 것임을 이용하여 문제를 풀 수 있다.
<pre>
<code>
for (i = 0; i < a.length; i++) {
	idx = abs(a[i]) - 1;
	if (a[idx] < 0) result += 1;
	a[idx] *= -1;
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|JavaScript|[442.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/442.js)|
