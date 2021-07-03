# 1504. Count Submatrices With All Ones

출처 : https://leetcode.com/problems/count-submatrices-with-all-ones/

## 문제

Given a `rows * columns` matrix `mat` of ones and zeros, return how many **submatrices** have all ones.
(0과 1을 요소로 갖는 `rows * columns` 크기의 행렬 `mat`이 주어질 때, 모든 요소가 1인 **submatrices**의 수를 반환하라)

## 예제
- Example 1
	````
	Input: mat = [[1,0,1],
              [1,1,0],
              [1,1,0]]
	Output: 13
	Explanation: There are **6** rectangles of side 1x1.
	There are **2** rectangles of side 1x2.
	There are **3** rectangles of side 2x1.
	There is **1** rectangle of side 2x2. 
	There is **1** rectangle of side 3x1.
	Total number of rectangles = 6 + 2 + 3 + 1 + 1 = **13.**
	````

- Example 2
	````
	Input: mat = [[0,1,1,0],
              [0,1,1,1],
              [1,1,1,0]]
	Output: 24
	Explanation:
	There are **8** rectangles of side 1x1.
	There are **5** rectangles of side 1x2.
	There are **2** rectangles of side 1x3. 
	There are **4** rectangles of side 2x1.
	There are **2** rectangles of side 2x2. 
	There are **2** rectangles of side 3x1. 
	There is **1** rectangle of side 3x2. 
	Total number of rectangles = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24**.**
	````

## 접근방법

별다른 알고리즘의 사용없이 순수한 for문 만을 통해 문제 해결 

4중 for문 이용
- 처음 2개의 for문은 서브 행렬의 첫 요소를 가르키기 위함
- 3, 4번째 for문은 해당 위치로부터 만들 수 있는 모든 서브 행렬을 탐색하는 반복문(i, j의 위치에서 `1*1`, `1*2`, `1*3` ... , `2*1`, `2*2`, `2*3`, ...  의 순으로 반복)
	- 3번째 for문 (sub_i) : 서브 행렬의 행 크기에 대한 반복
		- if) mat[sub_i][j] == 0 : 3번째 for문 종료
		- 서브 행렬에서 행의 첫 요소가 0이면 해당 행의 열을 탐색할 필요가 없고, 더 이상의 행 크기를 증가 시키며 탐색할 필요도 없음
	- 4번째 for문 (sub_j): 서브 행렬의 열 크기에 대한 반복
		- if) mat[sub_i][sub_j] == 0 : 4번째 for문 종료
		- `sub_i+1` 행을 탐색할 때, `sub_j-1` 열 까지만 반복하도록 구현해야 함
		- if) mat[sub_i][sub_j] == 1 : 해당 크기(`sub_i * sub_j`)의 모든 요소가 1임을 나타냄

## code
<pre>
<code>
/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSubmat = function(mat) {
    var count = 0;
    const row_n = mat.length;
    const col_n = mat[0].length;
    for (let i = 0; i < row_n; i++) {
        for (let j = 0; j < col_n; j++) {
            let submatrice_col = col_n;
            let tmpCount = 0;
            for (let sub_i = i; sub_i < row_n && mat[sub_i][j] == 1; sub_i++) {
                for (let sub_j = j; sub_j < submatrice_col; sub_j++) {
                    if (mat[sub_i][sub_j] == 0) {
                        submatrice_col = sub_j;
                        break;
                    }
                    tmpCount++;
                }
            }
            count += tmpCount;
        }
    }
    return count;
};
</code>
</pre>
