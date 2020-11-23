# 1021. Remove Outermost Parentheses
출처 : https://leetcode.com/problems/remove-outermost-parentheses/

## 문제
A valid parentheses string is either empty  `("")`,  `"(" + A + ")"`, or  `A + B`, where  `A`  and  `B`  are valid parentheses strings, and  `+`  represents string concatenation. For example,  `""`,  `"()"`,  `"(())()"`, and  `"(()(()))"`  are all valid parentheses strings.
(유효한 괄호 문자열은 빈 괄호 `("")`, `"(" + A + ")"` 또는 `A + B`이다. `A` 와 `B`는 유효한 괄호 문자열이고, `+`는 문자열의 결합을 의미한다. 예를들어, `""`, `"()"`, `"(())()"` 그리고 `"(()(()))"`은 모두 유효한 괄호 문자열이다.)

A valid parentheses string  `S`  is  **primitive**  if it is nonempty, and there does not exist a way to split it into  `S = A+B`, with  `A`  and  `B`  nonempty valid parentheses strings.
(유효한 괄호 문자열 `S`이 **primitive**하다는 것은, `S`가 비어있지 않으면서 `S = A+B`로 나눌 방법이 존재하지 않는다는 것이다. 이때, `A`와 `B`는 비어있지 않은 괄호 문자열이다.)

Given a valid parentheses string  `S`, consider its primitive decomposition:  `S = P_1 + P_2 + ... + P_k`, where  `P_i`  are primitive valid parentheses strings.
(유효한 괄호 문자열 `S`가 주어질 때, **primitive** 분해로 간주하여라:  `S = P_1 + P_2 + ... + P_k`, `P_i`는 원시의 유요한 괄호 문자열이다.)

Return  `S`  after removing the outermost parentheses of every primitive string in the primitive decomposition of  `S`.
(`S`의 원시 분해에서 모든 원시 문자열의 최외곽 괄호를 제거한 후 `S`를 반환하라.)

## 예제

- Example 1
	
## 접근방법

문자열 `S`가 `primitive`하다는 것은
1. `S`는 비어있지 않은 유효한 문자열이다.
2. `S`를 더 작은 비어있지 않은 유효한 문자열로 분해가 불가능하다.

예로 들어 `S = (()())()` 이라면, `S = P_1 + P_2`로 표현할 수 있고 `P_1 = (()())`, `P_2 = ()`임. 이 때 `P_1`, `P_2`은 더 이상 분해가 불가능한 상태. 
- `P_1`과 `P_2`을 각각 어떻게 분해한다고 하여도 괄호의 쌍이 맞지 않음
- 만약 `P_1`을 `(()`와 `())`로 분해한다고 하면 `(()`는 여는 괄호가 2개인 반면 닫는 괄호가 1개이기 때문에 쌍이 맞지 않음. `())`인 경우도 여는 괄호는 1개이지만 닫는 괄호가 2개.

하나의 `primitive`한 문자열을 찾기 위해서 변수 n을 선언
n은 문자열 `S`를 읽어가면서 여는괄호 `(`를 만나면 +1을 하고 닫는괄호 `)`를 만나면 -1을 함
n == 0인 순간이 하나의 `primitive`한 문자열을 찾아낸 지점이 됨

위에서 든 예제 `S = (()())()`을 대상으로 `primitive`한 문자열을 찾는 과정을 살펴보면
- `S`의 인덱스 0 = `(`, n = 1
- `S`의 인덱스 1 = `(`, n = 2
- `S`의 인덱스 2 = `)`, n = 1
- `S`의 인덱스 3 = `(`, n = 2
- `S`의 인덱스 4 = `)`, n = 1
- `S`의 인덱스 5 = `)`, n = 0 =>  `primitive`한 문자열 찾음
- `S`의 인덱스 6 = `(`, n = 1
- `S`의 인덱스 7 = `(`, n = 0 =>  `primitive`한 문자열 찾음

## Code
1. 모든 라운드를 시뮬레이션하여 각 섹션의 방문 횟수를 구하는 방법
<pre>
<code>
var removeOuterParentheses = function(S) {
    var n = 1;
    var answer = '';
    for (let i = 1; i < S.length; i++) {
        if (S[i] == '(') n++;
        else if (S[i] == ')') n--;
        
        if (n == 0) {
            n = 1;
            i++;
        } else {
            answer += S[i];
        }
    }
    
    return answer;
};
</code>
</pre>
