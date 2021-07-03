# 125. Valid Palindrome

출처: https://leetcode.com/problems/valid-palindrome/

## 문제

Given a string  `s`, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

주어진 문자열 `s`에서 오직 문자와 숫자만을 고려하여 `s`가 펠린드롬인지 아닌지 판단하라.

## 예제

```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

## 접근 방법

문자열 `s`에서 문자와 숫자만을 남기고 없애는 작업을 정규표현식을 이용하여 수행한다.
<pre>
<code>
// JavaScript Code
s = s.toLowerCase().replace(/[^a-z0-9]/g, '')
</code>
</pre>

먼저 `s`의 모든 문자를 소문자로 변경한다. 이후, 문자열에서 문자와 숫자를 제외한 단어(특수문자 혹은 공백)를 선택해야하는데 이를 표현하는 정규표현식이 `/[^a-z0-9]/g`이다. 정규표현식에 의해 선택된 단어를 없애는 것으로 펠린드롬을 확인하기위한 전처리가 끝난다.

펠린드롬을 확인하는 것은 문자열을 뒤집어서 원본과 같은지 확인하는 것으로 펠린드롬 체크를 할 수 있다.
<pre>
<code>
if (s == s.split('').reverse().join('')) {
	return True;
} else {
	return False
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|JavaScript|[125.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/125.js)|
|Python3|[125.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/125.py)|
