# 1017. Convert to Base -2

출처 : https://leetcode.com/problems/convert-to-base-2/

## 문제

Given a number  `N`, return a string consisting of  `"0"`s and  `"1"`s that represents its value in base  `**-2**` (negative two).

The returned string must have no leading zeroes, unless the string is  `"0"`.

## 예제

- Example 1
	```
	Input: 2
	Output: "110"
	Explantion: (-2) ^ 2 + (-2) ^ 1 = 2
	```
- Example 2
	```
	Input: 3
	Output: "111"
	Explantion: (-2) ^ 2 + (-2) ^ 1 + (-2) ^ 0 = 3
	```
## 접근방법

숫자 표현 방식을 변화시키기 위해서 숫자 N을 `-2`로 나누어 그 몫과 나머지를 취해야함

이때, -2의 나머지로 1, 0 그리고 -1이 나오는데, -1인 경우가 문제가 됨

이에 나머지가 -1인 경우에 그 몫과 나머지에 적절한 보정이 필요

N = 7일 때를 고려해보면 아래와 같다.
```
7 / (-2) = -4 * (-2) - 1
         = -4 * (-2) - 1 + (2 - 2)
         = (-4 + 1) * (-2) + (-1 + 2)
         = -3 * (-2) + 1
``` 
위의 방식 처럼  `-2 + 2`를 하여 나머지를 1로 변환하여 문제를 해결할 수 있음.

이를 정리하면 다음과 같음
- 일반적인 진법변환 방식과 동일하게 진행
- 단, 나머지가 -1인 경우 몫에 1을 더하고 나머지에 2를 더하여 보정

## Code
- 몫을 구하기 위하여 처음에 Math.floor()를 사용하였지만 메모리 에러가 발생하였고, 이를 double tilde(~~)를 사용하여 해결함
<pre>
<code>
/**
 * @param {number} N
 * @return {string}
 */
var baseNeg2 = function(N) {
    if (N == 0) return "0";
    var answer = '';
    while (N != 0) {
        let r = (N % -2);
        N = ~~(N / -2);
        
        if (r < 0) {
            r += 2;
            N += 1;
        }
        answer = r + answer;
    }
    return answer;
};
</code>
</pre>
