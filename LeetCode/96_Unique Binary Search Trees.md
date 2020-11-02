# 96. Unique Binary Search Trees

출처 : https://leetcode.com/problems/unique-binary-search-trees/

## 문제

Given _n_, how many structurally unique **BST's** (binary search trees) that store values 1 ... _n_?
(_n_이 주어지면, 1~_n_을 저장하는 유일한 BST가 몇개인지 구하시오.)

## 예제

- Example 1
	```
	Input: 3
	Output: 5
	Explanation: Given _n_ = 3, there are a total of 5 unique BST's:

	   1         3     3      2      1
	    \       /     /      / \      \
	     3     2     1      1   3      2
	    /     /       \                 \
	   2     1         2                 3
	```
	
## 접근방법

1 ~ n 중에서 임의의 i 가 루트노드인 트리의 수를 구한다고 가정할 때(1 <= i <= n),
BST이기 때문에 왼쪽 서브트리가 될 요소와 오른쪽 서브트리가 될 요소가 정확히 나눠짐
- Left Subtree's Values = 1 ~ i-1
- Right Subtree's Values = i+1 ~ n

이를 활용하면, 해당 문제를 더 작은 문제로 나누어서 생각 가능
즉, i가 루트인 트리의 수를 구하기 위해서 다음 두 문제의 해답을 구하여 곱하면 됨
- 1 ~ i-1로 만들 수 있는 트리의 수를 구하는 문제
-  i+1 ~ n으로 만들 수 있는 트리의 수를 구하는 문제 (= 1 ~ n-i로 만들 수 있는 트리의 수)

위와 같이 작은 문제로 계속 나누다보면 결국 n == 1인 혹은 n == 0인 문제로 축소화되고 이 경우 만들 수 있는 트리의 수는 1개로 자명하므로 이를 다시 역으로 계산하여 올라가면 원하는 답을 얻을 수 있음

## Code
<pre>
<code>
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    var dp = Array(n+1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            const left_n = j - 1;
            const right_n = i - j;

            dp[i] += dp[left_n] * dp[right_n];
        }
    }
    return dp[n];
};
</code>
</pre>
