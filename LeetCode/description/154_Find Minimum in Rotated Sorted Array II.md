# 154. Find Minimum in Rotated Sorted Array II

출처 : https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/

# 문제

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
(오름차순으로 정렬된 배열이 알려지지 않은 비펏에서 회전한다고 가정하자)
(i.e., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`).

Find the minimum element.
(최소 값을 찾아라)

The array may contain duplicates. (배열은 중복을 허용한다)

## 예제

- Example 1
	```
	Input: [1,3,5]
	Output: 1
	```
- Example 2
	```
	Input: [2,2,2,0,1]
	Output: 0
	```
## 접근방법

배열이 어느정도 정렬이 되어있기 때문에, 이진 탐색(Binary Search)을 이용

초기 left = 0, right = nums.length -1. mid = (left + right) / 2
- if) nums[right] > nums[mid] 이면, 찾아야 하는 값이 mid 왼쪽에 있음: right = mid
- if) nums[right] < nums[mid] 이면, 찾아야 하는 값이 mid 오른쪽에 있음: left = mid+1 
- if) num[right] == nums[mid] 이면, nums가 중복이 값이 허용되기 때문에 현재 nums[right]값이 최소인지 아닌지 모름 또한 최소가 아니라면 right를 얼만큼 이동해야 하는지 명확하지 않음. 그렇기 때문에 right를 1씩 감소시키면서 이진탐색을 지속: right = right - 1 

(ex_ [1,1,1,1,1,0,1] => left = 0, right = 6 일때, mid = 3이 되어 nums[6] = nums[3] = 1 이지만, 실제 nums의 최소값은 0임)

## Code
<pre>
<code>
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    var l = 0, r = nums.length-1;
    while (l <= r) {
        let m = Math.floor((l + r) / 2);
        if (nums[r] > nums[m]) {
            r = m;
        } else if (nums[r] < nums[m]) {
            l = m + 1;
        } else {
            r--;
        }
    }
    return nums[l];
};
</code>
</pre>
