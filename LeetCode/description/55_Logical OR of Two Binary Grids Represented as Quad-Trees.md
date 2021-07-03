# 558. Logical OR of Two Binary Grids Represented as Quad-Trees

출처 : https://leetcode.com/problems/logical-or-of-two-binary-grids-represented-as-quad-trees/

## 문제

A Binary Matrix is a matrix in which all the elements are either  **0**  or  **1**.
(Binary Matrix는 모든 요소가 **0**과 **1**로 이루어진 매트릭스이다.)

Given  `quadTree1`  and  `quadTree2`.  `quadTree1`  represents a  `n * n`  binary matrix and  `quadTree2`  represents another `n * n`  binary matrix.
(`quadTree1`과 `quadTree2`가 주어진다. 두 메트릭스는 모두 `n * n`크기이다.)

Return  _a Quad-Tree_  representing the  `n * n`  binary matrix which is the result of  **logical bitwise OR**  of the two binary matrixes represented by  `quadTree1`  and  `quadTree2`.
(두 Binary Matrix `quadTree1`과 `quadTree2`의 **논리 합(OR)**연산의 결과를 구하여라)

Notice that you can assign the value of a node to  **True**  or  **False**  when  `isLeaf`  is  **False**, and both are  **accepted**  in the answer.
(`isLeaf`가 **False**일때 각 노드의 값을 **True** 또는 **False** 할당할 수 있고, 모두 답에서 허용된다.)

(Quad-Tree의 구조에 대한 설명)

A Quad-Tree is a tree data structure in which each internal node has exactly four children. Besides, each node has two attributes:

-   `val`: True if the node represents a grid of 1's or False if the node represents a grid of 0's.
-   `isLeaf`: True if the node is leaf node on the tree or False if the node has the four children.

class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;
}

We can construct a Quad-Tree from a two-dimensional area using the following steps:

1.  If the current grid has the same value (i.e all  `1's`  or all  `0's`) set  `isLeaf` True and set  `val`  to the value of the grid and set the four children to Null and stop.
2.  If the current grid has different values, set  `isLeaf`  to False and set  `val`  to any value and divide the current grid into four sub-grids as shown in the photo.
3.  Recurse for each of the children with the proper sub-grid.

![](https://assets.leetcode.com/uploads/2020/02/11/new_top.png)

If you want to know more about the Quad-Tree, you can refer to the [wiki](https://en.wikipedia.org/wiki/Quadtree).

**Quad-Tree format:**

The input/output represents the serialized format of a Quad-Tree using level order traversal, where  `null`  signifies a path terminator where no node exists below.
(input/output의 표현은 Quad-Tree를 레벨 순회하여 얻은 직렬화 형식이다. `null`은 아래에 노드가 없음을 말합니다.)

It is very similar to the serialization of the binary tree. The only difference is that the node is represented as a list  `[isLeaf, val]`.
(이진 트리의 직렬화와 매우 비슷해보인다. 유일한 차이점은 노드에 대한 표현이 `[isLeaf, val]`인 것이다.)

If the value of  `isLeaf`  or  `val`  is True we represent it as  **1**  in the list `[isLeaf, val]`  and if the value of  `isLeaf`  or  `val`  is False we represent it as  **0**.

## 예제

- Example 1
![](https://assets.leetcode.com/uploads/2020/02/11/qt1.png)  ![](https://assets.leetcode.com/uploads/2020/02/11/qt2.png)
	```
	Input: quadTree1 = [[0,1],[1,1],[1,1],[1,0],[1,0]], 
		quadTree2 = [[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
	Output: [[0,0],[1,1],[1,1],[1,1],[1,0]]
	
	Explanation: quadTree1 and quadTree2 are shown above. You can see the binary matrix which is represented by each Quad-Tree.
	If we apply logical bitwise OR on the two binary matrices we get the binary matrix below which is represented by the result Quad-Tree.
	Notice that the binary matrices shown are only for illustration, you don't have to construct the binary matrix to get the result tree.
	```
	![](https://assets.leetcode.com/uploads/2020/02/11/qtr.png)
	
## 접근방법

- DFS로 두 트리를 탐색하면서 노드의 isLeaf 여부에 따라 연산을 나눠서 생각
	- 둘 다 Leaf인 경우 : OR연산을 바로 수행
	- 둘 중 하나만 Leaf인 경우 값에 따라 결과가 달라짐
		- Leaf노드의 값이 1이라면 연산 결과는 isLeaf = true, val = 1 인 노드
		- Leaf노드의 값이 0이라면 연산 결과는 isLeaf = false, val = Leaf가 아닌 노드와 동일
	- 둘 다 Leaf가 아닌 경우 
		- topLeft, Right / bottomLeft, Right 각각을 계산
		- 계산 결과를 토대로 isLeaf와 val를 업데이트

## Code
<pre>
<code>
var intersect = function(quadTree1, quadTree2) {
    function combine(nodes) {
        if (nodes.every(node => node.val && node.isLeaf)) return 1;
        else return -1;
    }
    
    function DFS(root1, root2) {
        if (root1.isLeaf == root2.isLeaf && root1.isLeaf == true) {
            root1.val |= root2.val;
            return root1;
        }
        
        if (root1.isLeaf == true && root2.isLeaf == false) {
            if (root1.val == 1) {
                return root1;
            } else {
                return root2;
            }
        }
        
        if (root1.isLeaf == false && root2.isLeaf == true) {
            if (root2.val == 1) {
                return root2;
            } else {
                return root1;
            }
        }
        
        var root = new Node(0,0,null,null,null,null);
        root.topLeft = DFS(root1.topLeft, root2.topLeft);
        root.topRight = DFS(root1.topRight, root2.topRight);
        root.bottomLeft = DFS(root1.bottomLeft, root2.bottomLeft);
        root.bottomRight = DFS(root1.bottomRight, root2.bottomRight);
        var val = combine([root.topLeft, root.topRight, root.bottomLeft, root.bottomRight]);
        if (val != -1) root = new Node(val, 1, null, null, null, null);
        return root;
    }
    
    return DFS(quadTree1, quadTree2)
};
</code>
</pre>
