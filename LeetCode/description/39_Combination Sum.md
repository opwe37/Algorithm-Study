# 39. Combination Sum
출처: https://leetcode.com/problems/combination-sum/

## 문제

Given an array of  **distinct**  integers  `candidates`  and a target integer  `target`, return  _a list of all  **unique combinations**  of_ `candidates` _where the chosen numbers sum to_ `target`_._  You may return the combinations in  **any order**.

The  **same**  number may be chosen from  `candidates`  an  **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

It is  **guaranteed**  that the number of unique combinations that sum up to  `target`  is less than  `150`  combinations for the given input.

### 요약
**중복 값이 없는** 정수 배열 `candidates`와 목표 정수 `target`이 주어지면, 원소의 합이 `target`을 만드는 모든 조합의 리스트를 반환하라. 동일한 숫자가 여러번 선택되어도 된다.

## 예제
```
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
```
```
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

## 접근 방법

주어진 배열의 조합을 구하는 메소드는 다음과 같다.
<pre>
<code>
function combinations(arr, k) {
	result = [];
	function dfs(elements, start, num) {
		if (num == 0) {
			result.push(elements);
			return;
		}
		for i = start to arr.length {
			elements.push(arr[i])
			dfs(elements, i+1, num-1);
			elements.pop()
		}
	}
	dfs([], 0, k);
	return result;
}
</code>
</pre>
위의 코드는 DFS 방식으로 k개의 원소를 갖는 조합을 구하는 코드이다. 이 코드에서 필요한 부분을 수정하여 원하는 해답을 얻을 수 있다.

정답을 출력하기 위해서 수정이 필요 또는 검토해야하는 부분은 다음과 같다.
1. **중복조합**을 구하는 코드로 수정이 필요
2. 몇 개의 원소가 필요할지 불분명

첫 번째, 문제에서 '각 원소는 여러번 선택되될 수 있다.'고 말했기 때문에 반환해야하는 정답은 중복조합으로 얻을 수 있는 값 중 일부일 것이다. 중복조합을 위해 위의 코드 중 수정 해야하는 부분은 DFS로 파고 들어가는 부분 `dfs(elements, i+1, num-1)`이다. 특히, 재귀로 `dfs`를 호출하면서 `start` 를 `+1` 씩 증가시키는 부분의 수정이 필요하다. 이는 일반적인 조합을 계산하면서 중복 선택을 방지하기 위함이기 때문에 이를 증가시키지 않고 `i`를 그대로 넘기면 중복조합을 구할 수 있다.

두 번째, 중복조합 이기때문에, 몇개의 원소가 `target`을 만들어 낼 수 있을지 불분명하다. 주어진 배열의 최소값을 구하여 어림짐작하는 방법도 있겠지만, 여기서는 조합의 원소의 합이 `target`이 되어야한다는 점을 이용고자 한다.
<pre>
<code>
function dfs(elements, start, cur_target) {
	if (cur_target <= 0) {
		if (cur_target == 0) result.push(elements);
		return;
	}
	for i = start to arr.length {
		elements.push(arr[i])
		dfs(elements, i, cur_target - arr[i]);
		elements.pop()
	}
}
</code>
</pre>
변경점
1. `dfs`의 파라미터 : `k`가  `cur_target`으로 변경
	- `dfs`가 재귀로 호출되는 부분에서는 `cur_target`부분에 `cur_target - arr[i]`을 넘김
	- `elements`에 `arr[i]`이 추가됨으로 인해, 다음 단계에서 구해야하는 목표 값이 `arr[i]`만큼 작아짐을 의미
2. `dfs`의 재귀 종료 조건: `cur_target <= 0`으로 변경 및 `cur_target == 0`일때 결과에 추가
	- `arr`은 양의 정수를 원소로 갖기 때문에 음수로 낮아진 값을 양의 방향으로 값을 올릴 수 없음
	- `cur_target == 0`은 `elements`의 합이 `target`이 되었음을 의미

</code>
</pre>

## Full Code
|language|url|
|--------|---|
|JavaScript|[39.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/39.js)|
|Python3|[39.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/39.py)|
