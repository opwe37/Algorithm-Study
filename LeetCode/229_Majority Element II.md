# 229. Majority Element Ⅱ

출처 : https://leetcode.com/problems/majority-element-ii/


## 문제

Given an integer array of size  _n_, find all elements that appear more than  `⌊ n/3 ⌋`  times.
>**Note:** The algorithm should run in linear time and in O(1) space.

(크기가 n인 정수 배열이 주어질때, n/3번 이상 반복되는 모든 요소를 찾으시오)

## 예제
- Example 1
```
Input: nums = [3,2,3]
Output: [3]
```
- Example 2
```
Input: nums = [1]
Output: [1]
```
- Example 3:
```
Input: nums = [1,2]
Output: [1,2]
```

## 접근 방법

JavaScript의 자료구조인 Map 과 Set을 활용하여 문제해결

- Map : Key, Value 형식으로 데이터 저장하는 구조 / 동일한 Key를 갖는 데이터가 존재할 수 없음
- Set : Value만을 저장하는 구조 / 동일한 Value를 저장할 수 없음(중복 데이터 허용X)

입력으로 주어지는 nums 배열을 순회하면서 Map에 'key: nums의 요소, value: 등장 횟수' 형식으로 저장. 동시에 등장 횟수가 n/3보다 클 경우, Set에 저장

마지막으로 Set구조를 Array로 변환하여 반환

## Code
<pre>
<code>
var majorityElement = function(nums) {
    var answer = new Set();
    
    const n = nums.length;
    
    var m = new Map();
    nums.forEach(val => {
        if (m.has(val)) {
            m.set(val, m.get(val)+1);
        } else {
            m.set(val, 1);
        }
        
        
        if (m.get(val) > n/3) {
            answer.add(val);
        }
    });
    
    answer = Array.from(answer);
    
    return answer;
};
</code>
</pre>
