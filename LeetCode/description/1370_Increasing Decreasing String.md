# 1370. Increasing Decreasing String

출처: https://leetcode.com/problems/increasing-decreasing-string/

## 문제

### 번역

문자열 `s`가 주어진다. 다음의 알고리즘에 따라 문자열을 재배열 한다:
1. `s`에서 가장 작은 문자를 선택하고 결과에 추가한다.
2. `s`에서 지난 과정에 추가한 문자 다음으로 가장 작은 문자를 선택하고 결과에 추가한다.
3. 더 이상 선택할 문자가 없을 때까지 2번 과정을 반복한다.
4. `s`에서 가장 큰 문자를 선택하고 결과에 추가한다.
5. 지난 과정에서 선택한 문자 다음으로 큰 문자를 선택하고 결과에 추가한다.
6. 더 이상 선택할 문자가 없을 때까지 5번 과정을 반복한다.
7. 문자열 `s`에서 모든 문자가 선택될 때까지 1~6과정을 반복한다.

각 과정에서, 가장 작은 혹은 가장 큰 문자가 두개 이상 존재한다면, 원하는 것을 선택하고 결과에 추가할 수 있다.

이 알고리즘을 수행한 후의 결과 문자열을 반환하라.

### 원문

Given a string  `s`. You should re-order the string using the following algorithm:

1.  Pick the  **smallest**  character from  `s`  and  **append**  it to the result.
2.  Pick the  **smallest**  character from  `s`  which is greater than the last appended character to the result and  **append**  it.
3.  Repeat step 2 until you cannot pick more characters.
4.  Pick the  **largest** character from  `s`  and  **append**  it to the result.
5.  Pick the  **largest** character from  `s`  which is smaller than the last appended character to the result and  **append**  it.
6.  Repeat step 5 until you cannot pick more characters.
7.  Repeat the steps from 1 to 6 until you pick all characters from  `s`.

In each step, If the smallest or the largest character appears more than once you can choose any occurrence and append it to the result.

Return  _the result string_  after sorting  `s` with this algorithm.

## Example
```
Input: s = "aaaabbbbcccc"
Output: "abccbaabccba"
Explanation: After steps 1, 2 and 3 of the first iteration, result = "abc"
After steps 4, 5 and 6 of the first iteration, result = "abccba"
First iteration is done. Now s = "aabbcc" and we go back to step 1
After steps 1, 2 and 3 of the second iteration, result = "abccbaabc"
After steps 4, 5 and 6 of the second iteration, result = "abccbaabccba"
```
```
Input: s = "rat"
Output: "art"
Explanation: The word "rat" becomes "art" after re-ordering it with the mentioned algorithm.
```
## 접근 방법

알고리즘의 1과 2, 4와 5 과정을 보면, 문자에 대한 비교를 수행해야 함을 볼 수 있는데, 이는 예제를 통해서 사전식 순서임을 알 수 있다.
```
a < b < c < d < ... < z
```
그리고 2, 5 과정에서 말하는 '지난번 선택한 것보다 더 작은(혹은 큰)' 라는 말이 있는 것으로 보아 3, 6 과정에서 반복에서는 중복된 문자는 선택되지 않아야함을 알 수 있다. 

이에 `s`에서 중복되지 않는 문자를 뽑아, 사전순서로 정렬을 해야한다.
<pre>
<code>
// in JavaScript
const unique = Array.from(new Set(s.split('')).sort();
</code>
</pre>
이렇게 뽑혀 정렬된 문자의 배열을 정방향 혹은 역방향으로 순회하면서 결과에 추가하면 3과 6의 과정이 만들어진다.
<pre>
<code>
// in JavaScript
// 정방향으로 순회하면서 뽑는 과정 (1 ~ 3 과정)
let result = ''
for (let i = 0; i < unique.length; i++) {
	result += unique[i];
}
</code>
</pre>
이 과정에서 각 문자가 `result`에 등장하는 수와 `s`에 등장하는 수가 동일해야 한다는 점을 생각해야 한다. 이때문에 위 과정 이전에 `s`에서 각 문자가 등장하는 빈도를 다음과 같이 기록한다.
<pre>
<code>
const char_count = new Map();
for (let ch of s) {
	if (!char_count.has(ch){
		char_count.set(ch, 0);
	}
	char_count.set(ch, char_count.get(ch) + 1);
}
</code>
</pre>

문자를 선택하는 과정도 이에 따라 다음과 같이 수정한다.

<pre>
<code>
// in JavaScript
// 정방향으로 순회하면서 뽑는 과정 (1 ~ 3 과정)
let result = ''
for (let i = 0; i < unique.length; i++) {
	if (char_count.get(unique[i]) == 0) { continue; }
	result += unique[i];
	char_count.set(unique[i], char_count.get(unique[i]) - 1);
}
</code>
</pre>

4 ~ 5 과정은 위 코드를 이용하여 반복자만 수정하는 것으로 해결할 수 있으며, 최종적으로 7번 과정에 대해서는 다음과 같이 구현할 수 있다.
<pre>
<code>
while (result.length != s.length) {
	for (let i = 0; i < unique.length; i++) {
		// 정방향 순회
		...
	}
	for (let i = unique.length-1; i >= 0; i--) {
		// 역방향 순회
		...
	}
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|Javascript|[1370.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1370.js)|
