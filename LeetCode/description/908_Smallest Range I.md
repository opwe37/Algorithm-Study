# 908. Smallest Range I

출처: https://leetcode.com/problems/smallest-range-i/

## 문제

Given an array  `A`  of integers, for each integer  `A[i]`  we may choose any  `x`  with  `-K <= x <= K`, and add  `x`  to  `A[i]`.

After this process, we have some array  `B`.

Return the smallest possible difference between the maximum value of  `B` and the minimum value of  `B`.

정수 배열 `A`가 주어지면,  모든 `A[i]`에 대해서 `-K <= x <= K`인 `x`를 선택하여 `A[i]`에 `x`를 더한다.

이 과정을 통해 얻어지는 배열을 `B`라고 한다.

`B`의 최대값과 최소 값의 차가 가장 작은 경우의 차를 반환하라.

## Example
```
Input: A = [1], K = 0
Output: 0
Explanation: B = [1]
```
```
Input: A = [0,10], K = 2
Output: 6
Explanation: B = [2,8]
```
```
Input: A = [1,3,6], K = 3
Output: 0
Explanation: B = [3,3,3] or B = [4,4,4]
```
## 접근 방법

2가지 경우로 나누어 생각해야 한다.
1. `A`의 최대, 최소의 차가 `2 x K` 보다 큰 경우
2. `A`의 최대, 최소의 차가 `2 x K` 보다 작은 경우

2K보다 크다면, 최대값에서 K를 뺀 값과 최소값에서 K를 더한 값 사이의 차가 얻을 수 있는 최소의 값이 될 것이고

2K보다 작다면, 배열 내의 모든 값을 동일한 값으로 맞추는게 가능한 것으로 최대, 최소 사이의 차가 0이 된다.` A = [1, 3, 6], K = 3`인 경우를 살펴보자.
```
A = [1, 3, 6], K = 3
- A의 최대 값 = 6
- A의 최소 값 = 1
- 최대 값 - 최소 값 < 6(2 * K)
- B = [1+2, 3+0, 6-3] = [3, 3, 3]
```

## Full Code
|language|url|
|--------|---|
|Javascript|[908.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/908.js)|
