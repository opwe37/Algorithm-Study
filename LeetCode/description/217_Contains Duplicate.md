# 217. Contains Duplicate
출처 : https://leetcode.com/problems/contains-duplicate/

## 문제

Given an array of integers, find if the array contains any duplicates.
(주어진 정수배열에서 중복된 값을 포함하고 있는지 찾아라.)

Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.
(배열에서 어떤 값이 최소 두번 나타난다면 true를 반환해야하고, 모든 값이 유일하다면 false를 반환해야 한다.)

## 예제

- Example 1
	```
	Input: [1,2,3,1]
	Output: true
	```
- Example 2
	```
	Input: [1,2,3,4]
	Output: false
	```
## 접근 방법

Set 자료구조를 사용하여 해결가능한 문제

`Set` 자료구조란, 수학의 Set(집합)을 구현한 것이다. 즉, 입력된 데이터들 간에는 순서가 존재하지 않으며 동일한 원소가 여러개 존재할 수 없다.

입력으로 주어진 `nums` 배열을 순회하면서 Set 자료구조에 데이터(값)를 삽입(add)한다. 이때, 삽입하기 전 Set에 현재 삽입하려고 하는 데이터가 존재하는 지를 확인(has)하여 이미 Set에 존재한다면 false를 반환하고 존재하지 않는다면 삽입 후, 다음 데이터로 넘어가는 방식으로 함수를 구현하면 된다.

## Code
<pre>
<code>
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    var element = new Set();
    for (let i = 0; i < nums.length; i++) {
        if (element.has(nums[i])) {
            return true;
        }
        element.add(nums[i]);
    }
    return false;
};
</code>
</pre>
