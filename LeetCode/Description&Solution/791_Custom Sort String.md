# 791. Custom Sort String
출처: https://leetcode.com/problems/custom-sort-string/

## 문제

`S`  and  `T`  are strings composed of lowercase letters. In  `S`, no letter occurs more than once.

`S`  was sorted in some custom order previously. We want to permute the characters of  `T`  so that they match the order that  `S`  was sorted. More specifically, if  `x`  occurs before  `y`  in  `S`, then  `x`  should occur before  `y`  in the returned string.

Return any permutation of  `T`  (as a string) that satisfies this property.

소문자로 이루어진 문자열 `S`와 `T`가 있다. `S`에는 중복된 문자가 없다.

`S`가 커스텀 순서로 정렬되어 있다고 할때, `T` 또한 커스텀 순서로 정렬시켜라. 만약 `S`에서 `x`가 `y`보다 먼저 나온다면, 반환된 문자열에서도 `x`가 `y`이전에 나와야 한다.



## 예제
```
Example :
Input:
S = "cba"
T = "abcd"
Output: "cbad"
Explanation: 
"a", "b", "c" appear in S, so the order of "a", "b", "c" should be "c", "b", and "a". 
Since "d" does not appear in S, it can be at any position in T. "dcba", "cdba", "cbda" are also valid outputs.
```

## 접근 방법

문제에는 `S`에 등장하지 않는 문자의 경우가 설명되어 있지 않는데, 예제를 보면 그 의문을 해결할 수 있다. 예제의 설명을 보면, `S`에 등장하지 않는 문자는 결과 문자열의 어느 곳이든 들어가있기만 하면 된다는 것을 알 수 있다. 문제를 다시 정리하면 다음과 같다.

- `S`는 커스텀 순서로 정렬된 문자이고, `T`를 `S`와 동일한 순서로 정렬 시켜야한다.
- `S`에 등장하는 `T`의 문자는 `S`의 등장 순서를 지켜야한다.
- `S`에 등장하지 않는 `T`의 문자는 결과 문자열 아무 곳이나 들어가도 된다.

어떤 아이템들을 정렬하기 위해서는 아이템 간의 비교가 가능해야 한다. 이를 위해 `S`의 문자를 읽으면서 등장 순서대로 번호를 붙인다. 예를 들어 `S = "cba"`이면, `{c: 1, b: 2, a: 3}`과 같은 형태이다. 이후, 문자를 비교할 때, 문자와 매핑되어 있는 숫자 비교를 통해 상대적 순서를 알 수 있다.

다음은 `S`에 등장하지 않는 문자의 경우를 고려해야한다. `S`에 없는 문자는 어느 곳이나 등장해도 되기때문에 임의의 숫자와 매핑시켜도 되지만, `S`에 없는 문자를 찾아야하는 번거로움이 있다. 그렇기 때문에 두 문자를 비교하는 순간에 다음과 같이 처리하여 `T` 문자 중 `S`에 없는 문자를 찾기 위해 탐색하는 번거로움을 해결할 수 있다.
- `S`에 등장한 두 문자를 비교한다면, 그 순서를 따르도록 한다.
- 두 문자 중 하나만 `S`에 존재한다면, 존재하는 문자가 더 작은 것으로 판단한다.
- 두 문자 모두 `S`에 없다면, 둘은 동일한 것으로 취급한다.
```
// dict: Map구조로 S의 각 문자에 대한 순서가 저장되어 있음
function compare(a, b) {
	if (dict.has(a) && dict.has(b)) return dict.get(a) - dict.get(b);
	if (dict.has(a)) return -1;
	if (dict.has(b)) return 1;
	return 0;
})
```

이제 `S`와 `T`에 등장하는 모든 문자에 대해서 크고 작음의 비교가 가능하게 되었기 때문에, 정렬 알고리즘을 이용하여 `T`의 문자를 오름차순으로 정렬하면 된다.

## Full Code
|language|url|
|--------|---|
|JavaScript|[791.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/791.js)|
|Python3|[791.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/791.py)|
