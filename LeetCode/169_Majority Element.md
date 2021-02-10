# 169. Majority Element
출처: https://leetcode.com/problems/majority-element/

## 문제

Given an array  `nums`  of size  `n`, return  _the majority element_.

The majority element is the element that appears more than  `⌊n / 2⌋`  times. You may assume that the majority element always exists in the array.

크기 `n`인 배열 `nums`가 주어지면 _주요 원소_ 를 반환하라.

주요 원소는 `⌊n / 2⌋`번 이상 나오는 요소이다. 배열 안에 주요원소는 항상 존재한다고 가정하라.

## 예제
```
Input: nums = [3,2,3]
Output: 3
```
```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

## 접근 방법

맵 자료구조를 사용하여, 배열의 각 원소가 등장한 횟수를 저장하는 방법으로 문제에 접근

## Code

<pre>
<code>
var majorityElement = function(nums) {
    let result = null;
    
    const storage = new Map();
    nums.forEach(element => {
        if (storage.has(element)) {
            storage.set(element, storage.get(element) + 1);
        } else {
             storage.set(element, 1);
        }
        
        if (storage.get(element) >= Math.ceil(nums.length/2)) result = element;
    });
    
    return result;
};
</code>
</pre>
