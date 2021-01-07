# 1111.  Maximum Nesting Depth of Two Valid Parentheses Strings

출처 : https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/

## 문제

A string is a  _valid parentheses string_ (denoted VPS) if and only if it consists of  `"("`  and  `")"`  characters only, and:

문자열이 만약 `"("`와 `")"`문자로만 이루어져 있다면 _유효한 괄호 문자열_ (이하 VPS)이다, 그리고 :

-   It is the empty string, or
-   It can be written as `AB` (`A` concatenated with `B`), where `A` and `B` are VPS's, or
-   It can be written as `(A)`, where `A` is a VPS.

- VPS는 빈 문자열이거나
- `AB`(`A`에 `B`를 결합한)형태로 작성할 수 있으며 `A`와 `B`는 VPS이다. 
- `(A)`로 작성할 수 있으며 `A`는 VPS이다. 

We can similarly define the  _nesting depth_  `depth(S)`  of any VPS  `S`  as follows:

유사하게 VPS `S`의 _중첩 깊이_`depth(S)`를 다음과 같이 정의할 수 있다. 

-   `depth("") = 0`
-   `depth(A + B) = max(depth(A), depth(B))`, where  `A`  and  `B`  are VPS's
-   `depth("(" + A + ")") = 1 + depth(A)`, where  `A`  is a VPS.

For example, `""`, `"()()"`, and `"()(()())"` are VPS's (with nesting depths 0, 1, and 2), and  `")("`  and  `"(()"`  are not VPS's.

예를들어, `""`, `"()()"` 그리고 `"()(()())"`는 VPS(중첩 깊이가 0, 1 그리고 2인)이다. 그리고 `")("` 그리고 `"(()"`는 VPS가 아니다.

Given a VPS  seq, split it into two disjoint subsequences  `A`  and  `B`, such that `A`  and  `B`  are VPS's (and `A.length + B.length = seq.length`).

VPS의 시퀀스가 주어지면, 두개의 분리된 하위 시퀀스 `A`와 `B`로 분해하라, `A`와 `B`는 VPS이다(그리고 `A.length + B.length = seq.length`). 

Now choose  **any**  such  `A`  and  `B`  such that `max(depth(A), depth(B))`  is the minimum possible value.

이제 `max(depth(A), depth(B))`를 가능한 최소 값으로 하는 `A`와 `B`를 선택하라.

Return an  `answer`  array (of length  `seq.length`) that encodes such a choice of  `A`  and  `B`: `answer[i] = 0`  if  `seq[i]`  is part of  `A`, else  `answer[i] = 1`. Note that even though multiple answers may exist, you may return any of them.

선택한 `A`와 `B`를 인코딩한 배열 `answer`(`seq.length`의 길이)를 반환하라 : 만약 `seq[i]`가 `A`의 부분이라면 `answer[i] = 0`를, 아니라면 `answer[i] = 1` 이다. 다양한 답이 존재할지도 모른다, 이들 중 어떤 답이든 반환하여도 된다.

## 예제

```
Input: seq = "(()())"
Output: [0,1,1,1,1,0]
```
```
Input: seq = "()(())()"
Output: [0,0,0,1,1,0,1,1]
```

## 접근방법

문제 풀이의 핵심은 `중첩 깊이가 2이상인 VPS를 어떤 방식으로 분해할 것인가`이다. 중첩깊이가 1인 VPS는 A와 B 어디에 배분하여도 상관없기 때문이다.

이를 위해 간단한 예시를 손으로 풀어보면 다음과 같다.
```
( ( ) )
A B B A

( ( ) ( ) )
A B B B B A

( ( ( ) ) )
A B A A B A
```
위의 예제를 통해 현재 괄호가 어디로 배분되야 하는지는 바로 이전 괄호에 의해 결정되는 것을 알 수 있다.
- Case 1. `(` => `(` 경우, 다른 곳으로 배분 ( if_ 이전이 A 였다면, B로)
- Case 2. `)` => `)` 경우, 다른 곳으로 배분 ( if_ 이전이 A 였다면, B로)
- Case 3. `(` => `)` 경우, 같은 곳으로 배분 ( if_ 이전이 A 였다면, A로)
- Case 4. `)` => `(` 경우, 같은 곳으로 배분 ( if_ 이전이 A 였다면, A로)

이에 대한 구현은 여러 방법이 있지만, 여기서는 VPS의 특성을 이용하였다.
`(`이 1이고 `)`이 -1이라 하였을 때, VPS라면 순차적으로 합을 계산할 때 어떤 순간에서도 합이 음수가 될 수 없으며 최종 결과는 0이여야한다. 이를  이용해서 A와 B로 배분을 하였다.

## Code

<pre>
<code>
var maxDepthAfterSplit = function(seq) {
    var answer = Array(seq.length).fill(0);
    
    var A = 0,
        B = 0;
    for (let i = 0; i < seq.length; i++) {
        let s = seq[i] == '(' ? 1 : -1;
        if (s > 0 && A > B || s < 0 && A <= B) {
            B += s;
            answer[i] = 1;
        } else {
            A += s;
        }
    }
    
    return answer;
};
</code>
</pre>
