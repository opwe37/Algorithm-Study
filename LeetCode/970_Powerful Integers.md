# 970. Powerful Integers

출처 : https://leetcode.com/problems/powerful-integers/

## 문제

Given two positive integers  `x`  and  `y`, an integer is  _powerful_ if it is equal to  `x^i + y^j` for some integers  `i >= 0`  and  `j >= 0`.

두 양의 정수 `x`와 `y`가 주어지면, `i >= 0`와  `j >= 0`에 대해서 `x^i + y^j`와 같은 정수는 _강력_ 한 정수 이다.

Return a list of all  _powerful_  integers that have value less than or equal to  `bound`.

`bound`와 같거나 작은 값의 _강력_ 한 모든 정수의 리스트를 반환하라.

You may return the answer in any order. In your answer, each value should occur at most once.

어떤 순서로 반환해도 되며, 답에서 각 값은 최대 한번만 포함되어야 한다. 

## 예제

```
Input: x = 2, y = 3, bound = 10
Output: [2,3,4,5,7,9,10]
Explanation: 
2 = 2^0 + 3^0
3 = 2^1 + 3^0
4 = 2^0 + 3^1
5 = 2^1 + 3^1
7 = 2^2 + 3^1
9 = 2^3 + 3^0
10 = 2^0 + 3^2
```

## 접근방법

문제를 간략히 정리하면 x<sup>i</sup> + y<sup>j</sup> <= bound인 i와 j를 모두 찾는 것이라 할 수 있다.
즉,  i와 j가 가질수 있는 값의 범위를 어떻게 설정할 것인지가 문제의 핵심이다.

`i`값의 범위에 대해 생각하기 위하여 y<sup>j</sup> == 0 이라고 가정하면 x<sup>i</sup><= bound 이고, i <= log<sub>x</sub>(bound)이다. 하지만 실제로 y >= 1 이기 때문에 y<sup>j</sup> == 0 이 될수 없고,  i < log<sub>x</sub>(bound) 로 정리할 수 있다.

`j`값 또한 같은 방식으로 j < log<sub>y</sub>(bound) 로 정리할 수 있다.

i와 j가 가질 수 있는 값의 범위가 정해졌기 때문에 반복문(for)과 가정문(if)을 이용하여 모든 경우의 수를 계산하여 답을 찾을 수 있다.

단, x와 y가 1인 경우는 별도의 처리가 필요하다. x = 1인 경우를 예로 생각해보면, x = 1이라는 것은 로그의 밑이 1이라는 것이고, 이는 bound가 어떤 값이든 무한대이기 때문에 반복문이 종료되지 않게 된다.

## Code

<pre>
<code>
var powerfulIntegers = function(x, y, bound) {
    var maxI, maxJ;
    if (x != 1) maxI = getBaseLog(x, bound);
    else maxI = 1;
    if (y != 1) maxJ = getBaseLog(y, bound);
    else maxJ = 1;
    
    var result = new Set();
    for (let i = 0; i < maxI; i++) {
        for (let j = 0; j < maxJ; j++) {
            let sum = Math.pow(x, i) + Math.pow(y, j);
            if (sum <= bound) result.add(sum);
        }
    }
    result = Array.from(result);
    return result;
};

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}
</code>
</pre>
