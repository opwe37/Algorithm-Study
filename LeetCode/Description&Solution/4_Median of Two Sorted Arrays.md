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

`O(m + n)`의 접근 방법과의 가장 큰 차이점은 "`nums1`과 `nums2`이 합쳐진 배열을 중앙을 기점으로 왼쪽과 오른쪽으로 분리한다고 하였을 때, 왼쪽에 `nums1`의 배열의 원소가 몇개 포함되어 있는가"의 문제로 바라본다는 것이다.
```
merged arr의 왼쪽(left_half)에 있는 값 중에서 nums1에서 온 값은 몇개인가.
- nums1의 원소 중 최소 0개 ~ 최대 nums1.length개의 원소가 left_half의 후보
- nums1_min_count = 0, nums1_max_count = nums1.length
- nums2의 개수는 nums1의 개수에 따라 자연스럽게 정해진다.
```
여기서  `nums1`의 최소 수와 최대 수를 이용하여 해당 값을 찾아낼 수 있다.

이분 탐색 시 최종 목적지는 각각의 값이 서로의 다음 값보다 크지 않은 위치이다.
```
i = nums1_min_count + (a_max_count - a_min_count) / 2
j = (m + n + 1)/2 - i

nums1_index : ..., i-1, i, ...
nums2_index : ..., j-1, j, ...

target : nums1[i] > nums2[j-1] && nums2[j] > nums1[i-1]인 i-1과 j-1
```
- `nums2[j-1] > nums1[i]`이라면, `nums[i]`는 left_half에 포함되는 원소이고 최소 수를 `i+1`로 설정하여 이를 표현할 수 있다 : `nums1_min_count  = i + 1`
- `nums1[i-1] > nums2[j]`이라면, `nums[i-1]`는 left_half에서 포함되지 않는 원소이고 최대 수를 `i-1`로 설정하여 이를 표현할 수 있다 : `nums1_max_count  = i - 1`

이와 같은 과정을 거치다가 한 배열이 인덱스 값이 해당 배열의 범위를 벗어나게 된다면, 다른 배열에서 찾고자 하는 값의 위치를 특정 지을 수 있는 상황이된다.

## Full Source Code
아래의 코드는 `O(log (m + n))`을 구현한 코드
|lang|url|
|-|-
|JavaScript|https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/4.js|
