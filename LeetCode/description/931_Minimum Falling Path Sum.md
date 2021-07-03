# 931. Minimum Falling Path Sum

출처 : https://leetcode.com/problems/minimum-falling-path-sum/


## 문제

Given a  **square**  array of integers  `A`, we want the  **minimum**  sum of a  _falling path_  through  `A`.
(**정사각형**의 정수 배열 `A`가 주어질때, `A`의 하강경로의 최소합을 구하길 원한다.)

A falling path starts at any element in the first row, and chooses one element from each row. The next row's choice must be in a column that is different from the previous row's column by at most one.
(하강 경로는 첫 행의 모든 요소로부터 시작하고 각 행에서 하나의 요소를 선택한다. 다음 행의 선택은 이전 행에서 선택한 열과 최대 1만큼 차이가 나는 열을 선택해야 한다.)

## 예제

```
Input: [[1,2,3],[4,5,6],[7,8,9]]
Output: 12
Explanation: 
The possible falling paths are:
-   [1,4,7], [1,4,8], [1,5,7], [1,5,8], [1,5,9]
-   [2,4,7], [2,4,8], [2,5,7], [2,5,8], [2,5,9], [2,6,8], [2,6,9]
-   [3,5,7], [3,5,8], [3,5,9], [3,6,8], [3,6,9]
Path with the Smallest Sum : [1,4,7]
answer = 12
```

## 접근 방법

문제 풀이에 핵심이 되는 알고리즘 기법 : DP(Dynamic Programming)

`dp[r][c]`가 `r행 c열에 도착하는 하강경로 중 최소 값`일 때, 다음과 같이 정의 가능
- dp[r][c] = A[r][c] + min(dp[r-1][c-1], dp[r-1][c], dp[r-1][c+1])
- r행 c열에 도착하는 하강경로는 r-1행 기준으로 3가지 경로 뿐이기 때문에 dp[r][c]는 위와 같은 점화식으로 표현이 가능하다.

위의 점화식을 이용하여 모든 행에 대한 값을 1행부터 차근차근 계산해나가면, 마지막 행은 각 열로 도착하는 하강경로 중 최소 값을 저장하게 된다. 이를 통해 문제에 대한 해답을 얻을 수 있다.

## Code
<pre>
<code>
var minFallingPathSum = function(A) {
    const n = A.length;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let best = A[i-1][j];
            if (j > 0) best = Math.min(best, A[i-1][j-1]);
            if (j+1 < n) best = Math.min(best, A[i-1][j+1]);
            A[i][j] += best;
        }
    }
    
    return Math.min.apply(null, A[n-1]);
};
</code>
</pre>
