# 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
출처 : https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/

## 문제 
Given an array of integers `nums` and an integer `limit`, return the size of the longest **non-empty** subarray such that the absolute difference between any two elements of this subarray is less than or equal to `limit`.

정수 배열 `nums`와 정수 `limit`가 주어지면, 어떤 두 요소의 차의 절대값이 `limit`와 같거나 작은 하위배열 중  가장 긴 하위배열의 길이를 반환하라.

## 예제
```
Input: nums = [8,2,4,7], limit = 4
Output: 2 
Explanation: All subarrays are: 
[8] with maximum absolute diff |8-8| = 0 <= 4.
[8,2] with maximum absolute diff |8-2| = 6 > 4. 
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
[2] with maximum absolute diff |2-2| = 0 <= 4.
[2,4] with maximum absolute diff |2-4| = 2 <= 4.
[2,4,7] with maximum absolute diff |2-7| = 5 > 4.
[4] with maximum absolute diff |4-4| = 0 <= 4.
[4,7] with maximum absolute diff |4-7| = 3 <= 4.
[7] with maximum absolute diff |7-7| = 0 <= 4. 
Therefore, the size of the longest subarray is 2.
```
```
Input: nums = [4,2,2,2,4,4,2,2], limit = 0
Output: 3
```

## 접근 방법

풀이 방식의 틀은 예제의 설명과 같다. 단, 조건에 부합하지 않는 케이스를 발견한다면 바로 다음 단계로 넘어가게 하였다. 

nums = [8,2,4,7]이고 limit = 4 일 때 다음과 같은 방식으로 문제의 답을 찾아 나간다.
```
nums = [8,2,4,7], limit = 4
// 하위배열 중 index 0이 첫 요소인 배열 탐색
[8], min = 8, max = 8, |8-8| = 0 <= 4
[8,2], min = 2, max = 8, |8-2| = 6 > 4 
// 조건에서 벗어나므로 탐색 종료([8,2,4], [8,2,4,7]를 탐색하지 않는다.)

// 하위배열 중 index 1이 첫 요소인 배열 탐색
[2], min = 2, max = 2, |2-2| = 0 <= 4
[2,4], min = 2, max = 4, |4-2| = 2 <= 4
[2,4,7], min = 2, max = 7, |7-2| = 5 > 4 // 조건에서 벗어나므로 탐색 종료

// 위와 같은 방식으로 index 3, 4로 시작하는 하위배열 탐색
```
각 하위배열을 탐색해 나가면서 하위배열이 조건에 부합하는지 확인하기 위해서 min과 max를 기록한다.
- min : 하위배열의 요소 중 최소 값
- max : 하위배열의 요소 중 최대 값 

하위 배열에 한 요소가 추가될 때마다 min과 max를 업데이트 시키고 조건 부합 여부를 판단한다. 만약 조건에 부합한다면 다음 요소를 추가시키고, 그렇지 않다면 더 이상의 요소 추가없이 종료한다.

탐색된 배열들의 길이를 비교하여 가장 큰 길이를 반환한다.

이 방법만으로는 **TLE(시간초과)** 문제와 직면하게 된다.

이에 TLE의 입력을 보니 nums에 같은 숫자가 연속적으로 입력되어 있는 케이스에서 에러가 발생함을 알 수 있었다. 이에 본격적인 탐색 전에 nums를 순회하면서 연속된 값이 몇개가 있는지 체크하여 nums를 압축(?)하였다.
- 압축 형태 : `[nums[i], count]`
- 예시 : `nums = [1,1,1,1,1,1,2,3,1,1,4,5,5,5,5] => [[1,6],[2,1],[3,1],[1,2],[4,1],[5,4]]`

이후 압축된 배열을 가지고 알고리즘을 적용하니 TLE를 해결할 수 있었다. 

## Code

<pre>
<code>
var longestSubarray = function(nums, limit) {
    let result = 1;
    
    let prev = nums[0];
    let count = 0;
    const compressedNums = [];
    for (let i = 0; i < nums.length; i++) {
        if (prev == nums[i]) {
            count++;
        } else {
            compressedNums.push([prev, count]);
            prev = nums[i];
            count = 1;
        }
    }
    compressedNums.push([prev, count]);
    
    for (let i = 0; i < compressedNums.length; i++) {
        const [num, _] = compressedNums[i];
        let tmpSize = 0;
        let min = num, max = num;
        for (let j = i; j < compressedNums.length; j++) {
            const [next, count] = compressedNums[j];
            if (Math.abs(min - next) <= limit && Math.abs(max - next) <= limit) {
                tmpSize += count;
                min = Math.min(min, next);
                max = Math.max(max, next);
            } else {
                break;
            }
        }
        result = Math.max(tmpSize, result);
    }
    return result;
};
</code>
</pre>
