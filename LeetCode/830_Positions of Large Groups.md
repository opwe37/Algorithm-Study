# 830. Positions of Large Groups
출처 : https://leetcode.com/problems/positions-of-large-groups/

## 문제 

In a string  `s` of lowercase letters, these letters form consecutive groups of the same character.

For example, a string like  `s = "abbxxxxzyy"`  has the groups  `"a"`,  `"bb"`,  `"xxxx"`,  `"z"`, and `"yy"`.

A group is identified by an interval `[start, end]`, where `start` and `end` denote the start and end indices (inclusive) of the group. In the above example, `"xxxx"` has the interval `[3,6]`.

A group is considered **large** if it has 3 or more characters.

Return _the intervals of every  **large**  group sorted in **increasing order by start index**_.

소문자 문자열 `s`는 같은 문자의 연속된 그룹 형태를 갖는다. 예를 들어, `s = "abbxxxxzyy"`는 `"a"`,  `"bb"`,  `"xxxx"`,  `"z"`, 그리고 `"yy"` 그룹을 갖고 있다.

그룹은 간격 `[start, end]`로 식별되어진다, `start`와 `end`는 그룹의 시작과 끝 인덱스를 가르킨다. 위의 예제에서 `"xxxx"`는 간격 `[3,6]`으로 표현된다.

만약 3개 이상의 문자를 갖는 그룹은 **큰** 그룹으로 고려된다.

_모든 **큰**그룹의 간격들을 **시작 인덱스의 오름차순**_ 으로 반환하라.

## 예제
```
Input: s = "abbxxxxzzy"
Output: [[3,6]]
Explanation: `"xxxx" is the only` large group with start index 3 and end index 6.
```
```
Input: s = "abc"
Output: []
Explanation: We have groups "a", "b", and "c", none of which are large groups.
```
```
Input: s = "abcdddeeeeaabbbcd"
Output: [[3,5],[6,9],[12,14]]
Explanation: The large groups are "ddd", "eeee", and "bbb".
```

## 접근 방법

투 포인터(two pointer) 알고리즘을 이용

포인터의 이름은 start, end이고, 반복문을 통해 s를 순회하면서 다음과 같이 이동한다.
- end 포인터는 매 과정마다 1씩 증가
- start 포인터는 s[start] != s[end] 일때, end 포인터 위치로 이동

이와같은 포인터의 움직임에서, `start`가 이동하는 순간의 의미를 생각해보자. 반복문이 진행이 되면서 `start`가 이동하지 않는다는건 `s[start] == s[end]`라는 것이고, 이는 `start` ~ `end`까지 같은 문자임을 뜻한다.

그렇다면 `s[start] != s[end]`일때는 `start` ~ `end-1` 까지는 같은 문자로 이루어진 하나의 그룹이라는 것이고 `end - start = 그룹의 크기`가 된다. 이 그룹의 크기가 3보다 크다면 그것은 큰 그룹으로 간주되는 것이고 답에 포함시켜야한다.

## Code

<pre>
<code>
var largeGroupPositions = function(s) {
    let preWord = s[0];
    const intervals = [];
    let start = 0, end = 0;
    while (end < s.length) {
        if (end == s.length-1 || s[start] != s[end]) {
            end = (end == s.length-1 && s[end] == s[end-1]) ? ++end : end;
            if ((end - start) >= 3) {
                intervals.push([start, end-1]);
            }
            start = end;
        }
        end++;
    }
    return intervals;
};
</code>
</pre>
