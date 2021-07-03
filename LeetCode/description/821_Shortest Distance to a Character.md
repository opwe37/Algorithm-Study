# 821. Shortest Distance to a Character

출처 : https://leetcode.com/problems/shortest-distance-to-a-character/


## 문제

Given a string  `S` and a character  `C`, return an array of integers representing the shortest distance from the character  `C`  in the string.

문자열 `S`와 문자 `C`가 주어지면, 문자열에서 문자 `C`와 가장 가까운 거리를 나타내는 정수 배열을 반환하라.

## 예제

```
Input: S = "loveleetcode", C = 'e'
Output: [3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]
```

## 접근방법

주어진 문자열 `S`를 정방향으로 한번, 역방향으로 한번 읽으면서 문자 `C`와의 거리를 측정하고 더 가까운 거리를 저장하도록 구현

S = "loveleetcode", C = 'e'를 예로 들어보자.
```
정방향으로 읽으면서 'e'와의 거리를 적는다.
거리 측정의 기준은 현재 인덱스 이전의 'e'의 인덱스값

->
l o v e l e e t c o d e
- - - - 0 1 0 0 1 2 3 4 0 

이때, 첫 'e'가 나타나기 전까지의 단어의 경우 거리를 측정할 기준이 없어서 계산 불가
생각해보면 해당 단어들은 역방향 계산 시 측정되는 거리가 가장 작은 값임이 자명함
(해당 단어의 좌측에는 'e'가 없기 때문에 우측의 'e'와의 거리만이 존재함)
```
```
역방향으로 읽으면서 'e'와의 거리 측정
                    <-
l o v e l e e t c o d e
3 2 1 0 1 0 0 4 3 2 1 0 
```
```
위의 두 결과를 취합
l o v e l e e t c o d e
3 2 1 0 1 0 0 1 2 2 1 0
```

##  Code
<pre>
<code>
var shortestToChar = function(S, C) {
    const n = S.length;
    
    var answer = Array(n).fill(0);
    
    let preIdx = -10000;
    for(let i = 0; i < n; i++) {
        if (S[i] == C) preIdx = i;
        answer[i] = i - preIdx;
    }
    
    preIdx = 10000;
    for (let i = n-1; i >= 0; i--) {
        if (S[i] == C) preIdx = i;
        answer[i] = Math.min(answer[i], preIdx - i);
    }
    
    return answer;
};
</code>
</pre>
