# 1051. Height Checker

출처 : https://leetcode.com/problems/height-checker/


## 문제

Students are asked to stand in non-decreasing order of heights for an annual photo.
(학생들은 사진을 찍기위해 키 순서(오름차순)로 서달라고 요청받았다.)
Return the minimum number of students that must move in order for all students to be standing in non-decreasing order of height.
(학생들이 올바른 순서로 서기위해서 움직여야하는 최소 수를 반환하시오.)
Notice that when a group of students is selected they can reorder in any possible way between themselves and the non selected students remain on their seats.
(선택된 학생들은 자신과 선택되지 않은 학생들 사이에서 가능한 모든 방법으로 자리를 바꿀 수 있다.)

## 예제

- Example 1
	```
	Input: heights = [1,1,4,2,1,3]
	Output: 3
	Explanation: 
	Current array : [1,1,4,2,1,3]
	Target array  : [1,1,1,2,3,4]
	On index 2 (0-based) we have 4 vs 1 so we have to move this student.
	On index 4 (0-based) we have 1 vs 3 so we have to move this student.
	On index 5 (0-based) we have 3 vs 4 so we have to move this student.
	```
- Example 2
	```
	Input: heights = [5,1,2,3,4]
	Output: 5
	```

## 접근방법

문제에서 자리를 바꾸는 구체적인 방법에 대해 언급하지 않았기 때문에 현재 주어진 배열에서 올바른 위치에 있지 않은 요소의 수를 반환하면 되는 문제

예제 1과 같이 heights = [1, 1, 4, 2, 1, 3] 으로 주어졌다면, 올바른 키 순서는 [1, 1, 1, 2, 3, 4]가 될 것이고 이를 원래 배열과 비교한다면 원래 배열의 인덱스 2, 4 그리고 5번이 틀린 위치에 있는 것을 확인 할 수 있다.

## Code

<pre>
<code>
var heightChecker = function(heights) {
    var target = heights.slice().sort((a, b) => a - b);
    var count = 0;
    for (let i = 0; i < target.length; i++) {
        if (heights[i] != target[i]) count++;
    }
    return count;
};
</code>
</pre>
