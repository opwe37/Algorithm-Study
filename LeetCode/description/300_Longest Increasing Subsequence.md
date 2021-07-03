# 300. Longest Increasing Subsequence

출처: https://leetcode.com/problems/longest-increasing-subsequence/

## 문제

Given an integer array  `nums`, return the length of the longest strictly increasing subsequence.

A  **subsequence**  is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements. For example,  `[3,6,2,7]`  is a subsequence of the array  `[0,3,1,6,2,2,7]`.

정수 배열 `nums`가 주어지면, 가장 긴 강한증가 하위 시퀀스의 길이를 반환하라.

**하위 시퀀스**는 남아 있는 요소의 순서 변화 없이 일부 요소의 삭제 또는 삭제 없이 배열에서 파생될 수 있는 순서이다. 예를 들어, `[3,6,2,7]`은 배열 `[0,3,1,6,2,2,7]`의 하위 시퀀스이다.

## 예제
```
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
```
```
Input: nums = [7,7,7,7,7,7,7]
Output: 1
```

## 접근 방법

1. 동적 프로그래밍(Dynamic Programming, DP)

인덱스 `i`가 가장 큰 값인 강한 증가 하위시퀀스의 크기를 저장하는 배열 `dp`가 있다고 가정하자. `dp[i] = 인덱스 0 ~ i의 요소를 활용하고, i번째 요소가 가장 큰 값인 하위시퀀스의 길이`이다.

이때 `dp[i+1]`을 어떻게 구할 수 있을까?</br>
만약, `j < i+1`이라 할때, `nums[j] < nums[i+1]`인 모든 `j` 중 가장 큰 `dp[j]`에 1을 더해주면 된다.

`i`를 0부터 시작하여 점차 증가시키며 `dp[i]`를 계산하고, 최종 구해진 배열 `dp`에서 가장 큰 값을 반환하면 된다. 

2. DP + 이진 탐색(Binary Search)

배열 `nums`를 읽으면서 이진탐색을 위한 배열(`bs`)을 아래의 규칙에 따라 생성해간다.
- if) nums[i] > bs[last index] : bs.push(nums[i])
- if) nums[i] <= bs[last index] : bs 내부에서 nums[i]와 교체할 수 있는 값의 위치를 찾아 교체
	- 교체할 수 있는 위치라는 것은, 값은 num[i]로 바꾼 이후에도 `bs`가 오름차순이라는 것을 의미함
	- `bs`를 이진탐색으로 탐색하여 교체 위치를 찾을 수 있음

최종적으로 만들어진 bs는 문제에서 요구하는 강한 증가 하위시퀀스는 아닐 것이다(원소의 순서가 달라졌을 수 있기 때문에). 하지만, bs의 크기는 강한 증가 하위시퀀스와 동일하다.

## Code
1. using DP
<pre>
<code>
var lengthOfLIS = function(nums) {
    if (nums.length == 1) return 1;
    
    const dp = Array(nums.length).fill(0);
    dp[0] = 1;
    
    for (let i = 1; i < nums.length; i++) {
        let max = 0;
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                max = Math.max(max, dp[j]);
            }
        }
        dp[i] = max + 1;
    }
    
    return Math.max.apply(null, dp);
};
</code>
</pre>

2. using DP + BinarySearch
<pre>
<code>
var lengthOfLIS = function(nums) {
    if (nums.length == 1) return 1;
    
    const dp = [nums[0]];
    
    for (let i = 1; i < nums.length; i++) {
        if (dp[dp.length-1] < nums[i]){
            dp.push(nums[i]);
        } else {
            const idx = binarySearch(dp, nums[i]);
            dp[idx] = nums[i];
        }
    }
    
    return dp.length;
};

function binarySearch(arr, target) {
    let l = 0,
        r = arr.length-1;
    while (l <= r) {
        const mid = Math.floor((l+r)/2);
        if (arr[mid] < target) {
            l = mid + 1;
        } else if (arr[mid] > target){
            r = mid - 1;
        } else {
            return mid;
        }
    }
    return l;
}
</code>
</pre>
