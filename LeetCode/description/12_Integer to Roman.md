# 12. Integer to Roman
출처: https://leetcode.com/problems/integer-to-roman/

## 문제


Roman numerals are represented by seven different symbols: `I`,  `V`,  `X`,  `L`,  `C`,  `D`  and  `M`.

로마 숫자는 7가지 심볼에 의해 표현된다. :  `I`,  `V`,  `X`,  `L`,  `C`,  `D`  그리고  `M`.
```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, `2`  is written as  `II` in Roman numeral, just two one's added together.  `12`  is written as `XII`, which is simply  `X + II`. The number  `27`  is written as  `XXVII`, which is  `XX + V + II`.

예를 들어, `2`는 로마자로 `II`, 두개의 1이 같이 쓰여진 형태이다. `12`는 `XII`, 단순하게 `X + II`이다. 숫자 `27`은 `XXVII`, `XX + V + II`이다.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not  `IIII`. Instead, the number four is written as  `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as  `IX`. There are six instances where subtraction is used:

로마 숫자는 보통 가장큰 숫자에서 가장 작은 숫자 순으로 왼쪽에서 오른쪽으로 쓰여진다. 하지만, 4를 표기하는 숫자는 `IIII`이 아니다. 대신에, 숫자 4는 `IV`으로 쓰여진다. 5에서 1 부족한 숫자이기 때문에 1을 빼서 4를 만들 수 있다. 같은 원리로 숫자 9에도 적용되어 `IX`로 쓰여진다. 빼기로 표현되는 6가지의 인스턴스가 있다:

-   `I`  can be placed before  `V`  (5) and  `X`  (10) to make 4 and 9.
-   `X`  can be placed before  `L`  (50) and  `C`  (100) to make 40 and 90.
-   `C`  can be placed before  `D`  (500) and  `M`  (1000) to make 400 and 900.

- `I`는 `V`(5)와 `X`(10)전에 쓰여 4와 9를 만들 수 있다.
- `X`는 `L`(50)와 `C`(100)전에 쓰여 40과 90을 만들 수 있다.
- `C`는 `D`(500)와 `M`(1000)전에 쓰여 400과 900을 만들 수 있다.

Given an integer, convert it to a roman numeral.

정수가 주어지면, 로마 숫자로 치환하라.

## 예제
```
Input: num = 3
Output: "III"
```
```
Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

## 접근 방법

1 ~ 9를 로마 숫자로 표기해보자. 1, 4, 5, 9는 개별적인 표기가 존재한다. 4, 9는 1과 5, 1과 10의 합성으로 만들어지지만, 다른 숫자와는 표기 방법이 다르므로 1, 5처럼 별도의 기호가 있는 것으로 취급
|1|2|3|4|5|6|7|8|9|
|-|-|-|-|-|-|-|-|-|
|I|||IV|V||||IX|
2와 3의 경우, 단순히 1의 합성으로 만들어진다: `2 = I + I`, `3 = I + I + I` 
|1|2|3|4|5|6|7|8|9|
|-|-|-|-|-|-|-|-|-|
|I|II|III|IV|V||||IX|
6,7 그리고 8의 경우, 5의 표기에 1이 하나씩 누적되어 만들어진다: `6 = V + I`, `7 = V + I + I`, `8 = V + I + I + I`
|1|2|3|4|5|6|7|8|9|
|-|-|-|-|-|-|-|-|-|
|I|II|III|IV|V|VI|VII|VIII|IX|

이 표를 기반으로 10~90을 생각해보면, I(1)가 X(10)으로 변경되고, V(5)가 L(50)로, 9를 표기할 때 사용되었던 X(10)가 C(100)로 변경되는 것으로 10,20,30, ..., 90을 표기할 수 있다.

이제 우리가 별도로 표기할 수 있는 숫자 1, 4, 5, 9, 10, 40, 50, 90, ..., 1000의 로마자를 저장하여 관리하자. num으로 주어진 숫자를 10으로 나누면서 각 자리의 숫자를 얻는다. 얻어진 숫자는 0 ~ 9의 숫자일 것이다. 만약 저장하고 있는 값(1, 4, 5, 9) 중에 있는 숫자라면, 해당 숫자를 바로 꺼내와 사용하고, 저장하고 있는 숫자가 아니라면 2~3, 6~8의 범위 중 어느 곳에 속하는지 판단하여 1로만 합성할 것인지 5와 1을 사용하여 합성할 것인지 판단한다. 5보다 큰 값이라고 가정하면 맨앞에 5에 대한 표기를 하고 나머지를 1로 채우는 형식으로 한다. 이 모든 과정에서 생각해야 되는 것은 해당 숫자의 자릿수이다. 10으로 나눈 나머지 값이기 때문에 0~9의 값으로 나왔지만, 실제 해당 숫자가 num에서 어떤 자리에 있는지에 따라 로마자 표기가 달라지므로, 저장소에서 로마자를 꺼내올 때 이를 반영해야한다.

위의 방식으로도 문제는 해결되지만, 불필요한 저장공간을 사용하고 있긴하다. 바로 4와 9(40, 90, ...)에 대한 공간이다. 결과적으로 4와 9에 대한 값도 기본적인 로마자에서 만들어질 수 있는 값이기 때문이다. 윗 방식이 1, 4, 5, 9를 확인하고 없다면 범위를 체크하는 방식이라면, 범위를 체크하기 전에 4와 9 여부를 확인하게 하여, 이에 대한 처리를 가능하도록 하는 방식으로 변경가능 하다. 즉, 10으로 나눈 나머지가 1과 5인지 체크하고, 아니라면 4와 9인지, 이마저도 아니라면 2~3의 범위인가, 6~8의 범윈인가를 체크하여 해당 숫자를 표기하는 것이다.

## Code

<pre>
<code>
var intToRoman = function(num) {
    const roman = {
        1: "I",
        5: "V",
        10: "X",
        50: "L",
        100: "C",
        500: "D",
        1000: "M"
    };
    
    let result = "";
    let digit = 1;
    while (num != 0) {
        let d = num % 10;
        num = Math.floor(num / 10);
        
        if (d == 4) {
            result = roman[digit] + roman[5 * digit] + result;
        } else if (d == 9) {
            result = roman[digit] + roman[10 * digit] + result;
        } else if (d < 4) {
            result = roman[digit].repeat(d) + result;
        } else {
            result = roman[5 * digit] + roman[digit].repeat(d-5) + result;
        }
        
        digit *= 10;
    }
    
    return result;
};
</code>
</pre>
