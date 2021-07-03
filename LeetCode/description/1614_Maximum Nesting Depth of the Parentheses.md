# 1614. Maximum Nesting Depth of the Parentheses
출처: https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/

## 문제

A string is a  **valid parentheses string**  (denoted  **VPS**) if it meets one of the following:

-   It is an empty string  `""`, or a single character not equal to  `"("`  or  `")"`,
-   It can be written as  `AB`  (`A`  concatenated with  `B`), where  `A`  and  `B`  are  **VPS**'s, or
-   It can be written as  `(A)`, where  `A`  is a  **VPS**.

다음 중 하나에 부합하는 문자열을 **유효한 괄호 문자열**이라 한다:
- 빈 문자열 `""`이거나, `"("`과 `")"`이 아닌 단일 문자
- `A`와 `B`가 **VPS**일때, `AB`(`A`에 `B`가 결합된)로 쓰여질 수 있다. 또한,
- `A`가 **VPS**일때, `(A)`로 쓰여질 수 있다.

We can similarly define the  **nesting depth**  `depth(S)`  of any VPS  `S`  as follows:

-   `depth("") = 0`
-   `depth(C) = 0`, where  `C`  is a string with a single character not equal to  `"("`  or  `")"`.
-   `depth(A + B) = max(depth(A), depth(B))`, where  `A`  and  `B`  are  **VPS**'s.
-   `depth("(" + A + ")") = 1 + depth(A)`, where  `A`  is a  **VPS**.

어떤 VPS `S`의 **중첩 깊이** `depth(S)`를 다음과 같이 정의할 수 있다:
- `depth("") = 0`
- `C`가 `"("`과 `")"`이 아닌 단일 문자일 때, `depth(C) = 0`
- `A`와 `B`가 **VPS**일 때, `depth(A + B) = max(depth(A), depth(B))`
- `A`가 **VPS**일 때, `depth("(" + A + ")") = 1 + depth(A)`

For example,  `""`,  `"()()"`, and  `"()(()())"`  are  **VPS**'s (with nesting depths 0, 1, and 2), and  `")("`  and  `"(()"`  are not  **VPS**'s.

예를들어, `""`, `"()()"`, 그리고 `"()(()())"`은 **VPS**이고(중첩 깊이 0,1, 그리고 2에 따라), 그리고 `")("`와 `"(()"`은 **VPS**가 아니다.

Given a  **VPS**  represented as string  `s`, return  _the  **nesting depth**  of_ `s`.

문자열 `s`로 표현된 **VPS**가 주어지면, `s`의 _**중첩 깊이**_ 를 반환하라.

## 예제

```
Input: s = "(1+(2*3)+((8)/4))+1"
Output: 3
Explanation: Digit 8 is inside of 3 nested parentheses in the string.
```
```
Input: s = "1+(2*3)/(2-1)"
Output: 1
```

## 접근 방법

1. 스택을 이용한 방법

문자열을 읽으면서 여는 괄호(`"("`)를 만나면 스택에 쌓고, 닫는 괄호(`")"`)를 만나면 스택의 탑을 제거한다. 이때, 제거하기 전의 스택의 사이즈가 해당 괄호쌍의 중첩 깊이가 된다.

2. 스택을 이용하지 않는 방법

 스택을 이용한 방법에서 실제 필요한 것이 스택에 쌓인 값이 아니라 스택의 사이즈라는 점을 생각 했을 때, 불필요한 저장 공간이 사용되는 방법이라 생각한다. 이에 스택의 사이즈 값만 따로 관리하고자 한다.

스택 사이즈를 기록할 변수를 설정하고, 여는 괄호(`"("`)를 만나면 `+1`, 닫는 괄호(`")"`)를 만나면 `-1`한다. 해당 변수가 0부터 시작한다고 하였을 때, 닫는 괄호를 만나는 순간(`-1`하기 전)의 값이 해당 괄호쌍의 깊이가 된다.

## Full Source Code

|lang|url|
|-|-
|JavaScript|https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1614.js|
|Python3|https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1614.py|
