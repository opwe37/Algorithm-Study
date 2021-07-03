# 416. Partition Equal Subset Sum

출처 : https://leetcode.com/problems/partition-equal-subset-sum/

## 문제

Given a **non-empty** array `nums` containing **only positive integers**, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

**오직 양의 정수**만으로 이루어져있는 **비어 있지 않은** 배열 `nums`가 주어지면, 그 배열이 모든 요소의 합이 같은 두개의 하위 집합으로 분리될 수 있는지 찾아라.

## 예제
```
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
```
```
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
```

## 접근방법

`나눠진 두 개의 배열의 합이 동일하다.`라는 말은 `원래 배열의 합이 2로 나눈 나머지가 0이다.`라는 말과 동일하다. 

원래의 배열의 합(origin_sum)이 2로 나누어지는 경우, 요소의 합이 `origin_sum/2`를 만들 수 있는지 판단해야 한다. 이는 DP를 이용하여 계산할 수 있다.

DP를 위하여 배열(dp)을 선언하고, 배열의 인덱스는 요소의 합이며, 값은 Boolean으로 합을 만들 수 있는지 없는지를 표시한다. dp[i] = true 라면, 배열의 요소를 가지고 i를 만들 수 있음을 말한다. 이를 이용하여 배열의 요소를 조합하여 만들 수 있는 모든 합을 체크할 것이다. 

아래의 예시를 살펴보면,
```
orgin_arr = [1,5]
if) 원래 배열의 index=0 만을 가지고 만들 수 있는 합 
가능한 경우 : [] = 0, [1] = 1 
DP 상태 :
	    0 1 2 3 4 5 6 7 8 9 10 ...
	    T T F F F F F F F F F  ...

if) 원래 배열의 index=[0, 1]만을 가지고 만들 수 있는 합
가능한 경우 : [] = 0, [1] = 1, [5] = 5, [1,5] = 6
DP 상태 : 
		0 1 2 3 4 5 6 7 8 9 10 ...
		T T F F F T T F F F F  ...
```
index = 0일 때의 결과를 토대로 index = 0 요소로 만들 수 있는 값에 index = 1 요소가 더해져
만들 수 있는 값을 찾으면 쉽고 빠르게 index = [0, 1]로 만들 수 있는 모든 값을 찾을 수 있음.

위와 같은 방식으로 요소 하나하나씩 이용하여 DP를 업데이트 해나가며 dp[origin_sum/2]가 true로 설정되는지 확인하는 방식으로 문제풀이 가능


## Code
<pre>
<code>
var canPartition = function(nums) {
    if (sum % 2 != 0) return false;
    
    const n = nums.length;
    const target = Math.floor(sum/2);
    
    var dp = Array(target+1).fill(false);
    dp[0] = true;
    
    for (let i = 0; i < n; i++) {
        for (let j = sum; j >= 0; j--) {
            if (dp[j]) dp[j+nums[i]] = true;
        }
        if (dp[target]) return true;
    }
    
    return false;
};
</code>
</pre>
