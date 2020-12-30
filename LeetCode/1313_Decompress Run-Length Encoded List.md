# 1313. Decompress Run-Length Encoded List

출처 : https://leetcode.com/problems/decompress-run-length-encoded-list/

## 문제

We are given a list  `nums`  of integers representing a list compressed with run-length encoding.

런-길이 부호화(RLE)로 표현되어 있는 리스트 `nums`가 주어진다.

Consider each adjacent pair of elements  `[freq, val] = [nums[2*i], nums[2*i+1]]` (with  `i >= 0`). For each such pair, there are  `freq`  elements with value  `val`  concatenated in a sublist. Concatenate all the sublists from left to right to generate the decompressed list.

각 인접한 원소의 쌍은 다음과 같이 표현된다 :  `[freq, val] = [nums[2*i], nums[2*i+1]]`(`i >= 0`). 각각의 쌍에 대해서, 하위리스트에 `freq`원소가 `val` 값과 연결되어 있다. 압축 해제된 리스트를 생성하기 위하여 모든 하위리스트를 왼쪽에서 오른쪽으로 연결한다.

Return the decompressed list.
압축 해제된 리스트를 반환하라.

## 예제
```
Input: nums = [1,2,3,4]
Output: [2,4,4,4]
Explanation: The first pair [1,2] means we have freq = 1 and val = 2 so we generate the array [2].
The second pair [3,4] means we have freq = 3 and val = 4 so we generate [4,4,4].
At the end the concatenation [2] + [4,4,4] is [2,4,4,4].
```
```
Input: nums = [1,1,2,3]
Output: [1,3,3]
```

## 접근방법

문제를 직관적으로 접근

주어진 입력이 [freq, val] 쌍으로 엮어서 생각하려고 노력
즉, nums = [1, 2, 3, 4] 라면 [[1, 2], [3, 4]] 라는 형식으로 생각하고 문제를 접근함

만약 실제로 위와 같은 형식으로 입력이 주어진다면, 일반적인 반복(반복 간격이 1인 반복)으로 쉽게 풀이가 가능할 것이다. 하지만 실제 입력은 이런 형태가 아니기때문에 반복 간격을 2로 설정하는 조작이 필요
```
첫번째 freq의 인덱스 = 0, 두번째 freq의 인덱스 = 2

freq의 인덱스 간 관계 : 
첫번째 freq의 인덱스 + 2 = 두번째 freq의 인덱스
```

문제에서 주어진 압축법은 RLE로, 실제로 PCX, BMP와 같은 형식에서 사용되는 압축법

## Code
<pre>
<code>
var decompressRLElist = function(nums) {
    var answer = [];
    for (let i = 0; i < nums.length; i+=2) {
        answer.push(...Array(nums[i]).fill(nums[i+1]));
    }
    return answer;
};
</code>
</pre>
