# 972. Equal Rational Numbers

출처: https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/

## 문제

### 번역

음이 아닌 유리수를 표현한 두 문자열 `s`와 `t`가 같은 숫자라면 `true`를 반환하라. 유리수의 반복되는 부분을 표현하기 위해 문자열에는 괄호가 사용되어질 수 있다.

**유리수**는 세 부분으로 표현될 수 있다: `<정수 부분>`, `<비순환 부분>`, 그리고 `<순환 부분>`. 숫자는 다음 세가지 방법 중 하나로 표현되어 진다:
- `<정수 부분>`
	- 예를 들어, `12`, `0`, 그리고 `123`
- `<정수 부분>**<.>**<비순환 부분>`
	- 예를 들어, `0.5`, `1.`, `2.12`, 그리고 `123.0001`
- `<정수 부분>**<.>**<비순환 부분>**<(>**<순환 부분>**<)>**`
	- 예를 들어, `0.1(6)`, `1.(9)`, `123.00(1212)`

십진수 표현에서 반복되는 부분은 편의상 소괄호 안에 표현한다. 예를들어:

- `1/6 = 0.16666666... = 0.1(6) = 0.1666(6) = 0.166(66)`.

### 원문
Given two strings  `s`  and  `t`, each of which represents a non-negative rational number, return  `true`  if and only if they represent the same number. The strings may use parentheses to denote the repeating part of the rational number.

A  **rational number**  can be represented using up to three parts:  `<IntegerPart>`,  `<NonRepeatingPart>`, and a  `<RepeatingPart>`. The number will be represented in one of the following three ways:

-   `<IntegerPart>`
    -   For example,  `12`,  `0`, and  `123`.
-   `<IntegerPart>**<.>**<NonRepeatingPart>`
    -   For example,  `0.5`,  `1.`,  `2.12`, and  `123.0001`.
-   `<IntegerPart>**<.>**<NonRepeatingPart>**<(>**<RepeatingPart>**<)>**`
    -   For example,  `0.1(6)`,  `1.(9)`,  `123.00(1212)`.

The repeating portion of a decimal expansion is conventionally denoted within a pair of round brackets. For example:

-   `1/6 = 0.16666666... = 0.1(6) = 0.1666(6) = 0.166(66)`.

## Example
```
Input: s = "0.(52)", t = "0.5(25)"
Output: true
Explanation: Because "0.(52)" represents 0.52525252..., and "0.5(25)" represents 0.52525252525..... , the strings represent the same number.
```
```
Input: s = "0.9(9)", t = "1."
Output: true
Explanation: "0.9(9)" represents 0.999999999... repeated forever, which equals 1.  [[See this link for an explanation.](https://en.wikipedia.org/wiki/0.999...)]
"1." represents the number 1, which is formed correctly: (IntegerPart) = "1" and (NonRepeatingPart) = "".
```

## 접근 방법

문제에 대한 접근에 앞서, 무한등비급수에 대해 언급하고자한다.

등비급수란, 등비수열의 합을 이야기하는 것으로 계산하는 공식은 아래와 같다.
- a<sub>n</sub> = ar<sup>n-1</sup>
- ∑<sub>(k=1 ~ n)</sub> a<sub>k</sub> = a(r<sup>n</sup>-1) / (r-1)

이 등비급수를 무한으로 확장시킨 것이 무한등비급수이며 다음과 같은 공식으로 계산할 수 있다(단, | r | < 1인 케이스에만 적용 가능한 공식이며, |r| >= 1이라면, 발산함).
- lim<sub>n->∞</sub> ∑<sub>(k=1 ~ n)</sub> a<sub>k</sub> = a / (1 - r)

이제 문제에 대해서 생각해보자. 문제에서 주어지는 값이 정수와 유한소수라면 입력으로 주어진 두 문자열의 단순 비교를 통해 같은 값인지 아닌지 알 수 있다.

문제에서 다루어주길 원하는 핵심 상황은 무한소수일 때이다. 이 케이스를 다루기 위해서 무한등비급수에 대해서 언급하였다.
공식을 통해서 무한등비급수를 분수 표현으로 바꿀 수 있으며 최종적으로 분수가 동일하다면 입력으로 주어진 두 문자열은 같은 수를 표현하고 있는 것이다.

여기서는 약간의 트릭을 이용해서 분수가 아닌, 괄호가 풀어진 원형을 만들어 둘의 비교를 수행할 것이다. 다음은 주어진 문자열을 입력받아 괄호를 없앤 원형을 반환하도록 한 JavaScript 코드이다.
<pre>
<code>
function original_number(str) {
	// 문제의 제한 조건: 0 <= NonRepeatingPart.length <= 4
	const ratios = [1.0, 1.0/9, 1.0/99, 1.0/999, 1.0/9999];

	const integerPart = Number(s.split('.')[0]);

	let nonRepeatingPart = s.split('.')[1].split('(')[0];
	const nonRepeatingPart_length = nonRepeatingPart.length;
	nonRepeatingPart = Number(nonRepeatingPart) * Math.pow(0.1, nonRepeatingPart_length);

	let repeatingPart = s.split('.')[1].split('(')[1].split(')')[0];
	repeatingPart = Number(repeatingPart) * Math.pow(0.1, nonRepeatingPart_length) * ratios[repeatingPart.length];

	console.log(integerPart + nonRepeatingPart + repeatingPart)
	return integerPart + nonRepeatingPart + repeatingPart;
}
</code>
</pre>

위 함수를 통해 `s`와 `t`를 변환하고, 비교만 하면 원하는 결과를 얻을 수 있을 것 같다. 하지만 실제로 그렇지 않다. 계산의 정밀도에 대해 생각해야한다. JavaScript에서 숫자는 64비트의 부동소수점으로 표현된다. 즉, 숫자를 표현할 수 있는 한정된 공간이 정해져있기 때문에 계산 결과에 오차가 포함될 가능성이 있다.
```
예: 0.1 + 0.2 = 0.30000000000000004
```
이러한 오차가 존재하기 때문에 실제로 같은 수를 다르게 판단하게 된다. 그래서 실제 두 값을 `==` 으로 비교하는 대신 두 값의 차를 계산하고 이 차가 임의의 작은 값(여기서는 1e-9)보다 작다면 두 값을 같은 것으로 판단하도록 한다.
<pre>
<code>
Math.abs(original_number(s) - original_number(t)) < 1e-9
</code>
</pre>

이러한 오차를 신경쓰지 않으려면 분수 표현 바꾸어 비교하는 것이 맞으나, 위와 같은 방식으로도 접근 가능하다는 것에 대해서 이야기하고 싶었다. 특히, Python의 경우 fractions 모듈이 별도로 존재하는 만큼 이를 활용하면 조금더 직관적인 코드를 만들 수 있다.

## Full Code
|language|url|
|--------|---|
|Javascript|[972.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/972.js)|
|Python3|[972.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/972.py)|
