# 689. Maximum Sum of 3 Non-Overlapping Subarrays

출처: https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/

## 문제

In a given array  `nums`  of positive integers, find three non-overlapping subarrays with maximum sum.

Each subarray will be of size  `k`, and we want to maximize the sum of all  `3*k`  entries.

Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, return the lexicographically smallest one.

양의 정수로 구성된 배열 `nums`에서 합이 최대가 되는 3개의 겹치지 않는 서브배열을 찾아라.

각 서브배열은 `k` 크기를 가지며, `3*k`개 원소의 합이 최대가 되기를 바란다.

결과로 각 배열의 시작 지점의 지시자(인덱스)의 리스트를 반환하라. 만약 답이 여러개 존재한다면, 사전적 순서 상 가장 작은 것을 반환하라.

## Example
```
Input: [1,2,1,2,6,7,5,1], 2
Output: [0, 3, 5]
Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.
```

## 접근 방법

각 인덱스 위치에서 만들어지는 k 사이즈의 서브배열의 합을 미리 계산. 슬라이딩  윈도우 방식으로 O(n) 시간에 합을 계산한다.
<pre>
<code>
const arr_sum = Array(nums.length - k + 1)
let sum = 0
for (let i = 0; i < nums.length; i++) {
	sum += nums[i];
	if (i >= k) {
		sum -= nums[i - k];
	}
	if (i >= k-1) {
		arr_sum[i - k + 1] = sum;
	}
}
</code>
</pre>

위의 `arr_sum`을 기반으로 해서 다이나믹 프로그래밍 방식으로 단계적으로 해답을 찾아나간다. dp의 값이 다음과 같은 의미가 될 수 있도록 구성해 간다.
- dp[i][j][0] : 인덱스 0 ~ j 중, i+1개( 0 <= i < 3)를 선택하여 얻을 수 있는 최대 합
- dp[i][j][1] : 최대합을 만드는데 사용된 값 중에서 마지막에 더해진 값의 인덱스

구체적으로 dp는 아래의 과정을 통해서 만들어진다.
- dp[0][j] = arr_sum의 인덱스 0 ~ j 중에서 **1개**를 선택할 때, 가질 수 있는 최대 값과 그 위치
```
dp[0][j] = dp[0][j-1][0] > arr_sum[j] ? dp[0][j-1] : [arr_sum[j], j]
```

- dp[1][j] = arr_sum의 인덱스 0 ~ j 중에서 **2개**를 선택할 때, 가질 수 있는 최대 값과 그 위치
```
dp[1][j] = dp[1][j-1][0] > dp[0][j-k][0] + arr_sum[j] ? dp[1][j-1] : [dp[0][j-k][0] + arr_sum[j], j]
```
※ 위에서 `dp[0][j-k][0] + arr_sum[j]`를 집중해서 봐야한다. 겹치지 않는 서브배열을 구하는 것이 목표이기 때문에 `arr_sum[j]`가 포함되기 위해서는 이전에 선택된 서브배열에 `j`위치의 값이 포함되어서는 안된다. 이 때문에 `dp[0][j - k]`의 위치. 즉, `j`가 포함되지 않은 위치의 최대 값을 참조해 오는 것이다. dp[2]에서도 마찬가지

- dp[2][j] = arr_sum의 인덱스 0 ~ j 중에서 **3개**를 선택할 때, 가질 수 있는 최대 값과 그 위치
```
dp[2][j] = dp[2][j-1][0] > dp[1][j-k][0] + arr_sum[j] ? dp[2][j-1] : [dp[1][j-k][0] + arr_sum[j], j]
```

예제의 `nums`와 `k`를 대상으로 dp를 계산하여 표로 나타내면 아래와 같다.
|index|0|1|2|3|4|5|6|7|
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|nums|1|2|1|2|6|7|5|1|
|k_sum|3|3|3|8|13|12|6|-
|dp[0]|[3,0]|**[3,0]**|[3,0]|[8,3]|[13,4]|[13,4]|[13,4]|-
|dp[1]|-|-|[6,2]|**[11,3]**|[16,4]|[20,5]|[20,5]|-
|dp[2]|-|-|-|-|[19,4]|[23,5]|**[23,5]**|-

위 표를 이용해서 답은 아래와 같이 dp[2]부터 dp[0]까지 순차적으로 찾아갈 수 있다.
1. dp[2][nums.length - k] = [23, **5**]
2. dp[1][**5** - k] = [11, **3**]
3. dp[0][**3** - k] = [3, **0**]
4. 각 단계에서 얻은 인덱스를 정렬 => (0, 3, 5)

## Full Code
|language|url|
|--------|---|
|Javascript|[689.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/689.js)|
