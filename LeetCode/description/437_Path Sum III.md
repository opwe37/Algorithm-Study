# 437. Path Sum III
출처 : https://leetcode.com/problems/path-sum-iii/

## 문제 


You are given a binary tree in which each node contains an integer value.

각 노드에 정수 값이 포함된 이진트리가 주어진다.

Find the number of paths that sum to a given value.

주어진 값과 동일한 합을 만드는 경로의 수를 구하라.

The path does not need to start or end at the root or a leaf, but it must go downwards (traveling only from parent nodes to child nodes).

경로는 루트 또는 말단 노드에서 시작하거나 끝날 필요는 없지만, 아래쪽으로 이동해야한다 (부모노드에서 자식노드로만 이동).

The tree has no more than 1,000 nodes and the values are in the range -1,000,000 to 1,000,000.

트리는 1,000개의 노드보다 작은 노드를 갖고 있고 값은 -1,000,000 ~ 1,000,000 범위를 갖는다.

## 예제

```
root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8

      10
     /  \
    5   -3
   / \    \
  3   2   11
 / \   \
3  -2   1

Return 3. The paths that sum to 8 are:

1.  5 -> 3
2.  5 -> 2 -> 1
3. -3 -> 11
```

## 접근 방법

문제를 좀 더 쉽게 생각하기 위해서 트리 구조가 아닌 일반 배열에서 구간 합이 특정 값과 일치하는지, 일치한다면 몇개의 구간이 존재하는지 구하는 문제로 변경해보자.

`Prefix Sum 알고리즘`을 이용하여 이 문제를 해결할 수 있다.

- `Prefix Sum` 이란, 배열 [a<sub>1</sub>, a<sub>2</sub>, a<sub>3</sub>, ..., a<sub>n</sub>] 일때 p<sub>i</sub> = a<sub>1</sub> + a<sub>2</sub> + a<sub>3</sub>+  ... + a<sub>i</sub>를 의미한다.

이러한 `Prefix Sum`을 이용하면 구간 합을 빠르게 계산할 수 있는데, 만약  a<sub>2</sub> ~ a<sub>5</sub>의 합을 구하고 싶다면 p<sub>5</sub> - p<sub>1</sub>를 계산하면 된다. 임의의 i, j(i <= j)에 대한 구간 합을 계산하고자 한다면 p<sub>j</sub> - p<sub>i-1</sub>을 계산하면 된다.

임의의 i까지의 p<sub>i</sub>를 알고 있다면, p<sub>i</sub> - value가 p<sub>0</sub> ~ p<sub>i</sub> 중 존재하였는지 체크하는 것을 통해 value를 만드는 구간합의 존재를 체크할 수 있다.

이제 배열이 아닌, 트리 구조에서 생각해보자.

트리 구조에서 또한  배열에서의 문제와 풀이와 크게 다르지 않다. 단지, DFS탐색을 통해 각 노드를 방문하며 Prefix Sum을 구해야 한다는 점에 대해서 DFS의 동작 방식에 따라 주의해야 한다.


## Code
<pre>
<code>
var pathSum = function(root, sum) {
    var dfs = function(root, target, prefixSums, curSum) {
        if (!root) return 0;
        
        let answer = 0;
        curSum += root.val;
        
        if (prefixSums[curSum-target]) {
            answer += prefixSums[curSum-target];
        }
        
        if (prefixSums[curSum]) {
            prefixSums[curSum] += 1;
        } else {
            prefixSums[curSum] = 1;
        }
        
        answer += dfs(root.left, target, prefixSums, curSum);
        answer += dfs(root.right, target, prefixSums, curSum);
        
        prefixSums[curSum]--;
        if (prefixSums[curSum] == 0) delete prefixSums[curSum];
        
        return answer;
    }
    
    let prefixSums = {0 : 1}
    return dfs(root, sum, prefixSums, 0);
};
</code>
</pre>
