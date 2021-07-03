# 106. Construct Binary Tree from Inorder and Postorder Traversal
출처 : https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/

## 문제

Given inorder and postorder traversal of a tree, construct the binary tree.
(트리의 중위순회와 후위순회 결과가 주어지면, 그러한 결과를 만드는 이진 트리를 만들어라.)

**Note:**  
You may assume that duplicates do not exist in the tree.
(트리에 중복 노드는 없다.)

## 예제

- Example
	```
	Inorder = [9,3,15,20,7]
	Postorder = [9,15,7,20,3]
	
	Binary Tree =
	    3
	   / \
	  9  20
	    /  \
	   15   7
	```
	
## 접근방법

주어진 중위순회(Inorder)와 후위순회(Postorder)는 아래와 같은 순서로 트리를 탐색함
- 중위순회 : Left -> Root -> Right
- 후위순회 : Left -> Right -> Root

이를 통하여 후위순회의 마지막 값이 트리의 루트임을 확인할 수 있고, 얻어진 루트 값과 중위순회를 이용하여 루트의 왼쪽 하위 트리와 오른쪽 하위 트리의 노드를 분류할 수 있다.
```
Inorder = [9,3,15,20,7], Postorder = [9,15,7,20,3]

// 후위순회의 마지막 요소는 root값
Root = 3

// inorder를 루트값을 기준으로 나눔
Inorder of Left_SubTree = [9]
Inorder of Right_SubTree = [15,20,7]
```
위의 예와 같이 중위순회 값을 분류 시에 원래 순서를 해치지 않게 하면, 얻어진 두 배열 또한 중위순회의 규칙을 따름.
그리고 이를 통해 후위순회 역시 두 개의 후위순회 배열로 나눌 수 있음
```
Postorder Of Left_SubTree = [9]
Postorder Of Right_SubTree = [15,7,20]
```
Left, Right 각각의 서브트리에 대하여 위의 과정을 다시 거치게 되면 전체 트리의 모형을 알 수 있음
```
// Left
Inorder of Left_SubTree = [9], Inorder of Left_SubTree = [9]
Root = 9
Left = null, Right = null

//Right
Inorder of Right_SubTree = [15,20,7], Postorder Of Right_SubTree = [15,7,20]
Root = 20
left = 15, right = 7
```

위의 결과들을 종합하여 알 수 있은 최종 이진트리의 모형은 다음과 같음
```
    3
   / \
  9  20
    /  \
   15   7
```
 
## Code
<pre>
<code>
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
    var rootVal = postorder[postorder.length -1];
    
    if (inorder.length == 0) return null;
    if (inorder.length == postorder.length && inorder.length == 1) {
        return new TreeNode(rootVal);
    }
    
    var leftNodes_inorder = [];
    var rightNodes_inorder = [];
    var pivot = inorder.indexOf(rootVal);
    inorder.forEach((val, idx) => {
        if (idx < pivot) {
            leftNodes_inorder.push(val);
        } else if (idx > pivot) {
            rightNodes_inorder.push(val);
        } 
    });
    
    var leftNodes_postorder = [];
    var rightNodes_postorder = [];
    postorder.forEach(val => {
        if (val == rootVal) return;
        
        if (leftNodes_inorder.indexOf(val) != -1) {
            leftNodes_postorder.push(val);
        } else {
            rightNodes_postorder.push(val);
        }
    });
    
    
    var leftTree = buildTree(leftNodes_inorder, leftNodes_postorder);
    var rightTree = buildTree(rightNodes_inorder, rightNodes_postorder);
    
    return new TreeNode(rootVal, leftTree, rightTree);
};
</code>
</pre>
