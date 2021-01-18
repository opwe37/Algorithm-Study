# 828. Count Unique Characters of All Substrings of a Given String
출처 : https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/

## 문제 

Let's define a function  `countUniqueChars(s)` that returns the number of unique characters on  `s`, for example if  `s = "LEETCODE"` then  `"L"`,  `"T"`,`"C"`,`"O"`,`"D"`  are the unique characters since they appear only once in  `s`, therefore `countUniqueChars(s) = 5`.  
  
On this problem given a string  `s`  we need to return the sum of `countUniqueChars(t)` where  `t`  is a substring of  `s`. Notice that some substrings can be repeated so on this case you have to count the repeated ones too.

Since the answer can be very large, return the answer modulo `10 ^ 9 + 7`.

함수 `countUniqueChars(s)`가 문자열 `s`에서 유일한 문자의 수를 반환하는 함수이다. 예를 들어, 만약 `s = "LEETCODE"`라면 `"L"`,`"T"`,`"C"`,`"O"`,`"D"`는 `s`에서 오직 한번 나타나기때문에 유일한 문자이고 `countUniqueChars(s) = 5`이다.

이 문제에서 문자열 `s`가 주어지면 `s`의 하위문자열 `t`에 대해서 `countUniqueChars(t)`의 합을 반환해야 한다. 일부 하위문자열은 반복될 수도 있고 이 경우 반복되는 문자열도 계산해야 한다.

답이 매우 클 수 있기 때문에,  `10 ^ 9 + 7`로 나눈 나머지를 반환하라.

## 예제
```
Input: s = "ABC"
Output: 10
Explanation: All possible substrings are: "A","B","C","AB","BC" and "ABC".
Evey substring is composed with only unique letters.
Sum of lengths of all substring is 1 + 1 + 1 + 2 + 2 + 3 = 10
```
```
Input: s = "ABA"
Output: 8
Explanation: The same as example 1, except `countUniqueChars`("ABA") = 1.
```

## 접근 방법

본 문제를 해결하기 앞서서 `s`의 문자, `s[i]`가 유일한 문자인 `s`의 하위문자열 `t`의 수를 구하는 문제를 생각해보자.</br>
`s[i] = 'A'` 이고  `s[j] == s[i] == s[k]`(j < i <k)라고 가정하면, `(i-j) * (k-i)개`의 하위문자열이 `s[i]`가 유일한 문자인 `s`의 하위문자열이다.

이제 `i`를  s의 첫 문자부터 마지막 문자까지 점진적으로 늘려가면서 실제 하위문자열과 어떻게 연결되는지 확인해보자. 
```
s = ABA
subStrings(t's list) = A, B, A, AB, BA, ABA

// 만약 하위문자열 중 s[i]가 포함되고, s[i]가 유일한 문자인 경우 '_'로 표시
// 그렇지 않는 경우, '·'으로 표시
// s[i]가 유일 문자이여야하기 때문에, t에 표시되는 '_'는 0 또는 1개이여야 한다.

case1. unique char = s[0] = A
t: A, B, A, AB, BA, ABA
   _, ·, ·, _·, ··, ···
 
→ s[0]이 포함되어 있고, 유일한 문자인 하위 문자열 = 2개(A, AB)

case2. unique char = s[1] = B
t: A, B, A, AB, BA, ABA
   ·, _, ·, ·_, _·, ·_·

→ s[1]이 포함되어 있고, 유일한 문자인 하위 문자열 = 4개(B, AB, BA, ABA)

case3. unique char = s[2] = A
t: A, B, A, AB, BA, ABA
   ·, ·, _, ··, ·_, ···

→ s[2]이 포함되어 있고, 유일한 문자인 하위 문자열 = 2개(A, BA)
```

위의 예제에서 1번과 3번 과정을 합산해보면, 문자 'A'가 유일 문자인 하위문자열의 수를 구할 수 있다.
```
// case1 + case2
t: A, B, A, AB, BA, ABA
   _, ·, _, _·, ·_, ···

→ 'A'가 포함되어 있고, 유일 문자인 하위문자열 = 4개(= 2 + 2)
```
이를 다시 2번 과정과 합산하고 그 결과를 보면, `s`의 모든 하위문자열`t`에 대해서 유일 문자를 체크한 것과 같은 결과를 얻을 수 있다.
```
A, B, A, AB, BA, ABA
_, _, _, __, __, ·_·

→ 모든 하위문자열 't'에 대한 유일 문자의 수 = 8(= 4 + 4)
```

이처럼 문제를 직관적으로 접근하면 `countUniqueChar(t)` 함수를 구현하고, 각 하위문자열 `t`에 대한 결과를 합산해야 할 것처럼 보인다. 하지만, 문제에서 얻고자 하는 결과에 초점을 맞춰 문제를 다른 각도로 바라보면 다른 접근방법이 존재할 수 있음

## Code

<pre>
<code>
var uniqueLetterString = function(s) {
    const list = new Map();
    for (i in s) {
        const key = s[i]
        if (list.has(key)) {
            list.get(key).push(Number(i));
        } else {
            list.set(key, [Number(i)]);
        }
    }
    
    let answer = 0;
    list.forEach((val, key) => {
        let range = [-1, ...val, s.length];
        for (let i = 1; i < range.length-1; i++) {
            answer += (range[i]-range[i-1]) * (range[i+1]-range[i]);
        }
        answer %= (10**9 + 7);
    });
    
    return answer;
};
</code>
</pre>
