# 795. Number of Subarrays with Bounded Maximum

출처: https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/

## 문제
We are given an array  `A`  of positive integers, and two positive integers  `L`  and  `R`  (`L <= R`).

Return the number of (contiguous, non-empty) subarrays such that the value of the maximum array element in that subarray is at least  `L`  and at most  `R`.

양의 정수 `A`와 두 양의 정수 `L`과 `R`이 주어진다.(`L <= R`).

배열의 최대 원소가 `L`이상, `R`이하인 (연속적이고, 비어있지 않은)하위 배열의 수를 반환하라.

## 예제
```
Input:  A = [2, 1, 4, 3]
		L = 2
		R = 3
Output: 3
Explanation: There are three subarrays that meet the requirements: [2], [2, 1], [3].
```

## 접근 방법

1. Brute Force

전체 케이스를 전부 탐색하기 위해서, 배열 `A`의 임의의 인덱스 `i`가 하위 인덱스의 0번째 요소일 경우 몇개의 하위 배열이 만들어 질 수 있는지 체크하는 방식</br>
이때 `i`의 범위는 `0 ~ A배열의 끝`이 되며, 각 `i`에 대한 하위배열의 탐색은 `i < j`에서 `A[j] > R`인 경우 종료한다. 

2. Sliding Window

단순한 Brute Force방식을 개선한 것으로 O(n)의 시간이 걸리는 방법

윈도우는 아래의 방식으로 배열을 슬라이딩(=탐색)할 것이다
- 윈도우 안의 요소는 R보다 작은 요소여야 한다.
- 윈도우의 시작 위치를 고정시킨 후, </br>윈도우의 사이즈를 1씩 키우면서 윈도우에 새로 추가되는 요소에 대해 조건 체크
- R보다 큰 요소를 만나게 될 경우, 윈도우의 시작 위치를 변경하고 사이즈 초기화 (만약 i번째 요소가 R보다 크다면, i+1 위치로 시작위치 변경)

윈도우의 크기가 1씩 커지는 상황에 대해서 자세히 살펴보자. 1씩 커지면서 윈도우에 추가되는 값이 R보다 크지않다면, L에 대해서 두가지의 경우가 생긴다.
- L >= new element : 추가된 새 요소를 활용하여 윈도우 사이즈 만큼의 새로운 하위배열을 만들 수 있음
```
만약) L = 1, R =5, 현재 window = [1,2,3]
- 현재 만들 수 있는 하위 배열 = [1],[2],[3],[1,2],[2,3],[1,2,3]

새로운 요소 4가 윈도우에 추가된다면,
- L < new element < R : window = [1,2,3,4]
- 4개의 새로운 하위배열을 추가로 생성 = [4], [3,4], [2,3,4], [1,2,3,4]
```
- L < new element  : 증가하기 이전의 윈도우 사이즈 만큼의 새로운 하위배열 생성 가능
```
만약) L = 1, R =5, 현재 window = [1,2,3]
- 현재 만들 수 있는 하위 배열 = [1][2][3][1,2][2,3][1,2,3]

new element = 0
- L < new element < 5 : window = [1,2,3,0]
- 3개의 새로운 하위배열을 추가로 생성 = [3,0], [2,3,0], [1,2,3,0]
```
이와 같은 방식으로 윈도우를 통해 배열을 탐색하면서, 윈도우에 새로운 요소가 추가될 때마다 해당 요소를 기준으로 만들어지는 새 하위배열을 계산하여 전체 하위배열의 수를 계산한다.

## Code
1. Brute Force
<pre>
<code>
var numSubarrayBoundedMax = function(A, L, R) {
    let count = 0;
    for (let i = 0; i < A.length; i++) {
        let max = A[i];
        let j = i+1;
        while (j <= A.length) {
            if (max > R) break;
            
            if (max >= L && max <= R) count++;
            max = Math.max(max, A[j++]);
        }
    }
    return count;
};
</code>
</pre>

2. Sliding Window
<pre>
<code>
var numSubarrayBoundedMax = function(A, L, R) {
    let start=0, cur=0, result=0;
    for (let end = 0; end < A.length; end++) {
        if (A[end] >= L && A[end] <= R) {
            cur = end - start + 1;
        } else if (A[end] > R) {
            cur = 0;
            start = end + 1;
        }
        result += cur;
    }
    return result;
};
</code>
</pre>
