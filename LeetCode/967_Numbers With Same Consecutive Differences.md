# 967. Numbers With Same Consecutive Differences

출처 : https://leetcode.com/problems/numbers-with-same-consecutive-differences/

## 문제

Return all  **non-negative**  integers of length  `n`  such that the absolute difference between every two consecutive digits is  `k`.
(연속된 두 숫자의 차의 절대값이 `k`인 모든 `n`길이를 갖는 양의 정수를 반환하라)

Note that  **every**  number in the answer  **must not**  have leading zeros  **except**  for the number  `0`  itself. For example,  `01`  has one leading zero and is invalid, but  `0`  is valid.
(결과에 속하는 모든 숫자는 그 자신이 0이 아닌 이상 0으로 시작할 수 없다. 예를 들어 01은 안되지만, 0은 가능하다.)

You may return the answer in  **any order**.
(결과의 순서는 상관없음)

## 예제
- Example 1
	````
	Input: n = 3, k = 7
	Output: [181,292,707,818,929]
	Explanation: Note that 070 is not a valid number, because it has leading zeroes.
	````

- Example 2
	````
	Input: n = 2, k = 1
	Output: [10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98]
	````

- Example 3
	````
	Input: n = 2, k = 0
	Output: [11,22,33,44,55,66,77,88,99]
	````

- Example 3
	````
	Input: n = 2, k = 2
	Output: [13,20,24,31,35,42,46,53,57,64,68,75,79,86,97]
	````
## 접근방법

분할정복(Divide & Conquer) 방식으로 접근

연속된 숫자의 차가 k인 n자리 숫자를 만들기 위해서는 같은 조건의 n-1길이의 숫자를 알면 됨
- 조건에 맞는 `n-1`길이의 숫자를 알고 있다고 가정하면, `n`자리 숫자는 `n-1`자리에 따라 결정

## code
<pre>
<code>
var numsSameConsecDiff = function(n, k) {
    var res = new Set();
    if (n == 2) {
        for (let i = 1; i < 10; i++) {
            if (i - k >= 0) res.add('' + i + (i - k));
            if (i + k < 10) res.add('' + i + (i + k));
        }
        return Array.from(res);
    }
    
    var preRes = numsSameConsecDiff(n-1, k);
    for (let i = 0; i < preRes.length; i++) {
        let lastDigit = preRes[i] % 10;
        if (lastDigit - k >= 0) res.add('' + preRes[i] + (lastDigit - k));
        if (lastDigit + k < 10) res.add('' + preRes[i] + (lastDigit + k));
    }
    return Array.from(res);
};
</code>
</pre>
