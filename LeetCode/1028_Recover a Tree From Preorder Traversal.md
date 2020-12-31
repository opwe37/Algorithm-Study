# 1028. Recover a Tree From Preorder Traversal

출처 : https://leetcode.com/problems/recover-a-tree-from-preorder-traversal/

## 문제

We run a preorder depth-first search (DFS) on the  `root`  of a binary tree.

이진 트리의 `root`에서 전위순회 깊이우선탐색을 수행한다.

At each node in this traversal, we output  `D`  dashes (where  `D`  is the depth of this node), then we output the value of this node. If the depth of a node is  `D`, the depth of its immediate child is  `D + 1`. The depth of the  `root`  node is  `0`.

이 탐색의 각 노드에서, `D`개의 대시(`D`는 해당 노드의 깊이를 의미한다.)를 출력하고 이 노드의 값을 출력한다. 만약 노드의 깊이가 `D`라면, 그것의 직계 아이의 깊이는 `D+1`이다. `root`노드의 깊이는 `0`이다.

If a node has only one child, that child is guaranteed to be  **the left child**.

만약 어떤 노드가 하나의 자식을 갖는다면, 그 자식은 `왼쪽 자식`임이 보증된다.

Given the output  `S`  of this traversal, recover the tree and return  _its_  `root`.

이 탐색의 결과 `S`가 주어지면, 트리를 복구하고 그 트리의 `root`를 반환하라.

## 예제
![](https://assets.leetcode.com/uploads/2019/04/08/recover-a-tree-from-preorder-traversal.png)
```
Input: S = "1-2--3--4-5--6--7"
Output: [1,2,5,3,4,6,7]
```
![](https://assets.leetcode.com/uploads/2019/04/11/screen-shot-2019-04-10-at-114955-pm.png)
```
Input: S = "1-401--349---90--88"
Output: [1,401,null,349,88,90]
```

## 접근방법

입력 `S`에 대해서 분석을 위해 문제에서 얻을 수 있는 정보는 다음과 같다.
1) 숫자 = 노드 값
2) 숫자 앞의 대시 수 = 해당 노드의 깊이(레벨)
3) 전위순회 깊이우선탐색 = 루트-왼쪽 하위트리-오른쪽 하위트리 순서로 값을 출력

3번의 정보로 인하여, 입력 값을 다음의 3가지로 나눌 수 있다.
- 루트
- 왼쪽 하위 트리의 노드
- 오른쪽 하위 트리의 노드

예제 1의 입력 `S`를 예로 들면 다음과 같다.

```
// 왼쪽과 오른쪽을 나누는 기준은 깊이에 대한 정보이며, 현재 단계에서는 깊이 1이 그 기준점이다.
S = "1-2--3--4-5--6--7"

root = 1
left subTree = -2--3--4
right subTree = -5--6--7
```

왼쪽 서브트리를 다시 한번 위와 같은 방식으로 나눌 수 있다. 이때 왼쪽과 오른쪽을 나누는 기준이 깊이는 2가 된다. (기준 깊이 = 부모의 깊이 + 1, 자식의 깊이(레벨)은 부모의 +1 이기때문)
```
subTree = -2--3--4

root = -2
left node = --3
right node = --4
```
오른쪽 서브트리 역시 동일한 과정으로 분해가 가능하다. 이를 이용하여 문제를 풀 수 있다.

위의 과정을 그대로 코드로 옮겨서 재귀를 통해 구현할 수 있으며, Stack을 이용해서 접근할 수도 있다.

주어진 입력을 다음과 같이 value와 depth이라는 이름의 스택 구조에 입력한다고 가정해보자.
```
S = "1-2--3--4-5--6--7"
value : [7,6,5,4,3,2,1]
depth : [2,2,1,2,2,1,0]
```
처음 각 스택에서 pop 연산을 통해 값을 하나씩 뽑는다. 이때 뽑혀진 값들이 루트이다. 이제 두 스택에 남은 값들은 루트의 하위 노드들에대한 정보만이 남게된다.
```
root [value : 1, depth : 0]
value : [7,6,5,4,3,2]
depth : [2,2,1,2,2,1]
```
현재 스택의 탑에 있는 값은 루트의 왼쪽 노드에 대한 정보임이 자명하다. 왜냐하면 전위순회 방식으로 탐색을 진행중이며, 자식이 하나있다면 그것은 왼쪽 노드라고 문제에서 말하고 있기 때문이다. pop연산으로 값을 추출하여 루트와 연결하고 다음 상태를 보자.
```
root = [value : 1, depth : 0]
root.left = [value : 2, depth : 1]
value : [7,6,5,4,3]
depth : [2,2,1,2,2]
```
스택의 탑을 보면 이전에 추출한 깊이(1)보다 1 증가한 2임을 알 수 있는데, 이 또한 위에서 언급한 바와 같은 이유로 이전 노드의 왼쪽 자식임을 알 수 있다. 
```
root = [value : 1, depth : 0]
root.left = [value : 2, depth : 1]
root.left.left = [value : 3, depth : 2]
value : [7,6,5,4]
depth : [2,2,1,2]
```
현재 스택에서 얻을 수 있는 깊이는 2, 이전과 비교하여 증가하지 않았다. 이전 노드의 왼쪽 자식이 없어 부모 노드의 오른쪽으로 이동한 것이다.
```
root = [value : 1, depth : 0]
root.left = [value : 2, depth : 1]
root.left.left = [value : 3, depth : 2]
root.left.right= [value : 4, depth : 2]
value : [7,6,5]
depth : [2,2,1]
```
이제 depth스택의 탑 값은 1이다. 직전에 얻은 노드의 깊이와 비교하면 작아졌다. 즉, depth 가 0인 루트노드의 또 다른 자식임을 의미한다. 이후부터는 같은 과정을 따라가는 과정만이 남았다.

핵심은 `Depth 스택의 탑 값과 직전 노드의 깊이 관계`를 이용하는 것이다.
- i<sup>th</sup> depth < i+1 <sup>th</sup> depth : i+1번째 노드는 i번째 노드의 왼쪽 자식
- i<sup>th</sup> depth == i+1 <sup>th</sup> depth : i+1번째 노드는 i번재 노드와 같은 부모를 두고 있으며, 오른쪽 자식
- i<sup>th</sup> depth > i+1 <sup>th</sup> depth : i+1번째 노드는 깊이가 i+1 <sup>th</sup> depth - 1 인 노드의 오른쪽 자식

(i, i+1은 스택에서 추출되는 순서를 의미. 즉, i+1은 i 바로 다음에 추출되는 값)

## Code

1. Intuitive Approach
<pre>
<code>
var recoverFromPreorder = function(S, lvl = 1) {
    if (S.length == 0) return null;
    
    var value = '';
    var idx;
    for (idx = 0; idx < S.length; idx++) {
        if (S[idx] == '-') break;
        value += S[idx];
    }
    value *= 1;
    
    if (S.length == idx+1) return new TreeNode(value);
    
    var root = new TreeNode(value);
    
    var left = '',
        right = '';
    var countDash = 0;
    
    var tmpS = '';
    for (let i = lvl+idx; i < S.length; i++) {
        if (S[i] != '-' && countDash == lvl) {
            if (tmpS[tmpS.length-1] == '-') {
                left = tmpS.slice(0, -lvl);    
            } else left = tmpS.slice();
            
            countDash = 0;
            tmpS = '';
        }
        
        if (S[i] == '-') countDash++;
        else countDash = 0;
        
        tmpS += S[i];
    }
    if (left == '') left = tmpS;
    else right = tmpS;
    
    root.left = recoverFromPreorder(left, lvl+1);
    root.right = recoverFromPreorder(right, lvl+1);
        
    return root;
};
</code>
</pre>

2. Using Stack
<pre>
<code>
var recoverFromPreorder = function(S, lvl = 1) {
    var stackLvl = [];
    var stackNums = [];
    
    var lvl = 0, num = '';
    for (let i = 0; i < S.length; i++) {
        if (S[i] == '-') {
            lvl++;
            if (S[i+1] != '-') {
                stackNums.push(num *1);
                num = '';
            }
        }
        else {
            if (S[i+1] == '-' || i == S.length-1) {
                stackLvl.push(lvl);
                lvl = 0;
            }
            num += S[i];
            if (i == S.length-1) stackNums.push(num *1);
        }
    }
    
    stackLvl = stackLvl.reverse();
    stackNums = stackNums.reverse();
    
    return buildTree(stackNums, stackLvl);
};

var buildTree = function(nums, level) {
    if (nums.length == 0) return null;
    
    if (nums.length == 1) return new TreeNode(nums.pop());
    
    var curLvl = level.pop();
    var nextLvl = level[level.length -1];
    if (curLvl >= nextLvl) return new TreeNode(nums.pop());
    
    var root = new TreeNode(nums.pop());
    root.left = buildTree(nums, level);
    if (curLvl +1 == level[level.length -1])
        root.right = buildTree(nums, level);
    
    return root;
}
</code>
</pre>
