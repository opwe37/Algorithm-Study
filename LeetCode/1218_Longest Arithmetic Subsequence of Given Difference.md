# 1218. Longest Arithmetic Subsequence of Given Difference

출처 : https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/


## 문제

Given an integer array `arr` and an integer `difference`, return the length of the longest subsequence in `arr` which is an arithmetic sequence such that the difference between adjacent elements in the subsequence equals `difference`.

정수 배열 `arr`과 정수 `difference`가 주어지면, 인접한 요소 간의 차이가 `difference`인 `arr`의 하위순서 중 가장 긴 배열을 반환하라.

## 예제

```
Input: arr = [1,2,3,4], difference = 1
Output: 4
Explanation: The longest arithmetic subsequence is [1,2,3,4].
```
```
Input: arr = [1,3,5,7], difference = 1
Output: 1
Explanation: The longest arithmetic subsequence is any single element.
```
```
Input: arr = [1,5,7,8,5,3,4,2,1], difference = -2
Output: 4
Explanation: The longest arithmetic subsequence is [7,5,3,1].
```

## 접근방법

문제에서 얘기하는 `arithmetic subsequence`에 대해 먼저 정리를 하면 다음과 같다.
1. `subsequence`의 모든 요소는 `arr`의 요소이며,
2. `subsequence`의 요소의 등장 순서는 `arr`와 동일하다.
3. `arithmetic subsequence`는 `subsequence` 내의 인접한 요소들 간의 차가 `difference`인 `subsequence`이다.

이를 이용하여 문제를 작은 사이즈의 문제로 바꿀 수 있다.
- 어떤 배열에 i-diff, i 가 있고 그 등장 순서가 i-diff 가 먼저 일때, 
- `func(i) = 1 + func(i - diff)` 와 같이 표현가능(`func(i)`는 요소 i를 기점으로 왼편 요소들만을 이용하였을때, 가장 긴 `arithmetic subsequence`를 반환하는 함수)

주어진 `arr`의 모든 요소를 대상으로 `func(i)`의 결과를 계산하고, 이 중 가장 큰 값을 반환하도록 구현

## Code

<pre>
<code>
var longestSubsequence = function(arr, difference) {
    var dp = new Map();
    var max = 0;
    for (let i = 0; i < arr.length; i++) {
        let prev = dp.has(arr[i]-difference) ? dp.get(arr[i]-difference) : 0;
        let cur = prev + 1;
        dp.set(arr[i], cur);
        if (max < cur) max = cur;
    }
    return max;
};
</code>
</pre>
