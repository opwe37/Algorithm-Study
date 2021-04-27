# 1784.  Check if Binary String Has at Most One Segment of Ones
출처: https://leetcode.com/problems/check-if-binary-string-has-at-most-one-segment-of-ones/

## 문제

### 번역

**0으로 시작하지 않는** 이진 문자열 `s`에서, _만약_ `s`가 **연속적으로 1이 등장하는 부분이 최대 한군데**라면 `true`를 반환하라. 그렇지 않다면 `false`를 반환하라.

### 원문

Given a binary string `s`  **without leading zeros**, return `true` _if_ `s` _contains  **at most one contiguous segment of ones**_. Otherwise, return `false`.

## Example
```
Input: s = "1001"
Output: false
Explanation: The ones do not form a contiguous segment.
```
```
Input: s = "110"
Output: true
```
## 접근 방법

0으로 시작하지 않는 이진 문자이기 때문에 연속적으로 1이 등장하는 부분이 문자의 앞부분에만 있어야 된다. 즉, 한번 0이 등장하기 시작하면 그 뒤 문자에서는 1이 등장하면 안된다. 다음과 같은 방식으로 이를 체크할 수 있다.
<pre>
<code>
function solution(s) {
	for (let i = 1; i < s.length; i++) {
		if (s[i] == '1' && s[i-1] == '0') return false;
	}
	return true;
}
</code>
</pre>
문자를 탐색하면서 0다음에 1이 나오는지 체크하는 것이다. 이를 좀더 살펴보면, 결국 이 코드는 문자에서 `01` 패턴이 존재하는지 찾고 있는 것이다. 정규표현식으로 해결이 가능한 문제로 보이고, 다음과 같이 해결할 수 있다.
<pre>
<code>
function solution(s) {
	return !(/01/.test(s));
}
</code>
</pre>
`regex.test(str)`는 파라미터로 주어진 `str`에서 `regex`의 패턴이 존재하는지 여부를 체크하여 존재한다면 `true`를 반환하고, 그렇지 않다면 `false`를 반환하는 함수이다. 이 함수를 이용해서 찾고자 하는 패턴 `/01/`을 찾고, 문제에서 요구하는 형태로 반환하도록 한 것이 두번째 코드이다.

## Full Code
|language|url|
|--------|---|
|Javascript|[1784.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1784.js)|
