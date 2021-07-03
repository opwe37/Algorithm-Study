# 1392. Longest Happy Prefix

출처 : https://leetcode.com/problems/longest-happy-prefix/

## 문제

A string is called a _happy prefix_ if is a  **non-empty**  prefix which is also a suffix (excluding itself).
(어떤 문자열이 공백이 아닌 접두사를 갖고 접두사와 접미사가 같은 경우 _happy prefix_ 라 부른다.)
Given a string  `s`. Return the  **longest happy prefix** of  `s` .
(문자열 `s`가 주어진다. **가장 긴 happy prefix**를 구하여라.)
Return an empty string if no such prefix exists.
(만약 이와같은 접두사가 존재하지 않는 경우 빈 문자열을 반환하라.)

## 예제
- Example 1
	```
	Input: s = "level"
	Output: "l"
	Explanation: s contains 4 prefix excluding itself ("l", "le", "lev", "leve"), and suffix ("l", "el", "vel", "evel"). The largest prefix which is also suffix is given by "l".
	```
- Example 2
	```
	Input: s = "leetcodeleet"
	Output: "leet"
	```

## 접근방법

특정 문자열에서 어떤 단어가 포함되어 있는지 확인하는 가장 쉬운 방법은 전수조사 즉, Brute-Force방법으로 모든 가능한 경우를 비교하는 방법이다.

하지만, 주어진 문자열 s가 길어질 수록 비효율적인 방법인 것은 당연하기 때문에 KMP(Knuth-Morris-Pratt) 알고리즘을 이용하여 효율적으로 문자열을 탐색

주어진 문제를 해결하기 위해서 KMP 알고리즘의 핵심 원리 중 하나인 실패 함수를 이용하고자 함.
- 실패함수 : 인덱스 k에서 접두사와 접미사가 일치하는 최대 길이

실패 함수를 구하는 방법은 다음의 예제와 같음
```
S = "ABABA", F(k) = 인덱스 k에서의 실패함수 값

i = 1, j = 0
// i : 비교할 인덱스 
// j : 일치 개수(첫 불일치 문자 이전까지 일치하는 문자의 수)

H | A B A B A
S |   A B A B A

H[i] = H[1] = B, S[j] = S[0] = A
H[1] != S[0] => F(1) = j = 0, i++


i = 2, j = 0
H | A B A B A
S |     A B A B A

H[i] = H[2] = A, S[j] = S[0] = A
H[2] == S[0] => F(2) = ++j = 1


i = 3, j = 1
H | A B A B A
S |     A B A B A

H[i] = H[3] = B, S[j] = S[1] = B
H[2] == S[0] => F(3) = ++j = 2


i = 4, j = 2
H | A B A B A
S |     A B A B A

H[i] = H[4] = A, S[j] = S[2] = A
H[2] == S[0] => F(4) = ++j = 3

i = 5, j = 3
i >= H.length(=5)
즉, 더 이상 비교 불가
```

위의 예제는 첫 시작을 제외하고 전부 일치하는 케이스이지만, 일치하는 않는 경우를 살펴보면
```
S = "ABABCA"
F(1) = 0, F(2) = 1, F(3) = 2

i = 2, j = 2
H | A B A B C A
S |     A B A B C A

H[i+j] = H[4] = C, S[j] = S[2] = A
H[4] != S[2] => F(4) = F(j-1) = F(1) = 0, i = i+j+1, j = 0
// S 기준 인덱스 2에서 불일치를 발견했다는 것은 인덱스 1까지는 일치한다는 소리
// S[0~1] = AB 에서 이동가능한 위치를 찾기위해서 F(1)을 참조

i = 5, j = 0
H | A B A B C A
S |           A B A B C A

H[i+j] = H[5] = A, S[j] = S[0] = A
H[4] == S[2] => F(5) = ++j
```

위의 방식으로 얻은 실패함수 값의 마지막 계산 값을 살펴보면, 전체 문자열에서 접두와 접미가 일치하는 최대의 길이. 즉, 우리가 구하고자 하는 문자열의 길이가 됨. 이 길이를 이용하여 주어진 문자열의 인덱스 0에서 길이만큼을 추출하면 얻고자 하는 문자열을 얻을 수 있음

## code
<pre>
<code>
var longestPrefix = function(s) {
    var answer = "";
    if (s.length <= 1) return answer;
    
    const n = s.length;
    var table = Array(n).fill(0); 
    
    for (i = 1, j = 0; i < s.length; i++) {
        while (j > 0 && s[i] != s[j]) j = table[j-1];
        if (s[i] == s[j]) table[i] = ++j;
    }
    
    answer = s.substr(0, table[n-1]);
    return answer;
};
</code>
</pre>
