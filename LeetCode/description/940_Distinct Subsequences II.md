# 940. Distinct Subsequences II

출처: https://leetcode.com/problems/distinct-subsequences-ii/

## 문제

### 번역

문자열 `s`에서 `s`의 구분되는 부분수열의 수를 세어라.

결과가 매우 클 수 있기때문에, **`10^9 + 7`로 나눈 나머지를 반환하라**.

### 원문

Given a string  `S`, count the number of distinct, non-empty subsequences of  `S`  .

Since the result may be large,  **return the answer modulo  `10^9 + 7`**.

## Example
```
Input: "abc"
Output: 7
Explanation: The 7 distinct subsequences are "a", "b", "c", "ab", "ac", "bc", and "abc".
```
```
Input: "aba"
Output: 6
Explanation: The 6 distinct subsequences are "a", "b", "ab", "ba", "aa" and "aba".
```
## 접근 방법

부분 수열은 일부 요소를 원래의 순서를 유지하며 선택하여 얻을 수 있는 수열이다. 단계적으로 `i` 개의 문자을 가지고 부분 수열의 수를 구해보자.
```
s = "abc"

i = 0
- 1개 ("")
i = 1
- 2개 ("", "a")
i = 2
- 4개 ("", "a", "b", "ab")
i = 3
- 8개 ("", "a", "b", "ab", "c", "ac", "bc", "abc")
```
위 예제를 보면 각 단계에서 구해지는 부분수열의 수가 이전 단계의 2배가 되는 것을 확인할 수 있다(이전 단계 부분 수열 + s[i-1]를 추가한 부분 수열). 이를 토대로 다음과 같은 점화식을 만들 수 있다.
- `func(i) = func(i-1) * 2` 

이제 중복되는 문자가 있는 케이스를 살펴보자.
```
s = "aba"

i = 0
- 1개 ("")
i = 1
- 2개 ("", "a")
i = 2
- 4개 ("", "a", "b", "ab")
i = 3
- 7개 ("", "a", "b", "ab", "aa", "ba", "aba")
```
이 예제는 처음 살펴본 예제에서 마지막 문자를 `'a'`로 변경하여, 중복되는 문자를 만든 케이스이다. 여기서 `i`가 `0 ~ 2`까지의 값에서는 변화되는 것이 없지만, `i`가 `3`인 경우에서 이전 케이스와 다른 값을 보인다. 이 결과는 `i = 2`에서 얻은 부분수열에 `'a'`를 더해 새 부분수열을 만드는 과정에 이전 `'a'`로 만들어진 부분수열(`i = 0`에서 `i = 1`로 가면서 추가된 부분수열, "a")과 동일한 부분수열을 만드는 케이스가 존재하기 때문이다.
```
i = 2에 존재하던 부분 수열 = ("", "a", "b", "ab")
i = 3과정에서 새로 만들어진 부분 수열 = ("a", "aa", "ba", "aba")
중복된 부분 수열 = ("a") => i = 0에서 i = 1로 가면서 추가된 부분수열과 동일
```
이것을 고려하여 위에서 정의한 점화식을 수정해보자.
- 일반적으로 `func(i) = func(i-1) * 2` 
- 만약, 현재 단어가 이전에 존재했던 단어라면
	- `func(i) = func(i-1) * 2 - func(last_alphabet_idx)`
	-  `last_alphabet_idx`는 `s[i-1]`과 동일한 문자의 인덱스

위와 같이 점화식으로 표현되어지며, 현재 값이 이전 값과 연계가 되어 있는 상황에서 DP를 사용할 수 있다. DP를 이용하여 구현하면 다음과 같다.
<pre>
<code>
const dp = new Array(s.length+1).fill(null);
dp[0] = 1; // "" : 빈 문자열

// 알파벳의 마지막 위치를 저장할 배열
const last_alpha = new Array(26).fill(null);

for (let i = 0; i < s.length; i++) {
	const idx = s[i].charCodeAt(0) - 'a'.charCodeAt(0);
	dp[i+1] = dp[i] * 2;
	if (last_alpha[idx] != null) {	// 중복되어 만들어진 부분 수열 제거
		dp[i+1] -= dp[last_alpha[idx]];
	}
	last_alpha[idx] = i;
}

answer = dp[s.length] - 1;	// 빈 부분수열 제거
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|Javascript|[940.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/940.js)|
