# 45. Jump Game II

출처 : https://leetcode.com/problems/jump-game-ii/

## 문제

Given an array of non-negative integers  `nums`, you are initially positioned at the first index of the array.

양의 정수로 이루어진 배열 `nums`가 주어지고 당신은 배열의 첫 인덱스에 위치해 있다.

Each element in the array represents your maximum jump length at that position.

배열의 각 요소는 그 위치에서 당신의 최대 점프 길이를 나타낸다.

Your goal is to reach the last index in the minimum number of jumps.

목표는 최소 점프 수로 마지막 인덱스에 도착하는 것이다.

You can assume that you can always reach the last index.

언제나 마지막 인덱스에 도착할 수 있음을 가정할 수 있다.

## 예제

```
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
```
```
Input: nums = [2,3,0,1,4]
Output: 2
```

## 접근방법

문제를 통해 얻을 수 있는 정보
1. nums[i] = x : i를 통해서 `i+1,i+2,...,i+x`에 접근 가능
2. 인덱스 0의 최소 점프 수 = 0
3. 마지막 인덱스에 도착하지 않는 경우는 없음
4. 배열의 값이 양수 = 한 방향으로만 진행

임의의 인덱스 i에 대한 최소 점프 수는 i에 도달 가능한 인덱스들의 최소 점프 수에 의존한다는 점과 시작의 최소 점프 수가 0이라는 점을 통해서 인덱스 0부터 시작하여 점진적으로 각 인덱스에 대한 최소 점프 수를 구할 수 있을 것이라 생각함.

예제를 통해 어떤 규칙이 존재하는지 살펴보기 위해 `nums=[2,3,1,1,4]`를 생각해보자.
```
nums = [2,3,1,1,4], least jump number(이하, ljn) = [0,null,null,null,null]

i = 0, value = 2
- 인덱스 0의 경우, 최초 점프 시작점 : ljn[0] = 0
- 점프로 도달 가능한 인덱스 범위 : 1 ~ 2
- 범위에 맞게 최소 점프 수 갱신: ljn = [0,1,1,null,null]

i = 1, value = 3
- 인덱스 1까지의 최소 점프 수 : ljn[1] = 1
- 점프로 도달 가능한 인덱스 범위 : 2 ~ 4
- 범위에 맞게 최소 점프 수 갱신: ljn = [0,1,min(1, 2),2,2] = [0,1,1,2,2]
(인덱스 2에 대한 값이 겹치기 때문에, 알고 있는 값과 현재 값을 비교하여 최소 값으로 갱신)

i = 2, value = 1
- 인덱스 2까지의 최소 점프 수 : ljn[2] = 1
- 점프로 도달 가능한 인덱스 범위 : 3 ~ 3
- 범위에 맞게 최소 점프 수 갱신: ljn = [0,1,1,min(2, 2),2] = [0,1,1,2,2]

i = 3, value = 1
- 인덱스 3까지의 최소 점프 수 : ljn[3] = 2
- 점프로 도달 가능한 인덱스 범위 : 4 ~ 4
- 범위에 맞게 최소 점프 수 갱신: ljn = [0,1,1,2,min(2,2)] = [0,1,1,2,2]
```

위의 예제를 i에 대한 반복문과 i를 통해 접근 가능한 범위에 대한 반복문을 사용하여 구현이 가능하다. 이대로 구현한 결과, **시간초과(Time Limit Exceeded)**에러가 발생한다.

이 문제를 해결하기 위해, 각 요소에서의 갱신 범위에 집중하였고, 다음의 방법으로 해결할 수 있었다.

임의의 인덱스 `i`에서의 최소 점프 수가 `x`라면, 인덱스 `i+1`에서의 최소 점프 수는 `x 또는 x+1` 일 것이다. 이 점을 이용하면  `i+1`에서의 갱신 범위 중에서 `i`의 갱신 범위와 중복되는 부분은 제외시키는 것으로 갱신 범위를 줄일 수 있다. 최소 점프 수가 `i`로 인해 갱신된 값보다 크거나 같을 것임이 분명하기 때문이다.

## Code

<pre>
<code>
var jump = function(nums) {
    var dp = Array(nums.length).fill(Infinity);
    dp[0] = 0;
    
    var prev = 0;
    for (let i = 0; i < nums.length-1; i++) {
        for (let j = prev; j <= i+nums[i] && j < nums.length; j++) {
            dp[j] = Math.min(dp[j], dp[i] + 1);
        } 
        prev = i + nums[i];
    }
    
    return dp[nums.length-1];
};
</code>
</pre>
