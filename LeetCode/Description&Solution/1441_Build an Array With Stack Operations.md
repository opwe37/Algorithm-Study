# 1441. Build an Array With Stack Operations
출처: https://leetcode.com/problems/build-an-array-with-stack-operations/

## 문제

Given an array  `target`  and an integer  `n`. In each iteration, you will read a number from `list = {1,2,3..., n}`.

배열 `target`과 정수 `n`이 주어진다. 각 반복에서 `list = {1, 2, 3, ..., n}`로부터 하나의 숫자를 읽을 수 있다.

Build the  `target` array using the following operations:

-   **Push**: Read a new element from the beginning `list`, and push it in the array.
-   **Pop**: delete the last element of the array.
-   If the target array is already built, stop reading more elements.

다음 동작을 활용하여 `target` 배열을 반들어라:
- **Push**: `list`로 부터 새로운 원소를 읽고, 배열에 push한다.
- **Pop**: 배열의 마지막 원소를 삭제한다.
- 만약 목표 배열이 완성되었다면, 원소를 읽는 것을 그만둔다.

Return the operations to build the target array. You are guaranteed that the answer is unique.

목표 배열을 만들기 위한 동작들을 반환하라. 유일한 하나의 답이 존재한다.

### 제약 조건
-   `target`  is strictly increasing.
- `target`은 엄격하게 증가한다. (만약 i < j라면, target[i] < target[j]이다.)

## 예제

```
Input: target = [1,3], n = 3
Output: ["Push","Push","Pop","Push"]
Explanation: Read number 1 and automatically push in the array -> [1]
Read number 2 and automatically push in the array then Pop it -> [1]
Read number 3 and automatically push in the array -> [1,3]
```
```
Input: target = [2,3,4], n = 4
Output: ["Push","Pop","Push","Push","Push"]
```

## 접근 방법

`target[i-1]`까지 어떤 방법인지는 모르겠지만 동일한 배열을 만들었다고 가정하자. 이 상황에서 `list`는 `target[i-1]+1`부터 순차적으로 숫자를 제공할 것 이다. 이제 해야되는 일은 `target[i]`와 `list`에서 제공되는 값을 비교하는 일이다. `list`에서 제공되는 값을 `value`라고 할 때
- `target[i] == value` 이라면, Push 수행 + `target[i+1]`과 `list`의 다음 값을 비교
- `target[i] != value` 이라면, Push와 Pop 수행 + `list`의 다음 값과 `target[i]`와 비교를 수행

이제 위의 과정을 `i`가 0일 때부터 시작하여 `target`의 마지막 인덱스까지 수행한다.

## Full Source Code

|lang|url|
|-|-
|JavaScript|https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1441.js|
|Python3|https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1441.py|
