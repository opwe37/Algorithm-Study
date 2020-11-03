# 918. Maximum Sum Circular Subarray

출처 : https://leetcode.com/problems/maximum-sum-circular-subarray/

## 문제

Given a  **circular array** **C**  of integers represented by `A`, find the maximum possible sum of a non-empty subarray of  **C**.
(A라는 이름으로 정수형 환형 배열 C가 주어질 때, 비어있지 않은 C의 부분배열의 최대합을 찾아라)

Here, a _circular array_  means the end of the array connects to the beginning of the array. (Formally,  `C[i] = A[i]`  when  `0 <= i < A.length`, and  `C[i+A.length] = C[i]` when `i >= 0`.)
(_환형 배열_이라는 의미는 배열의 끝과 배열의 시작점이 연결되어 있다는 것이다.)

Also, a subarray may only include each element of the fixed buffer  `A`  at most once. (Formally, for a subarray  `C[i], C[i+1], ..., C[j]`, there does not exist  `i <= k1, k2 <= j`  with  `k1 % A.length = k2 % A.length`.)
(부분배열은 고정된 크기의 버퍼 A의 각 요소를 한번씩만 포함할 수 있습니다.)

## 예제

- Example 1
	```
	Input: [1,-2,3,-2]
	Output: 3
	Explanation: Subarray [3] has maximum sum 3
	```
	
- Example 2
	```
	Input: [5,-3,5]
	Output: 10
	Explanation: Subarray [5,5] has maximum sum 5 + 5 = 10
	```
- Example 3
	```
	Input: [3,-1,2,-1]
	Output: 4
	Explanation: Subarray [2,-1,3] has maximum sum 2 + (-1) + 3 = 4
	```
	
## 접근방법

일반적인 선형 배열에서 부분 배열의 최대 합을 찾는 문제는 카데인 알고리즘(Kadane's Algorithm)을 통해 O(n)의 시간복잡도로 해결 가능하다.
- 카데인 알고리즘은 배열을 스캔하면서 두 변수를 갱신해간다.
	- `current_sum` : 인덴스 i를 마지막 요소로 하는 부분배열 중 합이 가장 큰 값
	- `best_sum` : 현재까지 알고있는 부분집합의 합 중 가장 큰 값
- current_sum : i번째 요소는 무조건 포함이기 때문에, i-1번째 요소에서의 current_sum이 판단의 기준이 됨
	- if) i-1에서 current_sum <= 0 면, i에서의 current_sum = i번째 요소
	- if) i-1에서 current_sum > 0 면, i에서의 current_sum = current_sum + i번째 요소
- best_sum : current_sum과 best_sum을 비교하여 더 큰 값을 저장

하지만, 문제에서 주어진 배열은 환형이기 때문에 카데인 알고리즘만으로는 문제 해결이 되지 않음

예) A = [1, -3, 4, 5] 라면, 카데인 알고리즘으로는 부분 집합 [4, 5]를 선택하여 9를 최대 값으로 취하지만, 이 배열을 환형으로 생각하면 실제 최대 합을 만드는 부분 집합은 [4, 5, 1]이다. 

위의 케이스를 선형 배열에서 생각하면 다음 두 부분집합를 구하는 문제로 생각이 가능하다.
- 인덱스 n을 포함하는 부분집합(`A[i...n]`)중 최대 합을 만드는 부분집합
- 인덱스 0을 포함하는 부분집합(`A[0...j]`) 중 최대 합을 만드는 부분집합

이를 뒤집어 생각하면, 최소 합을 만드는 `A[j+1...i-1]`를 찾는 문제로 생각 가능

- `A's Total Sum = A[0...j] + A[j+1...i-1] + A[i...n]`
- `A[0...j] + A[i...n] = A's Total Sum - A[j+1...i-1]`

이를 위해서 기존 카데인 알고리즘을 변형하여 최소 합을 만드는 부분배열을 구하도록 하여 문제를 해결할 수 있다. 최종적으로 카데인 알고리즘과 그 변형으로 얻을 수 있는 값의 비교를 통해 환형 배열에서 최대 합을 만드는 부분 배열을 얻을 수 있음

## Code
<pre>
<code>
/**
 * @param {number[]} A
 * @return {number}
 */
var maxSubarraySumCircular = function(A) {
    var bestSum = -Infinity, worstSum = Infinity;
    var arrSum = 0;
    var currentSum = 0;
    var currentMin = 0;
    
    var flag = true;
    for (let x in A) {
        // case 1
        if (currentSum <= 0) {
            currentSum = A[x];
        } else {
            currentSum += A[x];
        }
        bestSum = Math.max(bestSum, currentSum);
        
        // case 2
        currentMin += A[x];
        worstSum = Math.min(worstSum, currentMin);
        if (currentMin > 0) currentMin = 0;
        
        
        arrSum += A[x];
        if (A[x] >= 0) flag = false;
    }
    
    if (flag) return bestSum;
    return Math.max(bestSum, arrSum-worstSum);
};
</code>
</pre>
