# 240. Search a 2D Matrix II
출처 : https://leetcode.com/problems/search-a-2d-matrix-ii/

## 문제

Write an efficient algorithm that searches for a value in an  _m_  x  _n_  matrix. This matrix has the following properties:
(_m_ x _n_ 행렬에서 어떤 값을 찾는 효율적인 알고리즘을 작성하라. 이 행렬은 다음의 속성을 따른다.)
-   Integers in each row are sorted in ascending from left to right. (각 행은 오름차순으로 정렬된 정수를 갖는다.)
-   Integers in each column are sorted in ascending from top to bottom. (각 열은 오름차순으로 정렬된 정수를 갖는다.)

## 예제

- Example
	```
	Consider the following matrix :

	[
	  [1,   4,  7, 11, 15],
	  [2,   5,  8, 12, 19],
	  [3,   6,  9, 16, 22],
	  [10, 13, 14, 17, 24],
	  [18, 21, 23, 26, 30]
	]
	
	Given target = 5, return true.
	Given target = 20, return false.
	```
	
## 접근방법

주어진 행렬의 우상단 값을 시작점으로 하여 찾고자 하는 값으로 범위를 좁혀가는 방법

우상단의 값은 다음의 특징을 갖음.
- 행을 기준으로 가장 큰 값
- 열을 기준으로 가장 작은 값

우상단 값과 목표 값과의 비교를 통해 최초 우상단의 위치를 변경해 나감. 값의 비교에는 세 가지 케이스가 존재
1. 우상단 값 == Target
	- 찾고자 하는 값이 매트릭스 내에 존재하는 것이기 때문에 True 반환
2. 우상단 값 < Target
	- 최소한 현재 행에서는 찾고자 하는 값이 존재하지 않음을 뜻함
3. 우상단 값 > Target
	- 최소한 현재 열에서는 찾고자 하는 값이 존재하지 않음을 뜻함

위의 케이스를 유의하면서 예제의 매트릭스에서 `16`을 찾는 과정을 보자. 탐색해야 하는 매트릭스의 변화를 살펴보면 탐색 방식을 쉽게 이해 가능
```
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]

// 최초 주어진 매트릭스의 우상단에 위치한 값. 1행 5열의 값
matrix[1][5] = 15

☞ 15 < 16
// 15는 주어진 행렬의 첫행에서 가장 큰 값이므로 첫행의 그 어떠한 값도 16보다 작음
// 첫 행은 탐색 범위에서 제거

matrix =
[
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
matrix[1][5] = 19

☞ 19 > 16
// 현재 19은 5열에서 탐색해야하는 범위중 가장 작은 값임
// 열의 가장 작은 값인 19보다 찾고자 하는 값 16이 더 작으므로 탐색범위에 있는 마지막 열의 어떠한 값도 16보다 큼을 알 수 있음 => 마지막 열 제거

matrix =
[
  [2,   5,  8, 12],
  [3,   6,  9, 16],
  [10, 13, 14, 17],
  [18, 21, 23, 26]
]
matrix[1][4] = 12

☞ 12 < 16
// 12는 첫번째 행에서 탐색해야하는 범위중 가장 작은 큰 값 => 첫행 제거

matrix =
[
  [3,   6,  9, 16],
  [10, 13, 14, 17],
  [18, 21, 23, 26]
]
matrix[1][4] = 16

☞ 16 == 16
// 매트릭스 내에 16 존재 함
```

## Code
<pre>
<code>
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    const m = matrix.length;
    if (m == 0) return false;
    const n = matrix[0].length;
    
    var i = 0,
        j = n - 1;
    var answer = false;
    while (i < m && j >= 0) {
        console.log(i, j)
        if (matrix[i][j] == target) {
            answer = true;
            break;
        }
        
        if (matrix[i][j] > target) {
            j--;
        } else {
            i++;
        }
    }
    
    return answer;
};
</code>
</pre>
