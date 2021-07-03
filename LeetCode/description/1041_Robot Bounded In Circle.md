# 1041. Robot Bounded In Circle
출처: https://leetcode.com/problems/robot-bounded-in-circle/

## 문제

On an infinite plane, a robot initially stands at  `(0, 0)`  and faces north. The robot can receive one of three instructions:

-   `"G"`: go straight 1 unit;
-   `"L"`: turn 90 degrees to the left;
-   `"R"`: turn 90 degrees to the right.

The robot performs the  `instructions`  given in order, and repeats them forever.

Return  `true`  if and only if there exists a circle in the plane such that the robot never leaves the circle.

무한한 평면에서, 한 로봇이 `(0, 0)`위치에 있고 북쪽을 바라보고 있다. 로봇은 세가지 명령 중 하나를 받아 수행할 수 있다:
- `"G"`: 1칸 앞으로 간다;
- `"L"`: 왼쪽으로 90도 돈다;
- `"R"`: 오른쪽으로 90도 돈다.

로봇은 `명령`을 주어진 순서대로 수행하고, 영원히 반복한다.

만약 평면위에 로봇이 떠나지 못하는 원형이 존재한다면 `true`를 반환하라.

## 예제
```
Input: instructions = "GGLLGG"
Output: true
Explanation: The robot moves from (0,0) to (0,2), turns 180 degrees, and then returns to (0,0).
When repeating these instructions, the robot remains in the circle of radius 2 centered at the origin.
```
```
Input: instructions = "GG"
Output: false
Explanation: The robot moves north indefinitely.
```

## 접근 방법

로봇이 같은 공간을 반복해서 움직이는 상황을 생각해보자. 로봇이 인풋으로 주어진 명령을 한 사이클 완료했을 때의 위치와 방향이 다음 두가지 중, 하나 이상의 상태를 가져야한다:
1. 명령 수행 후에, 시작 위치 `(0, 0)`에 있는 경우
2. 명령 수행 후에, 처음 바라보고 있는 방향(북)이 아닌 다른 방향을 바라보고 있는 경우

이제 주어진 명령을 하나씩 수행하면서 로봇의 위치와 방향을 기록한다. 최종 명령이 수행된 후, 위치가 `(0,0)` 이거나 방향이 북이 아닌 다른 방향일 때, 로봇은 평면 위에서 어떤 원형을 그리며 돌 것이다.

## Code

<pre>
<code>
var isRobotBounded = function(instructions) {
    let x = 0, y = 0, dir = 0;
    
    // 0 = North, 1 = East, 2 = South, 3 = West
    for(let i = 0; i < instructions.length; i++) {
        if (instructions[i] == 'R') {
            dir = (dir + 1) % 4;
        } else if(instructions[i] == 'L') {
            dir = (dir == 0) ? 3 : (dir - 1) % 4;
        } else {
            switch(dir) {
                case 0: y++; break;
                case 1: x++; break;
                case 2: y--; break;
                case 3: x--; break;
            }
        }
    }
    
    if ((x == 0 && y == 0) || dir != 0) {
        return true;
    } else {
        return false;
    }
};
</code>
</pre>
