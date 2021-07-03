# 1739. Building Boxes
출처: https://leetcode.com/problems/building-boxes/

## 문제

You have a cubic storeroom where the width, length, and height of the room are all equal to  `n`  units. You are asked to place  `n`  boxes in this room where each box is a cube of unit side length. There are however some rules to placing the boxes:

-   You can place the boxes anywhere on the floor.
-   If box  `x`  is placed on top of the box  `y`, then each side of the four vertical sides of the box  `y`  **must**  either be adjacent to another box or to a wall.

Given an integer  `n`, return _the  **minimum**  possible number of boxes touching the floor._

방의 폭, 길이 그리고 높이가 모두 `n`으로 동일한 큐브 저장소가 있다. 이 방에 각 면의 길이가 1인 박스 `n`개를 놓을 것을 요청받았다. 박스를 놓는 몇 개의 규칙이 있다:

- 바닥 어느 곳에나 박스를 놓을 수 있다.
- 만약 박스 `x`가 박스 `y` 위에 놓여 있다면, 박스 `y`의 4개의 수직 면이 **반드시** 다른 박스 또는 벽과 인접해있어야 한다.

정수 `n`이 주어지면, _바닥과 맞닿는 박스의 **최소**수_ 를 반환하라.

## 예제
![](https://assets.leetcode.com/uploads/2021/01/04/3-boxes.png)
```
Input: n = 3
Output: 3
Explanation: The figure above is for the placement of the three boxes.
These boxes are placed in the corner of the room, where the corner is on the left side.
```
![](https://assets.leetcode.com/uploads/2021/01/04/10-boxes.png)
```
Input: n = 10
Output: 6
Explanation: The figure above is for the placement of the ten boxes.
These boxes are placed in the corner of the room, where the corner is on the back side.
```

## 접근 방법

규칙을 지키면서 바닥에 위치한 박스를 최소로 하기 위해서는 위의 2번째 예제와 같이 피라미드? 혹은 대각?의 형태로 박스를 쌓아야 한다. 이와 같은 완벽한 형태로 만들어지는 박스의 수는 다음과 같이 증가한다.
```
1
1 + 3 = 1 + (1+2) = 4
1 + 3 + 6 = 1 + (1+2) + (1+2+3) = 10
1 + 3 + 6 + 10 = 1 + (1+2) + (1+2+3+4) = 20
...
```
또 각 상황마다 바닥에 깔리는 박스의 수는 마지막에 더해지는 수와 같다. 즉, 20개의 박스를 놓는다면 10개의 박스가 바닥에 깔린다. 10개의 박스를 놓아야 한다면, 6개의 박스가 바닥에 깔린다.

위의 숫자에 해당하지 않는 `n`이 주어지면 바닥에 놓일 박스의 수를 어떻게 구할 수 있을까. 우선 정확한 개수는 몰라도 범위는 알 수 있다. 완벽한 피라미드 형태를 만드는 박스의 수를 계산하다 보면 `n`이 중간에 끼는 순간이 있다. 만약 `n = 15`라면, `10 < n < 20`일 것이다. 이 말은 15개의 박스를 이용했을 때 바닥에 깔리는 박스의 수는 10개의 박스를 이용했을 때와 20개의 박스를 이용했을 때의 사이 값이라는 이야기다.

각 범위에서 n이 증가함에 따라 바닥에 깔리는 수의 변화를 보면 다음과 같다. 
- 1 < n < 4 인 경우

|n | 1 | 2 | 3 | 4 |
|--|---|---|---|---|
|answer| 1 | 2 | 3 | 3 |
|증가량| 0 | 1 | 2 | 2 |
- 4 < n < 10

|n | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--|---|---|---|---|---|---|---|
|answer| 3 | 4 | 5 | 5 | 6 | 6 | 6 |
|증가량| 0 | 1 | 2 | 2 | 3 | 3 | 3 |

- 10 < n < 20

|n | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
|--|---|---|---|---|---|---|---|---|---|---|---|---|
|answer| 6 | 7 | 8 | 8 | 9 | 9 | 9 | 10 | 10 | 10 | 10 |
|증가량| 0 | 1 | 2 | 2 | 3 | 3 | 3 | 4 | 4 | 4 | 4 |

위의 표에서 증가량을 살펴보면 일정한 패턴을 가지고 1씩 증가함을 알 수 있다. 증가하는 순간 n과 시작과의 차이를 구하면 `1, 2(=1+1), 4(=1+2+3), 7(=1+2+3+4), ...`이다. 이를 이용하여 정확히 n개의 박스를 이용하였을 때, 몇개의 박스가 바닥에 깔리는지 알 수 있다.

## Code

<pre>
<code>
var minimumBoxes = function(n) {
    const dp = [];
    let pre = 0,
        sum = 0;
    for (let i = 1; pre < n; i++) {
        sum += i;
        pre += sum;
        dp.push([pre, sum]);
    }
    
    if (dp[dp.length-1][0] == n) return dp[dp.length-1][1];
    
    let numOfBox = dp[dp.length-2][0];
    let i = 0;
    while (numOfBox < n) {
        i++;
        numOfBox += i;
    }
    return dp[dp.length-2][1] + i;
};
</code>
</pre>
