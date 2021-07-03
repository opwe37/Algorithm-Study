# 968. Binary Tree Cameras

출처: https://leetcode.com/problems/binary-tree-cameras/

## 문제

### 번역

이진 트리에서 트리의 노드에 카메라를 설치할 것이다.

각 카메라는 **부모, 자신 그리고 직계 자식 노드**를 감시한다.

트리의 모든 도느를 감시하기 위해서 필요한 카메라의 최소 수를 계산하라.

### 원문

Given a binary tree, we install cameras on the nodes of the tree.

Each camera at a node can monitor  **its parent, itself, and its immediate children**.

Calculate the minimum number of cameras needed to monitor all nodes of the tree.

## Example
![](https://assets.leetcode.com/uploads/2018/12/29/bst_cameras_01.png)
```
Input: [0,0,null,0,0]
Output: 1
Explanation: One camera is enough to monitor all nodes if placed as shown.
```

![](https://assets.leetcode.com/uploads/2018/12/29/bst_cameras_02.png)
```
Input: [0,0,null,0,null,0,null,null,0]
Output: 2
Explanation: At least two cameras are needed to monitor all nodes of the tree. The above image shows one of the valid configurations of camera placement.
```
## 접근 방법

카메라 설치 여부를 트리의 리프 노드부터 시작해서 루트 노드로 올라가면서 결정하였다. 트리의 리프 노드 부분만을 생각하면 예제1과 같은 상황일 것이다. 이 상황에서 카메라를 설치할 위치는 매우 명확하다. 이점을 이용하기 위해 리프 노드부터 시작하는 것이고, 일종의 **탐욕**적인 접근 방식을 사용한 것이다.

리프노드부터 순차적으로 카메라 여부를 결정하는데, 각 노드는 다음과 같이 세가지 상태에 놓이게 된다.
1. 카메라 설치: `1`
2. 카메라 미설치 _ 다른 카메라에 의해 커버됨 : `0`
3. 카메라 미설치 _ 다른 카메라에 의해 커버되지 않음 : `-1`

각 노드의 상태를 결정하는 방식에 대하여 다음과 같은 규칙을 생각할 수 있다.
- 각 노드는 자식 노드의 상태에 따라 결정되고, 리프 노드의 초기 값은 `-1` 이다. 
- 리프노드의 부모는 자식 노드들이 카메라로 감시가 안되고 있기 때문에 자신에 카메라를 설치(`1`)하는 것으로 자식 노드를 감시 영역 안에 넣어야 할 것이다. 
- 이 행위로 인해서 카메라가 설치된 노드의 부모 또한 감시 영역에 포함될 것이고 이 상태가 바로 `0` 상태가 된다. 
- `0`이 된 노드의 부모를 생각해보면, 이 노드에 카메라를 설치한다면, 자식 노드가 중복 감시되는 상황을 만들기 때문에 카메라를 설치하지 않는 것이 좋고, 현재까지는 카메라에 감시되지 않는 상황이기 때문에 `-1`상태가 된다. (이후부터는 지금까지의 과정을 반복)

이 규칙을 코드로 만들면 다음과 같다. 
<pre>
<code>
let camera_count = 0;
function dfs(root) {
	const left = root.left == null ? null : dfs(root.left);
	const right = root.right == null ? null : dfs(root.right);
	
	// 자식 노드 중, 감시되지 않는 노드가 존재하면, 카메라 설치
	if (left == -1 || right == -1) {
		camera_count += 1;
		return 1;
	}
	
	// 자식 노드 중, 카메라가 설치된 노드가 있다면, 현재 노드는 감시영역에 포함됨
	if (left == 1 || right == 1) {
		return 0;
	}
	
	// 자식 노드가 모두 다른 카메라에 의해 감시되는 상태라면
	return -1;
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|Javascript|[968.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/968.js)|
