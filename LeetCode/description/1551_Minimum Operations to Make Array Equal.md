# 1551.  Minimum Operations to Make Array Equal
출처: https://leetcode.com/problems/minimum-operations-to-make-array-equal/

## 문제

You have an array  `arr`  of length  `n`  where  `arr[i] = (2 * i) + 1`  for all valid values of  `i`  (i.e.  `0 <= i < n`).

In one operation, you can select two indices  `x` and  `y`  where  `0 <= x, y < n`  and subtract  `1`  from  `arr[x]`  and add  `1`  to  `arr[y]` (i.e. perform  `arr[x] -=1` and  `arr[y] += 1`). The goal is to make all the elements of the array  **equal**. It is  **guaranteed**  that all the elements of the array can be made equal using some operations.

Given an integer  `n`, the length of the array. Return  _the minimum number of operations_  needed to make all the elements of arr equal.

### 요약
길이 `n`인 배열 `arr`이 있다. 각 원소 `arr[i]`는 `arr[i] = (2 * i) + 1`이다.(`0 <= i < n`)

두 개의 인덱스 `x`와 `y`를 선택, `arr[x]`에서 `1`을 빼고 `arr[y]`에서 `1`을 더하는 함수가 있다. _최소한의 동작_ 으로 배열의 모든 원소를 **동일**한 값으로 만드는 것이 목표이다. 이 때 수행된 최소 동작 수를 반환하라.

## 예제
```
Input: n = 3
Output: 2
Explanation: arr = [1, 3, 5]
First operation choose x = 2 and y = 0, this leads arr to be [2, 3, 4]
In the second operation choose x = 2 and y = 0 again, thus arr = [3, 3, 3].
```
## 접근 방법

```
arr  = [1, 3, 5, 7, 9]
diff = [4, 2, 0, 2, 4]
answer = 2 + 4 = 6

arr  = [1, 3, 5, 7, 9, 12, 15]
diff = [6, 4, 2, 0, 2, 4, 6]
answer = 2 + 4 + 6 = 12
```
위는 n이 홀수일 때의 예제이다. answer의 값을 보면 ∑ 2k(k = 0 ~ (n-1)/2)의 형태를 띄고 있음을 알 수 있다. `j = (n-1)/2`라 할때, 이 수식은 `j * (j+1)`로 표현할 수 있다.

n이 짝수일 때의 예제를 살펴보자.
```
arr  = [1, 3, 5, 7]
diff = [3, 1, 1, 3]
answer = 1 + 3 = 4

arr  = [1, 3, 5, 7, 9, 11]
diff = [5, 3, 1, 1, 3, 5]
anwer = 1 + 3 + 5 = 9 
```
이 경우에도 answer는 ∑ 2k+1(k = 0 ~ (n-1)/2)이다. 즉,  `j = (n-1)/2`라 할때, 이 수식은 `(j * (j+1)) + j`로 표현할 수 있다.

## Full Code
|language|url|
|--------|---|
|JavaScript|[1551.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1551.js)|
