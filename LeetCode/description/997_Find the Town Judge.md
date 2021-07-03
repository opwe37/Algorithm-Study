# 997. Find the Town Judge
출처: https://leetcode.com/problems/find-the-town-judge/

## 문제

In a town, there are  `N`  people labelled from `1`  to  `N`. There is a rumor that one of these people is secretly the town judge.

한 마을에 `1`~`N`으로 명명된 `N`명의 사람이 있다. 이 사람들 중 한명이 마을의 비밀 판사라는 소문이 있다.

If the town judge exists, then:

1.  The town judge trusts nobody.
2.  Everybody (except for the town judge) trusts the town judge.
3.  There is exactly one person that satisfies properties 1 and 2.

만약 마을의 판사가 있다면:
1. 마을 판사는 아무도 신뢰하지 않는다.
2. (판사를 제외한) 모든 사람은 마을 판사를 신뢰한다.
3. 1과 2를 만족하는 사람은 정확히 한명이다. 

You are given  `trust`, an array of pairs  `trust[i] = [a, b]`  representing that the person labelled  `a`  trusts the person labelled  `b`.

`a`가 `b`를 신뢰함을 다음과 같이 `trust[i] = [a, b]`로 표현한 배열 `trust`가 주어진다.

If the town judge exists and can be identified, return the label of the town judge. Otherwise, return  `-1`.

만약 마을 판사가 있고 찾을 수 있다면, 마을 판사의 번호를 반환하라. 그렇지 않다면, `-1`을 반환하라.

## 예제

```
Input: N = 2, trust = [[1,2]]
Output: 2
```
```
Input: N = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
Output: 3
```
## 접근 방법

마을 사람들의 신뢰 관계를 다음의 규칙에 따라 점수를 매긴다.
- 모든 사람들의 초기 점수는 0이다.
- `trust[i] = [a, b]` 일 때, `b`의 점수를 1 올리고 `a`의 점수를 1 내린다.

만약 마을 판사가 존재한다면, 마을 사람 중 누군가는 `N-1`점을 기록할 것이다. 왜냐하면, 판사는 자신을 제외한 모든 사람에게서 점수를 받고, 본인은 그 누구도 믿지 않기 때문에 감점되는 점수가 없기 때문이다. `N-1`점을 받는 사람이 없다면, 문제에서 주어진 조건을 만족하지 않기 때문에 판사가 없는 것이다.

## Full Source Code
|lang|url|
|-|-|
|JavaScript|https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/997.js|
|Python3|https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/997.py|
