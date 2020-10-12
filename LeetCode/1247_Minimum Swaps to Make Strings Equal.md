# 1247. Minimum Swaps to Make Strings Equal

출처 : https://leetcode.com/problems/minimum-swaps-to-make-strings-equal/

## 문제

You are given two strings `s1` and `s2` of equal length consisting of letters  `"x"`  and  `"y"`  **only**. Your task is to make these two strings equal to each other. You can swap any two characters that belong to  **different**  strings, which means: swap  `s1[i]`  and  `s2[j]`.
(오직 `x`와 `y`로만 이루어진 같은 길이의 `s1`과 `s2`가 주어진다. 다른 문자열에 속한 두 문자를 교환(`s1[i]`와 `s2[j]` 교환)하여 두 문자열이 같도록 만드는 작업을 수행해야 한다.)

Return the minimum number of swaps required to make `s1` and  `s2`  equal, or return `-1` if it is impossible to do so.
(두 문자열 `s1`과 `s2`가 같게 되는 최소 교환 횟수를 반환하고, 불가능한 경우 `-1`을 반환하라.)


## 예제

- Example 1
	```
	Input: s1 = "xx", s2 = "yy"
	Output: 1
	Explanation: Swap s1[0] and s2[1], s1 = "yx", s2 = "yx".
	```
- Example 2
	```
	Input: s1 = "xy", s2 = "yx"
	Output: 2
	Explanation: Swap s1[0] and s2[0], s1 = "yy", s2 = "xx".
	Swap s1[0] and s2[1], s1 = "xy", s2 = "xy".
	Note that you can't swap s1[0] and s1[1] to make s1 equal to "yx", cause we can only swap chars in different strings.
	```
- Example 3
	```
	Input: s1 = "xx", s2 = "xy"
	Output: -1
	```

- Example 4
	```
	Input: s1 = "xxyyxyxyxx", s2 = "xyyxyxxxyx"
	Output: 4
	```
## 접근 방법

예제 속에 답이 있다....
- 예제 1과 2를 통해 두 문자열을 같게 하는 교환 형식을 확인 가능
	- `s1[i] + s2[i] == xy && s1[j] + s2[j] == xy ` 1번 교환
	- `s1[i] + s2[i] == yx && s1[j] + s2[j] == yx ` 1번 교환
	- `s1[i] + s2[i] == xy && s1[j] + s2[j] == yx ` 2번 교환
	- `s1[i] + s2[i] == yx && s1[j] + s2[j] == xy ` 2번 교환

- `s1[i] + s2[i]`을 통해 만들어지는 문자열인 `xy`, `yx`의 등장 횟수를 구하여 최소 교환수를 계산 가능
- xy의 등장 횟수가 n이라면, xy형태 2개를 사용하여 1번의 교환으로 동일 문자열을 만들기 때문에 `n/2`번의 교환이 필요하고 나머지 `(n%2)`개의 xy는 yx를 사용하여 2번 교환(`(n%2)*2`번)으로 동일 문자를 만들게 된다.
- yx 또한 위와 동일한 계산이 필요하고 최종적으로 남는 xy 또는 yx가 존재한다면 -1을 반환

## Code
<pre>
<code>
/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumSwap = function(s1, s2) {
    const n = s1.length;
    
    var xy_n = 0,
        yx_n = 0;
    
    for (let i = 0; i < n; i++) {
        if (s1[i] == 'x' && s2[i] == 'y') {
            xy_n++;
        } else if (s1[i] == 'y' && s2[i] == 'x') {
            yx_n++;
        }
    }
    
    var answer = 0;
    answer += parseInt(xy_n/2) + parseInt(yx_n/2);
    
    xy_n = xy_n % 2;
    yx_n = yx_n % 2;
    
    if (xy_n != yx_n) return -1;
    else {
        answer += (xy_n * 2)
    }
    
    return answer;
};
</code>
</pre>
