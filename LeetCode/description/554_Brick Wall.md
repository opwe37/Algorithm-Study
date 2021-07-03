# 554. Brick Wall

출처: https://leetcode.com/problems/brick-wall/

## 문제

### 번역

벽돌 벽이 있다. 벽은 정사각형이고 여러 줄의 벽돌이 있다. 벽돌은 높이는 같으나 다른 너비를 갖는다. **위**에서 **아래**로 **최소** 벽돌을 가로지르는 수직선을 그리려고 한다.

벽돌 벽은 줄의 리스트로 표현된다. 각 줄은 각 벽의 너비를 정수로 표현한 리스트이며 왼쪽으로 오른쪽으로 주어진다.

만약 선이 벽돌의 가장자리를 지난다면, 벽돌을 가로지르지 않은 것으로 간주한다. 벽돌을 최소로 가로지르는 선을 어떻게 그릴 수 있는지 찾고, 가로 질러진 벽돌의 수를 반환하라.

**벽의 수직 가장자리에 선을 그릴 수 없고, 이 경우 선은 벽돌을 가로 지르지 않는다.**

### 원문

There is a brick wall in front of you. The wall is rectangular and has several rows of bricks. The bricks have the same height but different width. You want to draw a vertical line from the  **top**  to the  **bottom**  and cross the  **least**  bricks.

The brick wall is represented by a list of rows. Each row is a list of integers representing the width of each brick in this row from left to right.

If your line go through the edge of a brick, then the brick is not considered as crossed. You need to find out how to draw the line to cross the least bricks and return the number of crossed bricks.

**You cannot draw a line just along one of the two vertical edges of the wall, in which case the line will obviously cross no bricks.**

## Example
```
Input: [[1,2,2,1],
        [3,1,2],
        [1,3,2],
        [2,4],
        [3,1,2],
        [1,3,1,1]]

Output: 2
```
Explanation:
![](https://assets.leetcode.com/uploads/2018/10/12/brick_wall.png)

## 접근 방법

벽돌 벽에서 첫 줄만 따로 떼어서 생각해보자. 예제로 생각하면 [[1,2,2,1], [3,1,2], [1,3,2], [2,4], [3,1,2], [1,3,1,1]]에서 [1,2,2,1]만 따로 생각해보는 것이다. 이 줄에서 벽돌을 관통하지 않게 선을 긋기 위해서는 각 벽돌의 경계 지점을 찾아야한다. 왼쪽을 기점으로 1, 3, 5 지점이 될 것이다. 
```
|-1-||--2--||--2--||-1-|

|-1-|					=> 1 = 1
|-1-||--2--|			=> 1 + 2 = 3
|-1-||--2--||--2--|		=> 1 + 2 + 2 = 5
```
이런 방식으로 모든 줄에 대해서 벽돌을 통과하지 않는 지점을 계산할 수 있을 것이다.
```
1 row: 1, 3, 5
2 row: 3, 4
3 row: 1, 4
4 row: 3
5 row: 3, 4
6 row: 1, 4, 5
```
위의 예제를 기반으로 하여 지점 1에서 선을 긋는다고 생각해보자. 3개의 줄(1, 3, 6)에서 지점 1은 벽돌을 관통하지 않는 지점이다. 이를 반대로 생각하면 나머지 3개의 줄(2, 4, 5)에서는 벽돌을 통과한다는 것이다. 이처럼 각 줄에 대한 벽돌 경계 지점을 통계내어 각 지점에서 몇개의 벽돌을 통과하는지 계산할 수 있다.
|지점|1|3|4|5|
|:---:|-|-|-|-|
|합산|3|4|4|2|
|통과 벽돌 수|3|2|2|4|

<pre>
<code>
// 각 줄에서 벽돌 경계 지점을 찾고 기록
bound = {};
wall.forEach(bricks => {
	bricks.slice(0, -1).reduce((a, b) => {
		const point = a + b;
		bound[point] = bound[point] + 1 || 1;
		return point;
	});
});

// bound에서 가장 많이 등장한 지점을 찾아서 광통한 벽돌 수 계산
const result = wall.length - max(...Object.values(bound), 0);
</code>
</pre>


## Full Code
|language|url|
|--------|---|
|Javascript|[554.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/554.js)|
