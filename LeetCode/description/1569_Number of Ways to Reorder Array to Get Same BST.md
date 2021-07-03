# 1569. Number of Ways to Reorder Array to Get Same BST

출처 : https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/

## 문제
Given an array  `nums` that represents a permutation of integers from `1` to `n`. We are going to construct a binary search tree (BST) by inserting the elements of `nums` in order into an initially empty BST. Find the number of different ways to reorder  `nums`  so that the constructed BST is identical to that formed from the original array `nums`.
(`1 ~ n`까지 숫자의 순열인 배열 `nums`가 주어진다. `nums`의 요소를 순서대로 입력하여 이진 탐색 트리(BST)를 만들려고 한다. 만들어진 BST가 원래의 배열 `nums`와 같도록 `nums`를 재정렬하는 방법의 개수를 찾아라 )

For example, given `nums = [2,1,3]`, we will have 2 as the root, 1 as a left child, and 3 as a right child. The array `[2,3,1]` also yields the same BST but `[3,2,1]` yields a different BST.
(예를들어, `nums = [2,1,3]`이라면 2를 루트로 하여 1은 왼쪽 자식, 3은 오른쪽 자식이 된다. 배열 `[2,3,1]` 또한 같은 BST를 만들지만, `[3,2,1]`은 다른 BST를 만든다.)

Return  _the number of ways to reorder_ `nums` _such that the BST formed is identical to the original BST formed from_ `nums`.
(nums로부터 만들어진 BST와 동일한 BST를 만들도록 nums를 재배열하는 방법의 수를 반환하라.)

Since the answer may be very large, **return it modulo** `10^9 + 7`.
(답이 매우 클수도 있기 때문에, `10^9+7`로 나눈 **나머지를 반환하라**)

## 예제

- Example 1
	![](https://assets.leetcode.com/uploads/2020/08/12/bb.png)
	```
	Input: nums = [2,1,3]
	Output: 1
	Explanation: We can reorder nums to be [2,3,1] which will yield the same BST. There are no other ways to reorder nums which will yield the same BST.
	```
- Example 2
	![](https://assets.leetcode.com/uploads/2020/08/12/ex1.png)
	```
	Input: nums = [3,4,5,1,2]
	Output: 5
	Explanation: The following 5 arrays will yield the same BST: 
	[3,1,2,4,5]
	[3,1,4,2,5]
	[3,1,4,5,2]
	[3,4,1,2,5]
	[3,4,1,5,2]
	```
## 접근방법

분할 정복 방식으로 접근
1. 동일한 트리를 만들기 위해서 루트 노드는 고정되어야 함
2. 왼쪽 서브트리와 오르쪽 서브트리로 나누어서 생각
	- 각 서브트리의 루트 또한 고정 되어 있어야하고, 이를 점점 작은 서브트리로 확장시켜 생각 가능 (요소간 입력 순서가 생김을 의미)
	- 최종적으로 2개이하의 요소가 남게되면, 해당 트리를 만드는 배열 순서는 1개뿐
3. 다음으로, 왼쪽과 오른쪽 배열을 합쳐서 하나의 배열로 만들때, 몇 개의 배열이 만들어지는지 생각해야함
	- 조합(Combination)을 이용하여 수학적 계산이 가능
	- ~l+r~C~l~ (l : 왼쪽 서브트리의 요소 개수, r : 오른쪽 서브트리의 요소 개수)
4. 즉, ~l+r~C~l~ X dfs(l) X dfs(r) 를 반환하는 dfs함수 필요 (dfs는 입력으로 주어진 배열의 수가 3보다 작으면 1반환)

## Code
<pre>
<code>
var mod = BigInt(Math.pow(10, 9) + 7);
var factorial = [BigInt(1), BigInt(1)];

var numOfWays = function(nums) {
    return dfs(nums) - BigInt(1);
};

var dfs = function(list) {
    if (list.length < 3) return BigInt(1);
    
    var root = list[0];
    const left = list.filter(val => val < root);
    const right = list.filter(val => val > root);
    return calcCombi(left.length  + right.length, left.length) * dfs(left) * dfs(right) % mod;
}

var calcCombi = function(n, r) {
    return calcFactorial(n) / (calcFactorial(r) * calcFactorial(n-r));
}

var calcFactorial = function(n) {
    if (factorial[n]) return factorial[n];
    
    factorial[n] = calcFactorial(n-1) * BigInt(n);
    return factorial[n];
}
</code>
</pre>
