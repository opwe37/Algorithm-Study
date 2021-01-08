# 498. Diagonal Traverse

출처 : https://leetcode.com/problems/diagonal-traverse/

## 문제

Given a matrix of M x N elements (M rows, N columns), return all elements of the matrix in diagonal order as shown in the below image.

M x N의 행렬이 주어지면, 행렬의 모든 요소를 아래의 그림과 같이 대각선 순서로 반환하라.

## 예제

```
Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]

Output: [1,2,4,7,5,3,6,8,9]
```
![](https://assets.leetcode.com/uploads/2018/10/12/diagonal_traverse.png)

## 접근방법

대각선의 방향이 전환되는 곳의 인덱스에 주목

아래에서 윗 방향의 대각선을 보면, 첫 행과 마지막 열에서 방향 전환이 이뤄짐을 알 수 있다. 반대의 경우도 첫 열과 마지막 행에서 방향 전환이 이뤄진다.

1. matrix[0][0]에서 윗 대각선 방향으로 시작
2. 방향에 맞춰서 matrix 탐색
	- up : row--, col++
	- down : row++, col--
3.  탐색하고자 하는 row와 col이 범위 안이면 값을 출력, 범위 밖이면 이전 위치를 기반 및 방향을 기반으로 row와 col을 재조절

## Code

<pre>
<code>
var findDiagonalOrder = function(matrix) {
    if (matrix.length == 0) return [];
    
    const m = matrix.length;
    const n = matrix[0].length;
    
    const answer = Array(m*n).fill(null);
    
    let row = 0, column = 0, idx = 0;
    let dir = 1;
    while (idx < m*n) {
        answer[idx++] = matrix[row][column];
        
        const newRow = row + (dir == 1 ? -1 : 1);
        const newCol = column + (dir == 1 ? 1 : -1);
        
        if (newRow < 0 || newRow >= m || newCol < 0 || newCol >= n) {
            if (dir == 1) {
                row += (column == n-1 ? 1 : 0);
                column += (column < n-1 ? 1 : 0);
            } else {
                column += (row == m-1 ? 1 : 0);
                row += (row < m-1 ? 1 : 0);
            }
            
            dir *= -1;
        } else {
            row = newRow;
            column = newCol;
        }
    }
    return answer;
};
</code>
</pre>
