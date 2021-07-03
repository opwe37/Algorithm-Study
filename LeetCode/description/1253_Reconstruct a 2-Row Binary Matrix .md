# 1253. Reconstruct a 2-Row Binary Matrix

출처 : https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix/

## 문제

Given the following details of a matrix with  `n`  columns and  `2`  rows :

`2`행 `n`열 매트릭스가 주어진다 :

-   The matrix is a binary matrix, which means each element in the matrix can be  `0`  or  `1`.
-   The sum of elements of the 0-th(upper) row is given as  `upper`.
-   The sum of elements of the 1-st(lower) row is given as  `lower`.
-   The sum of elements in the i-th column(0-indexed) is  `colsum[i]`, where  `colsum`  is given as an integer array with length  `n`.

- 매트리스의 각 요소가 `0` 또는 `1`인 매트릭스는 이진 매트릭스이다.
- 0-번째(upper) 줄의 요소들의 합이 `upper`로 주어진다.
- 1-번째(lower) 줄의 요소들의 합이 `lower`로 주어진다.
- i-번째 열(0-indexed)의 합은 `colsum[i]`이며, `colsum`은 길이가 `n`인 정수 배열이다. 

Your task is to reconstruct the matrix with  `upper`,  `lower`  and  `colsum`.

수행해야 하는 작업은 `upper`, `lower` 그리고 `colsum`을 통해 매트릭스를 재구축하는 것이다.

Return it as a 2-D integer array.

재구축된 2차원 배열을 반환하라.

If there are more than one valid solution, any of them will be accepted.

하나 이상의 유효한 답이 존재한다면, 그중 어떤 답도 허용된다.

If no valid solution exists, return an empty 2-D array.
유효한 답이 존재하지 않는다면, 빈 2차원 배열을 반환하라.

## 예제
```
Input: upper = 2, lower = 1, colsum = [1,1,1]
Output: [[1,1,0],[0,0,1]]
Explanation: [[1,0,1],[0,1,0]], and [[0,1,1],[1,0,0]] are also correct answers.
```
```
Input: upper = 2, lower = 3, colsum = [2,2,1,1]
Output: []
```

## 접근방법

`colsum` 배열과 매트릭스와의 관계에 대해서 생각하면 다음과 같다 :

- IF) `solsum[i] = 2` : `matrix[0][i] = 1`, `matrix[1][i] = 1`
- IF) `solsum[i] = 0` : `matrix[0][i] = 0`, `matrix[1][i] = 0`
- IF) `solsum[i] = 1` : `matrix[0][i] = 1`, `matrix[1][i] = 0` OR `matrix[0][i] = 0`, `matrix[1][i] = 1`

위의 관계를 이용하여 문제에 접근하면 다음과 같다.
1. 확실한 위치부터 매트릭스를 채워가기 시작
	- `colsum[i] = 2`인 i 열에 대해서 matrix[0][i] = 1, matrix[1][i] = 1
		- upper와 lower 조절 : 만약 colsum에 2가 x개 존재한다면, 각각 `2*x`를 빼줌
	- `colsum[i] = 0`인 i 열에 대해서 matrix[0][i] = 0, matrix[1][i] = 0
2. 그리디(Greedy)한 방법으로 0행부터 1을 채워나감
	- 어떤 값도 설정안된 위치(즉, `colsum[i] = 1`인 `i`)에 matrix[0][i] = 1, matrix[1][i] = 0으로 설정하고 upper를 1씩 감소시키면서 upper가 0이 될때까지 반복
	- upper가 0이 된 이후, 남은 `colsum[i] = 1`인 `i`에 대해서 `matrix[0][i] = 0`, `matrix[1][i] = 1`으로 설정하고 lower를 1씩 감소시킴
3. 위의 과정 끝에 upper와 lower가 0이라면, 주어진 조건을 만족하는 매트릭스가 존재하는 것이고, 아니라면 주어진 조건에 부합하는 매트릭스를 만들지 못한다는 것

## Code
<pre>
<code>
var reconstructMatrix = function(upper, lower, colsum) {
    var c = colsum.length;
    var result = [Array(c).fill(0), Array(c).fill(0)];
    
    var up = 0, down = 0;
    for (let i = 0; i < c; i++) {
        if (colsum[i] == 2) {
            result[0][i] = 1;
            result[1][i] = 1;
            upper--;
            lower--;
        }
        if (upper < 0 || lower < 0) return [];
    }
    
    for (let i = 0; i < c; i++) {
        if (colsum[i] == 1) {
            if (upper > lower) {
                result[0][i] = 1;
                upper--;
            } else {
                result[1][i] = 1;
                lower--;
            }
        }
    }
    
    if (upper == 0 && lower == 0) return result;
    else return [];
};
</code>
</pre>
