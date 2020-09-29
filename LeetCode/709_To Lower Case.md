# 709. To Lower Case

출처 : https://leetcode.com/problems/to-lower-case/

## 문제

Implement function ToLowerCase() that has a string parameter str, and returns the same string in lowercase.
(문자열 str을 입력받아 소문자로 변환하여 반환하는 ToLowerCase() 함수를 구현하라)

## 예제

- Example 1
```
Input: "Hello"
Output: "hello"
```
- Example 2
```
Input: "here"
Output: "here"
```
- Example 3
```
Input: "LOVELY"
Output: "lovely"
```

## 접근 방법

JavaScript에는 기본적으로 String에 toLowerCase() 함수가 존재하지만 내장함수를 사용하지 않고 구현하였음.

str을 순회하면서 각 알파벳이 아스키코드의 65(A) ~ 90(Z) 에 해당된다면 32를 더해 97(a) ~ 122(z)로 변환하는 방식으로 문제 해결

## Code
<pre>
<code>
var toLowerCase = function(str) {
    var answer = '';
    str = str.split('');
    str.forEach(val => {
        let charCode = val.charCodeAt(0);
        if (charCode >= 65 && charCode <= 90) {
            charCode = charCode + 32;
        }
        answer += String.fromCharCode(charCode);
    });
    return answer;
};
</code>
</pre>
