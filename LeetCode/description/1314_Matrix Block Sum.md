# 1314. Matrix Block Sum
출처 : https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests/

## 문제 

Given a `m * n` matrix `mat` and an integer `K`, return a matrix `answer` where each `answer[i][j]` is the sum of all elements `mat[r][c]` for `i - K <= r <= i + K, j - K <= c <= j + K`, and `(r, c)` is a valid position in the matrix.

`m * n`행렬 `mat`과 정수 `K`가 주어지면, 각 `answer[i][j]`가 모든 요소 `mat[r][c]`의 합인 행렬 `answer`를 반환하라.  `i - K <= r <= i + K, j - K <= c <= j + K`이고  `(r, c)`는 행렬에서 유효한 위치이다.

## 예제
```
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], K = 1
Output: [[12,21,16],[27,45,33],[24,39,28]]
```
```
Input: mat = [[1,2,3],[4,5,6],[7,8,9]], K = 2
Output: [[45,45,45],[45,45,45],[45,45,45]]
```

## 접근 방법

1. 4중 for문을 이용하여 Output[i][j]을 한번에 구하는 방법 => 테스트를 통과하긴 하지만, 실행시간이 긴 편
2. Output[i][j]을 2단계로 나누어 구하는 방법

Output[i][j]의 값을 두 단계로 나누어 계산하는 것에 대하여 자세히 설명하면 아래와 같다.

limit = 1일때를 가정해서 Output[i][j]을 계산하고자 한다면 아래와 같이 9개의 mat 값이 필요하다.
```
Limit = 1
Output[i][j] = (mat[i-1][j-1] + mat[i-1][j] + mat[i-1][j+1])
				+ (mat[i][j-1] + mat[i][j] + mat[i][j+1])
				+ (mat[i+1][j-1] + mat[i+1][j] + mat[i+1][j+1])
```
이 9개의  mat 값을 행을 기준으로 3개의 부분으로 나눌수 있는데, 각각이 j-1열부터 j+1열까지 합을 계산하는 수식이다.
```
sum of mat[i-1]'s subArray(j-1 ~ j+1) = mat[i-1][j-1] + mat[i-1][j] + mat[i-1][j+1]
sum of mat[i]'s subArray(j-1 ~ j+1) = mat[i][j-1] + mat[i][j] + mat[i][j+1]
sum of mat[i+1]'s subArray(j-1 ~ j+1) = mat[i+1][j-1] + mat[i+1][j] + mat[i+1][j+1]
```
이렇게 나누어 놓은 3개의 부분 또한 i-1행부터 i+1행까지의 합이다.

지금까지의 내용을 정리하면 다음과 같다.
- 각각의 행에 대해서 `[j-limit]열 ~ [j+limit]열`의 부분배열의 합을 계산한다.
- 행에 대한 계산 결과를 기반으로 `[i-limit]행 ~ [i+limit]행`의 부분배열의 합을 계산한다. 

※ 부분배열의 합을 계산할때 슬라이딩 윈도우 방식을 이용하여 실행시간을 더욱 줄일 수 있다.

## Code

<pre>
<code>
var matrixBlockSum = function(mat, K) {
    const m = mat.length;
    const n = mat[0].length;
    
    const rowSum = Array(m).fill(0).map((val) => Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        let sum = 0;
        for (let k = 0; k < Math.min(K, n); k++) sum += mat[i][k];
    
        for (let j = 0; j < n; j++) {
            if (j + K < n) sum += mat[i][j+K];
            if (j - K - 1 >= 0) sum -= mat[i][j-K-1];
            rowSum[i][j] = sum;
        }
    }
    
    for (let j = 0; j < n; j++) {
        let sum = 0;
        for (let k = 0; k < Math.min(K, m); k++) sum += rowSum[k][j];
        
        for(let i = 0; i < m; i++) {
            if (i + K < m) sum += rowSum[i+K][j];
            if (i - K - 1 >= 0) sum -= rowSum[i-K-1][j];
            mat[i][j] = sum;
        }
    
    }
    return mat;
};
</code>
</pre>
