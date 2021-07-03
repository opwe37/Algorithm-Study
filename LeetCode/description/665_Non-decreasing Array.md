# 665. Non-decreasing Array

출처 : https://leetcode.com/problems/non-decreasing-array/


## 문제


Given an array  `nums`  with  `n`  integers, your task is to check if it could become non-decreasing by modifying  **at most**  `1`  element.

정수 배열 `nums`가 주어지면, **최대** 1개의 요소를 수정하여 감소하지 않는 배열이 되는지 확인해야한다.

We define an array is non-decreasing if  `nums[i] <= nums``[i + 1]`  holds for every  `i` (0-based) such that  `(0 <= i <= n - 2)`.

감소하지 않는다는 것은 `(0 <= i <= n-2)`인 모든 `i`에 대해서 `nums[i] <= nums[i + 1]`임을 말한다.

## 예제

```
Input: nums = [4,2,3]
Output: true
Explanation: You could modify the first `4` to `1` to get a non-decreasing array.
```
```
Input: nums = [4,2,1]
Output: false
Explanation: You can't get a non-decreasing array by modify at most one element.
```

## 접근방법

발생 가능한 케이스를 나누어 생각
1. 원래 배열 자체가 non-decreasing하는 경우 = true
2. 감소하는 부분이 1군데인 경우
	- 배열의 양 끝에서 감소하는  부분이 발생한 경우 = true
		- 1개의 요소를 수정하여 문제를 해결 가능
		- 예. [4, 1, 2, 3] => 4를 1로 변경하여 문제 해결 가능
		- 예. [1, 3, 5, 2] => 2를 6으로 변경하여 문제 해결 가능
	- 양 끝이 아닌 곳에서 감소하는  부분이 발생한 경우 = 조건부 true
		- 배열의 인덱스 i, i+1 에서 감소가 발생하였다고 가정하면, i 또는 i+1을 변경하는 경우를 고려
		- i를 변경하여 non-decreasing하게 만들기 위해서는 arr[i-1] <= arr[i+1]을 만족해야 함
		- i+1을 변경하여 non-decreasing하게 만들기 위해서는 arr[i] <= arr[i+2]를 만족해야 함
3.  감소하는 부분이 2군데 이상인 경우 :  false


## Code

<pre>
<code>
var checkPossibility = function(nums) {
    var idx = null;
    for (let i = 0; i < nums.length-1; i++) {
        if (nums[i] > nums[i+1]) {
            if (idx != null) return false;
            idx = i;
        }
    }
    
    if (idx == null || idx == 0 || idx == nums.length-2) return true;
    if (nums[idx-1] <= nums[idx+1] || nums[idx] <= nums[idx+2]) return true;
    return false;
};
</code>
</pre>
