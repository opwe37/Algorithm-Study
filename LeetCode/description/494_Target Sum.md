# 494. Target Sum 
출처: https://leetcode.com/problems/target-sum/

## 문제

You are given a list of non-negative integers, a1, a2, ..., an, and a target, S. Now you have 2 symbols  `+`  and  `-`. For each integer, you should choose one from  `+`  and  `-`  as its new symbol.

Find out how many ways to assign symbols to make sum of integers equal to target S.

음수가 아닌 정수(a1, a2, ....)의 목록과 목표 값(S)가 주어진다. 여기, `+`와 `-` 기호가 있다. 각 정수에 `+`와 `-` 중 하나를 새 부호로 선택해야한다.

정수의 합이 목표 값 S와 동일하게 만들기 위해 부호를 할당하는 방법이 얼마나 있는지 찾아라.

## 예제
```
Input: nums is [1, 1, 1, 1, 1], S is 3. 
Output: 5
Explanation: 

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

There are 5 ways to assign symbols to make the sum of nums be target 3.
```

## 접근 방법

1. 모든 경우의 수를 계산하는 방법
`nums = [a1, a2, ..., an]` 일때, `a1`을 시작으로 `+`와 `-` 부호를 붙인 후, `local_sum`(`local_sum`은 최초 0에서 시작) 과 합산하여 기록한다. 이후 `a2`에 `+`, `-` 부호를 붙인 후 이전 단계에서 계산된 모든 `local_sum`과 합산하여 기록한다. 마지막 요소인 `an`을 계산할때, S가 몇번 나오는지 카운트하여 반환한다.

2. 문제 변형
`nums = [a1, a2, ..., an]`에서 `+`부호의 요소들을 `pNums`로, `-`부호의 요소를 `nNums`라 칭할때, `nums`배열의 모든 요소의 합인 `sum = a1 + a2 + ... + an`은 `pNums's sum + nNums's`라 말할 수 있다. 이때, 타겟 값인 `S = sum - 2*nNums's sum`으로 표현할 수 있는데, `nNums's sum = (sum - S)/2`가 된다. 이는 '`nums`의 요소를 사용하여 `(sum-S)/2`를 만들 수 있는가'에 대한 문제 풀이를 통해 실제 해결하고자 하는 문제를 해결할 수 있음을 의미한다.

## Code
1. 모든 경우의 수 계산
<pre>
<code>
var findTargetSumWays = function(nums, S) {
    let dp = new Map();
    dp.set(0, 1);
    let queue = [0];
    let size = 1;
    for (let i = 0; i < nums.length; i++) {
        const next = new Map();
        while (size != 0) {
            const item = queue.shift();
            size--;
            
            next.has(item+nums[i]) ? next.set(item+nums[i], next.get(item+nums[i])+dp.get(item)) : next.set(item+nums[i], dp.get(item));
            next.has(item-nums[i]) ? next.set(item-nums[i], next.get(item-nums[i])+dp.get(item)) : next.set(item-nums[i], dp.get(item));

            queue.push(item+nums[i]);
            queue.push(item-nums[i]);
        }
        dp = next;
        queue = Array.from(new Set(queue));
        size = queue.length;
    }
    return dp.has(S) ? dp.get(S) : 0;
};
</code>
</pre>

2. 문제 변형을 통한 접근
<pre>
<code>
var findTargetSumWays = function(nums, S) {
    let result = 0;
    const sum = nums.reduce((acc, val) => acc + val);
    if (S > sum || (sum - S) % 2 == 1) return result;
    
    const target = (sum - S) / 2;
    const dp = Array(target+1).fill(0);
    dp[0] = 1;
    
    for (let num of nums) {
        for (let i = target; i-num >= 0; i--) {
            dp[i] += dp[i-num];
        }
    }
    return dp[target];
};
</code>
</pre>
