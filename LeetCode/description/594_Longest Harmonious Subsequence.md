# 594. Longest Harmonious Subsequence
출처 : https://leetcode.com/problems/longest-harmonious-subsequence/

## 문제

We define a harmonious array as an array where the difference between its maximum value and its minimum value is  **exactly**  `1`.
(배열의 최대값과 최소값의 차이가 1인 배열을 Harmonious 배열이라 정의한다.)

Given an integer array  `nums`, return  _the length of its longest harmonious subsequence among all its possible subsequences_.
(정수 배열 `nums`가 주어지면, 가능한 모든 서브시퀀스 중 가장 긴 harmonious 서브시퀀스를 반환하라.)

A  **subsequence**  of array is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.
(배열의 **서브시퀀스**는 나머지 요소의 순서를 변경하지 않고 몇몇 요소를 삭제하여 얻을 수 있는 시퀀스를 말한다.)

## 예제

- Example 1
	```
	Input: nums = [1,3,2,2,5,2,3,7]
	Output: 5
	Explanation: The longest harmonious subsequence is [3,2,2,2,3].
	```
- Example 2
	```
	Input: nums = [1,2,3,4]
	Output: 2
	```
## 접근 방법

문제를 해결하기 위해서 주어진 `nums` 배열 안에 어떤 요소들이 있으며, 각각 몇개를 보유하고 있는지 알아야할 필요가 있음

이를 위해서 배열을 1회 순회하면서 어떤 요소가 있고, 해당 요소와 동일한 값이 몇 개있는지 저장한다. 

nums = [1,3,2,2,5,2,3,7] 이라 가정하자.
```
nums = [1,3,2,2,5,2,3,7]
// (element, number of element)
(1, 1), (3, 2), (2, 3), (5, 1), (7, 1)
```

이 결과를 토대로 해당 값과 1 차이가 나는 요소가 있는지 확인하고, 있을 시에 길이가 몇인지 확인하여 가장 긴 길이를 찾도록 한다.

## Code
<pre>
<code>
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
    var elements = new Map();
    nums.forEach(val => {
        if (elements.has(val)) {
            elements.set(val, elements.get(val)+1);
        } else {
            elements.set(val, 1);
        }
    });
    
    var res = 0;
    for (let [key, val] of elements) {
        let len = val;
        if (elements.has(key-1)) {
            len += elements.get(key-1);
            res = res < len ? len : res;
        }
        
        len = val;
        if (elements.has(key+1)) {
            len += elements.get(key+1);
            res = res < len ? len : res;
        }
    }
    return res;
};
</code>
</pre>
