# 1583. Count Unhappy Friends
출처: https://leetcode.com/problems/count-unhappy-friends/

## 문제

### 번역

항상 **짝수**인 `n`명의 친구에 대한 `preferences(선호도)` 리스트가 주어진다.

각 사람 `i`의 `preferences[i]`는 **선호도 순서로 정렬**된 친구의 리스트이다. 다른말로, 리스트에서 일찍 나온 친구는 늦게 나오는 친구보다 더 선호된다는 것이다. 리스트에서 친구는 정수 `0`에서 `n-1`로 표현된다.

모든 친구들은 둘씩 짝지어 진다. 짝은 리스트 `pairs`로 주어지고, `pairs[i] = [xi, yi]`는  `xi`와 `yi`이 짝이 되었고, `yi`와 `xi`이 짝지어진 것을 가르킨다.

하지만, 이 짝짓기는 일부 친구들을 불행하게 할수도 있다. 친구 `x`가 `y`와 짝이고, `u`와 `v`가 짝일때 다음과 같은 관계라면 `x`는 불행하다.
- `x`는 `y`보다 `u`를 더 선호하고
- `u`는 `v`보다 `x`를 더 선호한다.

_불행한 친구의 수_ 를 반환하라.

### 원문

You are given a list of `preferences` for `n` friends, where  `n`  is always  **even**.

For each person  `i`, `preferences[i]` contains a list of friends **sorted**  in the  **order of preference**. In other words, a friend earlier in the list is more preferred than a friend later in the list. Friends in each list are denoted by integers from  `0`  to  `n-1`.

All the friends are divided into pairs. The pairings are given in a list `pairs`, where  `pairs[i] = [xi, yi]`  denotes  `xi` is paired with  `yi`  and  `yi`  is paired with  `xi`.

However, this pairing may cause some of the friends to be unhappy. A friend  `x` is unhappy if  `x` is paired with  `y` and there exists a friend  `u` who is paired with  `v` but:

-   `x` prefers  `u` over  `y`, and
-   `u` prefers  `x` over  `v`.

Return  _the number of unhappy friends_.

## Example
```
Input: n = 4, preferences = [[1, 2, 3], [3, 2, 0], [3, 1, 0], [1, 2, 0]], pairs = [[0, 1], [2, 3]]
Output: 2
Explanation:
Friend 1 is unhappy because:
- 1 is paired with 0 but prefers 3 over 0, and
- 3 prefers 1 over 2.
Friend 3 is unhappy because:
- 3 is paired with 2 but prefers 1 over 2, and
- 1 prefers 3 over 0.
Friends 0 and 2 are happy.
```

## 접근 방법

`x`의 불행 여부를 판가름하기 위해서는 다음 두가지 질문에 대한 답변이 필요하다.
1. `x`는 `x`의 현재 짝보다 더 선호하는 짝이 존재하는가
2. 선호하는 친구가 존재한다면, 그 친구는 자신의 현재 짝보다 `x`를 더 선호하는가

`pairs[i] = [x, y]`라 가정하고, 위 질문에 대한 답변을 구하는 해보자. 첫 번째 질문에 대한 답부터 생각해보면, `preferences[x]`를 탐색하는 것으로 답을 구할 수 있다. `preferences[x]`가 `x`의 선호도를 기준으로 내림차순 정렬이 되어 있다고 문제에서 얘기하고 있다. 만약, `preferences[x]`에서 `y`이전에 어떤 값이 먼저 나온다면 `x`는 `y`보다 선호하는 친구들이 있다는 것이고 이 친구들에 대해서 두 번째 질문에 대한 답을 해야한다.
<pre>
<code>
for (let i = 0; i < preferences[x].length; i++) {
	if (preferences[x][i] == y) { break; }
	
	const u = preferences[x][i];
	// second question check
}
</code>
</pre> 
  
두 번째 질문에 대한 답변을 해보자. `preferences[x] = [u, y], pairs[j] = [u, v]`라고 하자. `x`는 `y`보다 `u`를 더 선호한다. 이에  `u`가 선호하는 친구에 대한 정보를 살펴보고, `u`의 현재 짝인 `v`보다 `x`가 더 선호되는지 여부를 확인해야된다. 즉, `preferences[u]`에서 `v`가 나오기 전에 `x`가 나오는지 살펴봐야 한다.
<pre>
<code>
cur_pair = false;	// v가 나왔는지 체크하는 변수
for (let j = 0; j < preferences[u].length; j++) {
	if (!cur_pair && preferences[u][j] == x) { 
		// x is unhappy!!
		break;
	}
	if (preferences[u][j] == v) { cur_pair = true; }
}
</code>
</pre>

위의 두 코드를 조합하여 `x`의 행복 여부를 체크할 수 있다. 여기서 코드를 조금 더 간결하게 변형하고자 한다. 위 코드에서 반복문을 통해 수행하는 과정들이 `preferences[x]`에서 `y`를 찾고, `preferences[u]`에서 `v`와 `x`를 찾는 일이다. 이를 언어에 내장되어 있는 함수로 대체해보면 다음과 같다.
<pre>
<code>
x_cur_pair = preferences[x].indexOf(y);
for (let i = 0; i < x_cur_pair; i++) {
	u = preferences[x][i]
	if (preferences[u].indexOf(v) > preferences[i].indexOf(x)) { 
		// x is unhappy!!
	}
}
</code>
</pre>
 
 이전 코드에 비해서 직접적으로 보이는 반복문의 수가 줄어들었고, 조건절의 의미도 명확해졌다. 남은 일은 `n`명의 친구에 대해서 위 과정을 반복하는 것이다.
<pre>
<code>
const pair_info = new Array(n).fill(0);
for (let [x, y] of pairs) {
	pair_info[x] = preferences[x].indexOf(y);
	pair_info[y] = preferences[y].indexOf(x);
}

for (let i = 0; i < n; i++) {
	for (let j = 0; j < pair_info[i]; j++) {
		u = preferences[i][j]
		if (pair_info[u] > preferences[u].indexOf(x)) { 
			// unhappy!!
		}
	}
}
</code>
</pre>
 
## Full Code
|language|url|
|--------|---|
|Javascript|[1583.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1583.js)|
