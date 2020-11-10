# 166. Fraction to Recurring Decimal

출처 : https://leetcode.com/problems/fraction-to-recurring-decimal/

## 문제

Given two integers representing the  `numerator`  and  `denominator`  of a fraction, return  _the fraction in string format_. (분수의 `numerator`(분자)와 ` denomiator`(분모)가 주어질때, 그 소수를 문자열로 반환하라.)

If the fractional part is repeating, enclose the repeating part in parentheses.
(소수 부분이 반복된다면, 반복되는 부분에 괄호로 표시하라)
If multiple answers are possible, return  **any of them**.
(복수의 답이 가능하다면, 그 중 아무거나 반환해도 된다.)
It is  **guaranteed**  that the length of the answer string is less than  `104`  for all the given inputs.
(답의 문자열 길이는 `104` 미만임이 보장된다.)
## 예제

- Example 1
	```
	Input: numerator = 1, denominator = 2
	Output: "0.5"
	```
- Example 2
	```
	Input: numerator = 2, denominator = 3
	Output: "0.(6)"
	```

## 접근방법

분수를 소수로 변환하는 과정을 세분화하여 구현

1. 분자가 분모로 더 이상 나눠지지 않을때의 몫과 나머지를 구한다.
	- 몫 : 변환된 소수의 정수부가 됨
	- 나머지 : 소수점 이하 자리값을 구하는데 사용
2. 나머지가 0이 아니라면 소수점 이하 자리값 계산
	- `나머지 * 10 / 분모` 를 계산하여 몫과 나머지를 반복적으로 계산
3. 계산 결과의 부호는 최초로 들어온 분자와 분모의 부호를 기준으로 결정

※ JavaScript에서 몫을 구하는 방법에는 2가지 존재

- Math.floor()
- ~~ : Not 연산을 두번 실행

두 방법의 가장 큰 차이는 속도이다. Math.floor()함수가 더 느림.

이 문제를 풀때, 단순히 속도 측면에서 이점을 얻고자 아무런 생각없이 ~~를 사용하면 numerator = 2147483648, denominator = 1인 상황에서 오류가 생김
이는 자바스크립트에서 숫자는 64비트를 사용하여 표현하는 반면에, 비트 연산은 32비트를 사용하기 때문. 예제를 그대로 가져와 2147483648은 2^31^의 값으로 아래와 같이 표현됨.
```
sign(1bit)  exponent(11bit)     mantissa(52bit)
0           00000000000         0000 00000000 00000000 10000000 00000000 00000000 00000000
```
위의 숫자를 비트 연산에 사용하기 위해 32비트로 변환하는 과정을 거치는데, 이때 32비트를 초과한 비트는 버림. 즉, 아래와 같이 표현됨.
```
1000 0000 0000 0000 0000 0000 0000 0000
```
이 상황이 바로 문제의 상황이다. 2^31^을 표현하기 위해 있던 단 하나의 1의 위치가 부호를 표현하는 위치가 되어 양수를 음수로 바꿈. 2147483648이 -2147483648가 된 것.

이러한 문제때문에 느리지만 Math.floor()를 사용하여 구현함

## Code

<pre>
<code>
var fractionToDecimal = function(numerator, denominator) {
    if (numerator == 0) return "0";
    
    var answer = "";
    
    var store = [];
    
    var sign_num = numerator > 0 ? 1 : -1;
    var sign_den = denominator > 0 ? 1 : -1;
    
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);
    
    var q = Math.floor(numerator / denominator);
    var r = numerator % denominator;
    
    answer += q;
    var len = 0;
    if (r != 0) {
        len = answer.length +1;
        answer += ".";
    }
    while (r != 0) {
        let pivot = store.indexOf(r);
        if (pivot != -1) {
            answer = answer.slice(0, pivot+len) + "(" + answer.slice(pivot+len) + ")";
            break;
        }
        
        store.push(r);
        
        r *= 10;
        q = Math.floor(r / denominator);
        r = r % denominator;
        answer += q;
    }
    
    if (sign_num != sign_den) {
        answer = "-" + answer;
    }
    return answer;
};
</code>
</pre>
