# 4. Median of Two Sorted Arrays
출처: https://leetcode.com/problems/median-of-two-sorted-arrays/

## 문제

Given two sorted arrays  `nums1`  and  `nums2`  of size  `m`  and  `n`  respectively, return  **the median**  of the two sorted arrays.

각각 크기가 `m`과 `n`인 두개의 정렬된 배열 `nums1`과 `nums2`이 주어지면, 두 정렬된 배열의 **중앙값**을 반환하라.

**Follow up:**  The overall run time complexity should be  `O(log (m+n))`.
전체 실행 시간이 `O(log (m+n))`이어야 한다.

## 예제

```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```
```
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
```
```
Input: nums1 = [], nums2 = [1]
Output: 1.00000
```
## 접근 방법

1. 시간 복잡도 `O(m + n)`의 풀이

문제를 가장 쉽게 풀 수 있는 방법으로, 주어진 두 배열을 합쳐 중앙값을 찾는  방법이다. `m + n` 사이즈의 배열을 생성하여 합치는 방법도 가능하지만, 주어지는 두 배열이 정렬되어 있다는 점을 이용하여 공간 복잡도를 아끼는 방향으로 접근하고자 한다.

우선, 최종적으로 찾고자 하는 값은 합쳐진 두 배열의 중앙 값으로, `(m + n) / 2`의 위치에 있는 값이다. 만약, `m + n`이 짝수라면 `(m + n) / 2`과 `(m + n) / 2 - 1` 값의 평균을 구하고자 한다.

두 배열이 정렬되어 있기 때문에 `nums1[i] < nums2[j]`라면, `nums1`의 `0` ~ `i` 인덱스의 값은 `nums2[j]`보다 작다. 이 점을 이용하여 두 배열의 첫 인덱스부터 비교해가며 더 작은 값을 가지는 배열의 비교 인덱스를 1증가 시켜간다. 이 과정을 `(m + n) / 2`번 수행하여 해당 값을 이용하여 중앙값을 계산하여 반환한다.

2. 시간 복잡도 `O(log (m + n))`의 풀이

`O(log (m + n)`의 시간 복잡도를 가능케 하는 접근 방법에 대해 잘 설명한 글이 있어 가져와 보았다.

원문 : https://medium.com/@hazemu/finding-the-median-of-2-sorted-arrays-in-logarithmic-time-1d3f2ecbeb46

`O(m + n)`의 접근 방법과의 가장 큰 차이점은 비교의 시작점이 두 배열의 중앙 위치라는 것. 또 최종 찾고자 하는 위치를 다음과 같이 정의한다는 점이다.
```
nums1_index : ..., ai, ai+1, ...
nums2_index : ..., bj, bj+1, ...
ai, bi : current index

target : nums1[ai+1] > nums2[bj] && nums2[bj+1] > nums1[ai] => max(nums[ai], nums[bj])
```
만약 `nums2[bj] > nums1[ai+1]`이라면, `nums1`의 인덱스 위치를 왼쪽으로 `nums2`의 위치를 오른쪽으로 이동 시키는 작업이 필요하다. 반대로 `nums1[ai] > nums2[bj+1]`이라면, `nums2`의 위치를 왼쪽으로 `nums1`의 위치를 오른쪽으로 이동시킨다.

이와 같은 과정을 거치다가 한 배열이 인덱스 값이 해당 배열의 범위를 벗어나게 된다면, 다른 배열에서 찾고자 하는 값의 위치를 특정 지을 수 있는 상황이된다.

## Full Source Code
아래의 코드는 `O(log (m + n))`을 구현한 코드
|lang|url|
|-|-
|JavaScript|https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/4.js|
