# 746. Min Cost Climbing Stairs
출처: https://leetcode.com/problems/min-cost-climbing-stairs/

## 문제

### 번역

`cost[i]`가 계단의 `ith` 계단을 오를때의 비용인, 정수 배열 `cost`가 주어진다. 비용을 지불하면 계단 한개를 오를지, 두개를 오를지 선택할 수 있다.

인덱스 `0`인 계단부터 시작할지, 인덱스 `1`인 계단에서 시작할지 선택할 수 있다.

_끝에 도달했을 때 최소 비용_ 을 반환하라.

### 원문

You are given an integer array  `cost`  where  `cost[i]`  is the cost of  `ith`  step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index  `0`, or the step with index  `1`.

Return  _the minimum cost to reach the top of the floor_.

## Example
```
Input: cost = [10,15,20]
Output: 15
Explanation: Cheapest is: start on cost[1], pay that cost, and go to the top.
```
```
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: Cheapest is: start on cost[0], and only step on 1s, skipping cost[3].
```

## 접근 방법

꼭대기 위치를 `n`이라고 했을때, `n`위치에 도달할 수 있는 위치는 `n-1`과 `n-2`이다. 어떤 위치 `i`에 도달할때 최소비용을 구하는 함수를 `func(i)`이라 할때, `func(n) = min(func(n-1), func(n-2))`라 할 수 있을 것이다. 이 점화식을 기반으로 하여 **DP**방식으로 문제를 접근할 수 있어 보인다.

`dp[i]`에 대한 정의를 하면 다음과 같다.
- `dp[i]`: `ith`계단을 밟고 윗 계단으로 갈때의 최소 비용
- 즉, `i-1` 계단 혹은 `i-2` 계단을 밟고 `i`에 도달한 비용 + `ith` 계단에 대한 비용
- `dp[i] = min(dp[i-1], dp[i-2]) + cost[i]`

<pre>
<code>
function solution(cost) {
	const n = cost.length;
	const dp = new Array(n).fill(0);
	dp[0] = cost[0];
	dp[1] = Math.min(cost[0] + cost[1], cost[1]);
	
	for (let i = 2; i < n; i++) {
		dp[i] = Math.min(dp[i-1], dp[i-2]) + cost[i];
	}
	return Math.min(dp[n-1], dp[n-2]);
}
</code>
</pre>
 
## Full Code
|language|url|
|--------|---|
|Javascript|[746.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/746.js)|
