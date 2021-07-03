# 557. Reverse Words in a String III

출처 : https://leetcode.com/problems/reverse-words-in-a-string-iii/


## 문제

Given a string, you need to reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.
(문자열이 주어지면, 문장안의 각 단어의 알파벳의 순서를 뒤집어라. 단, 공백과 초기 단어의 순서는 유지되어야 한다.)

## 예제

- Example 1
	```
	Input: "Let's take LeetCode contest"
	Output: "s'teL ekat edoCteeL tsetnoc"
	```

## 접근방법

1. Javascript의 String과 Array의 내장 함수인 `reverse()`, `split()`을 이용하는 방법
2. 위의 두 함수의 기능을 구현하는 방법

두 방법에 대해 테스트한 결과, 사용한 저장공간의 크기는 비슷하나 속도 측면에서 내장함수가 더 빠른 것을 확인 할 수 있었음

## Code

1. 내장 함수 사용
<pre>
<code>
var reverseWords = function(s) {
    var words = s.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].split('').reverse().join('');
    }
    var answer = words.join(' ');
    return answer;
};
</code>
</pre>

2. 기능 구현
<pre>
<code>
var reverseWords = function(s) {
    var words = split(s);
    var result = "";
    for (let i = 0; i < words.length; i++) {
        result += reverse(words[i]) + " ";
    }
    return result.trim();
};

var split = function(s) {
    var result = [];
    
    var word = '';
    for (let c of s) {
        if (c == ' ') {
            result.push(word);
            word = '';
        } else {
            word += c;
        }
    }
    if (word != '') result.push(word);
    
    return result;
}

var reverse = function(arr) {
    var word = '';
    for (let i = 0; i < arr.length; i++) {
        word = arr[i] + word;
    }
    return word;
}
</code>
</pre>
