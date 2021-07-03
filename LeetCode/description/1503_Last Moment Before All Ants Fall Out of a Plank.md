# 1503. Last Moment Before All Ants Fall Out of a Plank

출처: https://leetcode.com/problems/last-moment-before-all-ants-fall-out-of-a-plank/

## 문제

We have a wooden plank of the length  `n`  **units**. Some ants are walking on the plank, each ant moves with speed  **1 unit per second**. Some of the ants move to the  **left**, the other move to the  **right**.

When two ants moving in two  **different**  directions meet at some point, they change their directions and continue moving again. Assume changing directions doesn't take any additional time.

When an ant reaches  **one end**  of the plank at a time  `t`, it falls out of the plank imediately.

Given an integer  `n`  and two integer arrays  `left`  and  `right`, the positions of the ants moving to the left and the right. Return  _the moment_  when the last ant(s) fall out of the plank.

길이 `n`의 나무 판자가 있다. 개미 몇 마리가 판자 위를 걷는데, **초당 1**의 속도로 움직인다. 일부 개미는 **왼쪽**으로, 나머지는 **오른쪽**으로 움직이다.

서로 다른 방향으로 움직이던 개미가 만나게 되면, 그 즉시 움직이던 방향과 반대 방향으로 움직이기 시작한다.

개미가 `t`시간에 판자의 끝에 도달했다면, 즉시 판자 밖으로 떨어진다.

 정수 `n`과 왼쪽, 오른쪽으로 움직이는 개미의 위치를 담은 두 정수 배열 `left`와 `right`가 주어진다. 판자 위에서 마지막 개미가 떨어지는 **순간**을 반환하라.

## 예제
![](https://assets.leetcode.com/uploads/2020/06/17/ants.jpg)
```
Input: n = 4, left = [4,3], right = [0,1]
Output: 4
Explanation: In the image above:
-The ant at index 0 is named A and going to the right.
-The ant at index 1 is named B and going to the right.
-The ant at index 3 is named C and going to the left.
-The ant at index 4 is named D and going to the left.
Note that the last moment when an ant was on the plank is t = 4 second, after that it falls imediately out of the plank. (i.e. We can say that at t = 4.0000000001, there is no ants on the plank).
```

## 접근 방법

서로 다른 개미가 만나게 되면 움직이던 방향을 바꾼다. 라는 말의 의미를 파악한다면 문제를 쉽게 풀 수 있다.

만약 왼쪽으로 가던 개미와 오른쪽으로 가던 개미가 `i`라는 위치에서 만난다면 배열 `left`와 `right`는 `left = [i]`, `right = [i]`의 모습일 것이다. 이 두 개미는 가던 방향을 바꾸게 될 텐데,  `left`와 `right` 배열 입장에서는 달라질게 없다. `left` 배열 입장에서만 생각해보자면, 기존에 `i` 위치의 개미는 `left`배열에서 제거되지만(방향이 바뀌므로), 기존에 오른쪽으로 이동하던 개미가  `left` 배열에 추가되면서 다시 `i`위치에서 왼쪽으로 이동하는 개미가 생기게 된다. `right`배열도 동일한 원리이다. 결국, 개미가 서로 만나 방향을 바꾸는 것에 대해서 고려를 하지 않아도 된다는 말이다.

이제 문제는 매우 단순해졌다. `left` 입장에서  0과 가장 멀리 떨어져 있는 개미와 `right` 입장에서 `n`과 가장 멀리 떨어져 있는 개미 중 더 먼 거리에 있는 개미를 선택하여 그 위치를 출력하면 된다.

## Full Code
|language|url|
|--------|---|
|JavaScript|[1503.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1503.js)|
