# 1544. Make The String Great
출처 : https://leetcode.com/problems/make-the-string-great/

## 문제

Given a string  `s`  of lower and upper case English letters.
(소문자와 대문자가 섞인 영어 단어 `s`가 주어진다.)

A good string is a string which doesn't have **two adjacent characters**  `s[i]`  and  `s[i + 1]`  where:
(좋은 문자열이란, 인접한 두 문자 `s[i]`와 `s[i+1]`이 다음과 같은 특징을 지니지 않는다.)
-   `0 <= i <= s.length - 2`
-   `s[i]`  is a lower-case letter and  `s[i + 1]`  is the same letter but in upper-case or  **vice-versa**. (`s[i]`가 소문자이고 `s[i+1]` 또한 같은 단어이면서 대문자이다. 반대의 경우도 마찬가지)

To make the string good, you can choose  **two adjacent**  characters that make the string bad and remove them. You can keep doing this until the string becomes good.
(좋은 문자를 만들기위해, 문자열을 나쁘게 만드는 두 인접한 문자를 선택해야 하고 지워야한다. 이러한 행위를 좋은 문자열이 만들어질때까지 반복한다.)

Return  _the string_  after making it good. The answer is guaranteed to be unique under the given constraints.
(좋은 문자열로 만들어진 후 문자열을 반환하라. 답은 주어진 조건아래 유일함이 보장된다.)

**Notice**  that an empty string is also good.
(빈 문자열 또한 좋은 문자열이다.)
## 예제

- Example 1
	```
	Input: s = "leEeetcode"
	Output: "leetcode"
	Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".
	```
- Example 2
	```
	Input: s = "abBAcC"
	Output: ""
	Explanation: We have many possible scenarios, and all lead to the same answer. For example:
	"abBAcC" --> "aAcC" --> "cC" --> ""
	"abBAcC" --> "abBA" --> "aA" --> ""
	```
## 접근 방법

아스키 코드로 대문자와 소문자는 정확히 32 차이가 있음 (대문자 A는 65이지만, 소문자 a는 97임). 이를 이용하여 s[i]와 s[i+1]을 비교해 문제의 문자열을 확인 및 제거

이러한 동작을 좋은 문자열이 될 때까지. 즉, 더 이상 제거해야할 문자열이 존재하지 않을 때까지 반복해야 하기때문에 제거한 이후 문자열의 처음부터 재차 반복

## Code
<pre>
<code>
var makeGood = function(s) {
    for (let i = 0; i < s.length-1; i++) {
        let wordCode1 = s[i].charCodeAt(0);
        let wordCode2 = s[i+1].charCodeAt(0);
        
        if (wordCode2+32 == wordCode1 || wordCode1+32 == wordCode2) {
            s = s.replace(s[i]+s[i+1], "");
            i = -1;
        }
    }
    return s;
};
</code>
</pre>
