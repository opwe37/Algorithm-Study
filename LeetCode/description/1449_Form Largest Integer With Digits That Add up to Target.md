# 1449. Form Largest Integer With Digits That Add up to Target

출처 : https://leetcode.com/problems/form-largest-integer-with-digits-that-add-up-to-target/

## 문제

Given an array of integers  `cost`  and an integer  `target`. Return the  **maximum**  integer you can paint under the following rules:
(정수 배열인 'cost'와 정수 'target'이 주어질때, 다음의 규칙을 따를 때 구할 수 있는 최대 값을 구하여라)

-   The cost of painting a digit (i+1) is given by `cost[i]` (0 indexed).
(숫자 i+의 비용은 cost[i])
-   The total cost used must be equal to  `target`.
(총 비용은 항상 target과 같음)
-   Integer does not have digits 0.
(0은 주어지지 않음)

Since the answer may be too large, return it as string.
If there is no way to paint any integer given the condition, return "0".
(답이 너무 커질 수 있기 때문에, 문자열로 반환하고, 조건에 부합한 값이 존재하지 않으면 "0"을 반환)

## 예제

- Example 1
	```
	Input: cost = [4,3,2,5,6,7,2,5,5], target = 9
	Output: "7772"
	Explanation: The cost to paint the digit '7' is 2, and the digit '2' is 3. Then cost("7772") = 2*3+ 3*1 = 9. You could also paint "977", but "7772" is the largest number.
	Digit    cost
	  1  ->   4
	  2  ->   3
	  3  ->   2
	  4  ->   5
	  5  ->   6
	  6  ->   7
	  7  ->   2
	  8  ->   5
	  9  ->   5
	```
- Example 2
	```
	Input: cost = [7,6,5,5,5,6,8,7,8], target = 12
	Output: "85"
	Explanation: The cost to paint the digit '8' is 7, and the digit '5' is 5. Then cost("85") = 7 + 5 = 12.
	```
- Example 3
	```
	Input: cost = [2,4,6,2,4,6,4,4,4], target = 5
	Output: "0"
	Explanation: It's not possible to paint any integer with total cost equal to target.
	```

## 접근 방법

DP를 활용하였으며, Bottom-Up 방식으로 접근
1. 주어진 배열에 중복되는 값이 존재하는데, 최종적으로 반환하고자 하는 값이 가장 큰 정수값이므로 중복 비용이라면 그 digit이 가장 큰 것만 필요함. (중복 값을 제거하고, 남은 값들의 digit을 기억해야함)
2. target의 크기를 갖는 저장공간 확보(DP로 접근하기 위함) _ 이하, dp_memory
	- dp_memory 초기화 : dp_memory[cost[i]] = cost[i]'s digit
	- 여기서 cost는 1번에서 중복을 제거한 배열, dp_memory에 저장되는 값의 형태는 문자열로 저장
3. Bottom-UP 방식 적용
	- dp_memory를 순회하며, dp_memory[i]에 값이 존재한다면 dp_memory[i + cost[j]]에 다음과 같이 저장
		- dp_memory[i + cost[j]] = cost[j]'s digit + dp_memory[i]
	- 단, dp_memory[i + cost[j]]에 값이 이미 존재하는 경우, 더 큰 값을 저장해야 함
4. 3번의 과정이 끝났을 때, dp_memory는 주어진 cost로 도달할 수 있는 모든 값에 대한 최대 Integer값을 저장한 배열이 됨

## Code
<pre>
<code>
var largestNumber = function(cost, target) {
    var costMap = new Map();
    cost.forEach((val, i) => {
        if (val > target) return;
        costMap.set(val, i+1);
    });

    var memory = Array(target+1).fill('');
    for (let [c, d] of costMap) {
      memory[c] = ''+ d;
    }

    for (let i = 1; i <= target; i++) {
      if (memory[i] == '') continue;

      costMap.forEach((digit, cost) => {
        if (i + cost > target) return;

        let candidateVal = '' + digit + memory[i];
        if (memory[i + cost].length < candidateVal.length) {
          memory[i + cost] = candidateVal;
        } else if (memory[i + cost].length == candidateVal.length) {
          memory[i + cost] = memory[i+cost] < candidateVal ? candidateVal : memory[i+cost];
        }
      });
    }

    if (memory[target] != '') {
      return memory[target];
    } else {
      return '0';
    }
};
</code>
</pre>
