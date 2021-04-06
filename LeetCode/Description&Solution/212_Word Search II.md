# 212. Word Search II

출처: https://leetcode.com/problems/word-search-ii/

## 문제

Given an  `m x n`  `board` of characters and a list of strings  `words`, return  _all words on the board_.

Each word must be constructed from letters of sequentially adjacent cells, where  **adjacent cells**  are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

문자로 구성된 `m x n` `board`와 문자열 리스트 `words`가 주어지면, _보드에서 모든 단어를_ 반환하라.

각 단어는 연속적으로 인접한 셀의 문자로 구성되어야 하며, 인접한 셀은 수직, 수평 이웃을 말한다. 한 단어에서 같은 셀은 한번만 이용되어야 한다.

## Example
![](https://assets.leetcode.com/uploads/2020/11/07/search1.jpg)
```
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
```
## 접근 방법

보드의 셀을 탐색해가며 단어를 찾기 위해서 주어진 `words`를 **트라이(trie)** 구조로 변경할 필요가 있다. 트라이 구조에서 단어를 찾는 기능을 문제에 맞게 수정하여 이 문제를 해결하고자 한다.

트라이에서는 단어 혹은 접두어가 주어지면 해당 주어진 단어를 분해하여 문자 노드의 유무를 확인하며 탐색하는 과정을 거치는데, 
<pre>
<code>
function find(word) {
	let node = this.root;
	for (let ch of word) {
		if (!node.has(ch) {
			return false;
		}
		node = node.get(ch);
	}
	if (node != null && node.isEnd()) {
		return true;
	}
	return false;
}
</code>
</pre>

문제에서 셀을 탐색하는 과정이 사실 위의 코드에서 입력으로 주어진 word를 반복문으로 탐색하는 것과 같다. 
고려해야 하는 점은 한 지점에서 4방향(상, 하, 좌, 우)에 대한 탐색을 해야하고 한 방향에 대한 탐색이후, 백트래킹으로 돌아와야 한다는 것이다.
이를 위해서 재귀형식으로 변경하여 아래와 같이 코드를 구성하였다. 또한 기존에는 한번의 탐색이 끝난 이후, 마지막에 한번 단어가 저장되어있는지 체크했다면,
여기서는 각 단계마다 해당 트라이 노드가 단어를 갖고 있는지 체크해야한다.

<pre>
<code>
var result = [];
function find(board, pos, trie) {
	ch = board[pos[0]][pos[1]];
	if (!trie.has(ch)) {
		return;
	}
	if (trie.isEnd()) {
		result.push(trie.word)
	}
	possible_paths = [[pos[0]-1, pos[1]], [pos[0], pos[1]+1], [pos[0]+1, pos[1]], [pos[0], pos[1]-1]];
	for (let path of possible_paths) {
		// board의 경계값 체크
		if (path[0] < 0 && path[0] >= board.length && path[1] < 0 && path[1] >= board[0].length) {
			continue;
		}
		find(board, path, trie.get(ch);
	}
}
</code>
</pre>

여기에서 한가지를 더 고려해야 한다. 위의 코드에서는 board의 탐색을 끝내는 조건이 탐색 가능한 트라이 노드가 없을 때 이다. 
최악의 경우 (0, 0) 위치에서 (m, n)위치까지 탐색을 할 가능성이 있다는 것이다. 위 예제를 예로 들면, 
```
words = ["oath","pea","eat","rain"]
```
주어진 단어는 길어봐야 4글자인데, 그 이상을 탐색할 필요성이 있는지에 대해서 고려하자는 것이다. 해결책은 재귀로 파고 들어갈 수 있는 깊이를 글자의 최대 글자수로 제한하는 것이다. 이를 위해 아래와 같이 코드를 수정하였다.

<pre>
<code>
var result = [];
function find(board, pos, trie, limit) {
	ch = board[pos[0]][pos[1]];
	if (!trie.has(ch) || limit == 0) {
		return;
	}
	...
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|Javascript|[212.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/212.js)|
