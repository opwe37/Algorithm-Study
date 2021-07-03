# 1632. Rank Transform of a Matrix
출처: https://leetcode.com/problems/rank-transform-of-a-matrix/

## 문제

Given an  `m x n`  `matrix`, return  _a new matrix_ `answer` _where_ `answer[row][col]` _is the_ _**rank**  of_ `matrix[row][col]`.

`m x n` 크기의 `matrix`가 주어지면, `answer[row][col]`이 `matrix[row][col]`의 _**순위**_ 인 _새로운 매트릭트_ `answer`를 반환하라.

The  **rank**  is an  **integer**  that represents how large an element is compared to other elements. It is calculated using the following rules:

-   The rank is an integer starting from  `1`.
-   If two elements  `p`  and  `q`  are in the  **same row or column**, then:
    -   If  `p < q`  then  `rank(p) < rank(q)`
    -   If  `p == q`  then  `rank(p) == rank(q)`
    -   If  `p > q`  then  `rank(p) > rank(q)`
-   The  **rank**  should be as  **small**  as possible.

**순위**는 한 요소가 다른 요소와 비교했을 때 얼마나 큰지를 표현하는 **정수**이다. 다음의 규칙에 따라 계산되어진다:
- 순위는 `1`부터 시작한다.
- 만약 두 요소 `p`와 `q`가 **같은 열 또는 행**에 있다면,
	- 만약 `p < q`라면 `rank(p) < rank(q)`
	- 만약 `p == q`라면 `rank(p) == rank(q)`
	- 만약 `p > q`라면 `rank(p) > rank(q)`
- **순위**는 가능한 **작아야** 한다.

It is guaranteed that  `answer`  is unique under the given rules.

주어진 규칙에 따라 `answer`는 유일하다.

## 예제
![](https://assets.leetcode.com/uploads/2020/10/18/rank1.jpg)
```
Input: matrix = [[1,2],[3,4]]
Output: [[1,2],[2,3]]
Explanation:
The rank of matrix[0][0] is 1 because it is the smallest integer in its row and column.
The rank of matrix[0][1] is 2 because matrix[0][1] > matrix[0][0] and matrix[0][0] is rank 1.
The rank of matrix[1][0] is 2 because matrix[1][0] > matrix[0][0] and matrix[0][0] is rank 1.
The rank of matrix[1][1] is 3 because matrix[1][1] > matrix[0][1], matrix[1][1] > matrix[1][0], and both matrix[0][1] and matrix[1][0] are rank 2.
```

![](https://assets.leetcode.com/uploads/2020/10/18/rank3.jpg)
```
Input: matrix = [[20,-21,14],[-19,4,19],[22,-47,24],[-19,4,19]]
Output: [[4,2,3],[1,3,4],[5,1,6],[1,3,4]]
```
## 접근 방법
1. 매트릭스(행렬)내에 중복되는 숫자가 없다고 가정해보자.

숫자를 오름차순으로 정렬한 후, 맨 앞 숫자를 하나씩 추출하여 해당 숫자의 행과 열을 탐색하여 현재 알고 있는 최대 랭크를 가져와 +1 하여 입력한다.

최대 랭크를 알기위하여 탐색하는 과정에서 시간을 줄이기 위해 각 행과 열의 최대 랭크를 기록하는 리스트(혹은 배열)을 선언하여 이용하도록 한다.

- `max_rank_by_row` = 크기가 m인 리스트(혹은 배열)
- `max_rank_by_col` = 크기가 n인 리스트(혹은 배열)

만약 `max_rank_by_row[2] = 3`은 2행에 있는 랭크 중 가장 높은 랭크가 3임을 의미한다. 만약 `max_rank_by_col[1] = 4`은 1열에 있는 랭크 중 가장 높은 랭크가 4임을 의미한다.

이 두 리스트를 유지하기 위해서 숫자의 랭크가 정해질 때마다 업데이트한다.

2. 매트릭스 내에 중복되는 숫자가 존재

본 문제로 돌아와서 매트릭스 내의 중복이 존재한다면 어떻게 해야하는가. 전체적인 과정은 중복이 없는 문제와 유사하게 진행된다. 차이점은 동일한 숫자를 처리하기위해 그룹화를 하여 처리한다는 점이다.

여기서 그룹화란, 만약 어떤 매트릭스의 1행이 `[4, 10, 9, 1, 4, 5]`라고 할때, 숫자 4의 순위을 확인하기 위해서는 1행, 1열, 5열의 최대 순위를 확인한다. 이렇게 숫자와 연관되어 있는 행 또는 열을 묶는 것을 그룹화라는 단어로 사용하였다. 이때, 동일 숫자일지라도 연관되는 행과 열이 다를 수 있음을 알아야한다. 즉, 서로소 집합관계라는 것이다.

동일 숫자를 내부적으로 서로소 집합으로 그룹화하기 위해 **Union-Find 알고리즘**을 적용한다. Union-Find 알고리즘을 적용하면서 연관된 행과 열이 같은 곳을 가르키도록 한다. 이 과정에서 find()의 결과로 나오는 루트에 대해서 최대 랭크를 저장하고, 후에 다시한번 동일 숫자를 돌면서 find() 결과로 나오는 값에 +1을 하여 저장한다.

다음 코드는 Union-Find를 이용하여 동일 원소를 그룹화하고, 동시에 순위를 기록하는 코드이다.
```
// m: matrix row, n: matrix column

// disjoin set을 위한 배열 ds선언
// 0 ~ m-1 : row, m ~ n-1 : column
// ds[i] = 루트 노드를 가르키는데,
// 예외적으로, if i == root : ds[i] = 순위
ds = array(m+n).fill(-1)

// same_val_sites : 동일 값 원소의 row, column을 저장하고 있는 배열
same_val_sites.forEach(site => {
	pi = find(ds, site.row), pj = find(ds, m + site.col);
	// 한 원소의 row, column은 ds에서 같은 집합이여야 한다.
	if (pi != pj) {
		ds[pi] = min(ds[pi], ds[pj], -max(max_rank_by_row[site.row], max_rank_by_col[site.col])-1);
		ds[pj] = pi;
	}
});

function find(ds, i) {
	return ds[i] < 0 ? i : ds[i] = find(ds, ds[i]);
}
```


## Full Source Code
|lang|url|
|-|-
|JavaScript|https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1632.js|
