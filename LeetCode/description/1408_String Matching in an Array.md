# 1408. String Matching in an Array
출처 : https://leetcode.com/problems/string-matching-in-an-array/

## 문제

Given an array of string  `words`. Return all strings in  `words`  which is substring of another word in  **any**  order.
(문자형 배열 `words`가 주어진다.  순서 상관없이 어떤 단어의 하위 문자열인 `words`의 모든 문자열을 반환하라.)

String  `words[i]`  is substring of  `words[j]`, if can be obtained removing some characters to left and/or right side of  `words[j]`.
(만약 `words[i]`가 `words[j]`의 오른쪽 혹은 왼쪽 일부 문자를 제거하여 만들수 있다면, 문자열 `words[i]`는 `words[j]`의 하위 문자열이다.)

## 예제

- Example 1
	```
	Input: words = ["mass","as","hero","superhero"]
	Output: ["as","hero"]
	Explanation: "as" is substring of "mass" and "hero" is substring of "superhero".
	["hero","as"] is also a valid answer.
	```
	
## 접근방법

아래의 2가지를 고려하여 모든 조합을 비교
- 자기 자신과 비교 X
- `words[i]`가 `words[j]`의 하위문자열인지 아닌지 비교할때, `words[i]`의 길이가 `words[j]`보다 크면 안됨
 
## Code
<pre>
<code>
var stringMatching = function(words) {
    var n = words.length;
    var answer = [];
    for (let i = 0; i < n; i++) {
        let word_n = words[i].length;
        for (let j = 0; j < n; j++) {
            if (i == j || word_n > words[j].length) continue;
            
            if (words[j].indexOf(words[i]) != -1) {
                answer.push(words[i]);
                break;
            }
        }
    }
    return answer;
};
</code>
</pre>
