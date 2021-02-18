# 1733. Minimum Number of People to Teach
출처: https://leetcode.com/problems/minimum-number-of-people-to-teach/

## 문제

On a social network consisting of  `m`  users and some friendships between users, two users can communicate with each other if they know a common language.

`m`명의 사용자와 그들 간의 우정으로 구성된 소셜 네트워크에서, 두 사용자가 공통의 언어를 사용한다면 서로 대화가 가능하다.

You are given an integer  `n`, an array  `languages`, and an array  `friendships`  where:

-   There are  `n`  languages numbered  `1`  through  `n`,
-   `languages[i]`  is the set of languages the  `i​​​​​​th`​​​​ user knows, and
-   `friendships[i] = [u​​​​​​i​​​, v​​​​​​i]`  denotes a friendship between the users  `u​​​​​​​​​​​i`​​​​​ and  `vi`.

정수 `n`, 배열 `language`, 그리고 배열 `friendships`가 주어진다:
- `1` ~ `n`의 숫자가 부여된 `n`개의 언어가 있다.
- `languages[i]`는 `ith` 사용자가 알고 있는 언어의 집합이다,
- `friendships[i] = [ui, vi]`는 사용자 `ui`와 `vi`간의 우정을 나타낸다.

You can choose  **one**  language and teach it to some users so that all friends can communicate with each other. Return  _the_  _**minimum**_ _number of users you need to teach._

모든 친구들이 서로 대화할 수 있도록 **한 개의** 언어를 선택하여 사용자에게 가르칠 수 있다. 가르침이 필요한 _**최소**_ 사용자 수를 반환하라.

Note that friendships are not transitive, meaning if `x` is a friend of `y` and `y` is a friend of `z`, this doesn't guarantee that `x` is a friend of `z`.
우정은 추이적이지 않다, 이는 `x`가 `y`의 친구이고 `y`가 `z`와 친구일 때, `x`와 `z`가 친구임을 보장하지 않는다는 뜻이다.

## 예제
```
Input: n = 2, languages = [[1],[2],[1,2]], friendships = [[1,2],[1,3],[2,3]]
Output: 1
Explanation: You can either teach user 1 the second language or user 2 the first language.
```

## 접근 방법

한개의 언어를 뽑아서 가장 적은 인원을 가르쳐야 하기 때문에, 언어를 어떻게 뽑는지가 문제의 핵심이다. 이를 위해 2단계의 과정을 통하여 언어를 선택한다.
```
1. 대화가 통하지 않는 관계의 사용자들을 추려낸다.
2. 추려진 사용자들이 가장 많이 사용하는 언어를 찾는다.
```
대화가 통하지 않는 관계의 사용자들을 어떻게 찾을 수 있을까.<br>
우정관계의 두 사람이 사용하는 언어간의 교집합 여부를 체크하면 된다.
<pre>
<code>
// JavaScript에서 Set구조를 이용하여 교집합 체크할 수 있도록 함
Set.prototype.intersection = function(setB) {
    var intersection = new Set();
    for (var elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
}
</code>
</pre>
이 함수를 통해 반환된 결과는 두 집합의 공통 요소를 담고 있다. 본래의 문제로 돌아와 교집합의 크기가 0이라면 두 사용자는 대화할 수 없는 관계이다.

이제 추려진 사용자를 대상으로 그들이 가장 많이 사용하는 언어를 뽑아내야한다. map을 이용하여 `{key: language, count: number of user}`와 같은 형태로 각 언어를 몇명의 사용자가 사용할 수 있는지 카운트한다. 이후, 카운트된 결과를 토대로 가장 많이 사용되어지는 언어를 선택한다.

최종적으로 대화가 통하지 않는 사람의 수에서 카운트 된 수를 빼는 것으로 원하는 결과값을 얻을 수 있다.

## Full Source Code
|lang|url|
|-|-
|JavaScript|https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1733.js|
