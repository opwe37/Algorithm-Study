# 204. Count Primes

출처 : https://leetcode.com/problems/count-primes/

## 문제

Count the number of prime numbers less than a non-negative number, `n`.
(음이 아닌 숫자 `n`보다 작은 소수의 수를 구하시오. )

## 예제

- Example 1
	```
	Input: n = 10
	Output: 4
	Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
	```
	
- Example 2
	```
	Input: n = 0
	Output: 0
	```
- Example 3
	```
	Input: n = 1
	Output: 0	
	```
	
## 접근방법

에라토스테네의 체 구현
- 2부터 시작하여, 각 수의 배수를 차례차례 지워나가는 방식
- 임의의 숫자 i 차례에서 i가 지워지지 않은 숫자라면, i는 소수 (i보다 작고 2보다 큰 숫자 중에서 i를 만드는 수가 없다는 이야기이기 때문)

에라토스테네의 체에서 반복 횟수를 줄이기 위한 두가지 트릭
1. 특정 i 의 배수를 지우는 과정에서 지워지는 시작 값은 i^2^
	- i * (i-1), i * (i-2) ... i * 2 는 이전 과정에서 이미 확인되어 지워졌기 때문에 다시 한번 확인할 필요가 없음
2. 2부터 n까지 모두를 확인하는 것이 아닌 i^2^ < n 인 최대 i 까지 확인
	- 위에서 말한 것과 같이 숫자 i가 이전 숫자들을 통해 지워지지 않았다면 숫자 i를 통해 지워지는 첫 값은 i^2^임
	- 찾고하는 값이 n보다 작은 값에 대한 소수이기 때문에 n보다 큰 숫자는 지울 필요가 없음
	
## Code
<pre>
<code>
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
    var isPrime = Array(n).fill(true);
    
    for (let i = 2; i * i < n; i++) {
        if (!isPrime[i]) continue;
        for (let j = i * i; j < n; j += i) {
            isPrime[j] = false;
        }
    }
    
    var count = 0;
    for (let i = 2; i < isPrime.length; i++) {
        if (isPrime[i]) count++;
    }
    return count;
};
</code>
</pre>
