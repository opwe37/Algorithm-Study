# 1178. Number of Valid Words for Each Puzzle

출처: https://leetcode.com/problems/number-of-valid-words-for-each-puzzle/

## 문제

### 번역

주어진 문자열 `puzzle`에 대해서, `word`는 다음 조건들을 만족한다면 _유효_ 하다할 수 있다:
- `word`가 `puzzle`의 첫 문자를 포함하고 있다.
- `word`의 모든 문자가, `puzzle`에 포함되어 있다.<br/> 예를들어, puzzle이 "abcdefg"라면 "faced", "cabbage", 그리고 "baggage"는 유효한 단어이다; 반면에 "beefed"("a"가 포함되지 않음)와 "based"(puzzle에 "s"가 포함되지 않음)는 유효하지 않은 단어이다.

배열 `answer`를 반환하라, `answer[i]`는 주어진 단어 리스트 `words` 중 `puzzle[i]`에서 유효한 단어의 수 이다.

### 원문

With respect to a given `puzzle` string, a `word` is _valid_ if both the following conditions are satisfied:

-   `word`  contains the first letter of  `puzzle`.
-   For each letter in  `word`, that letter is in  `puzzle`.  
    For example, if the puzzle is "abcdefg", then valid words are "faced", "cabbage", and "baggage"; while invalid words are "beefed" (doesn't include "a") and "based" (includes "s" which isn't in the puzzle).

Return an array `answer`, where `answer[i]` is the number of words in the given word list `words` that are valid with respect to the puzzle `puzzles[i]`.

## Example
```
Input: 
words = ["aaaa","asas","able","ability","actt","actor","access"], 
puzzles = ["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]
Output: [1,1,3,2,4,0]
Explanation:
1 valid word for "aboveyz" : "aaaa" 
1 valid word for "abrodyz" : "aaaa"
3 valid words for "abslute" : "aaaa", "asas", "able"
2 valid words for "absoryz" : "aaaa", "asas"
4 valid words for "actresz" : "aaaa", "asas", "actt", "access"
There're no valid words for "gaswxyz" cause none of the words in the list contains letter 'g'.
```

## 접근 방법

하나의 puzzle에 대해서 words에서 유효한 단어의 수를 찾는 방법에 대해 생각해보고, 이후 여러개의 puzzle로 확장하는 방식으로 문제를 접근했다.

문제에서 말하는 _유효_ 한 단어를  찾기위해서 매번 문자열을 탐색을 수행한다면 시간적으로 비효율적이라 생각하여 각 단어(puzzle, words)에 대해서 길이 26의 배열을 선언하여 단어에 등장하는 글자의 값을 1로 설정하도록 하였다.
<pre>
<code>
arr = Array(26).fill(0);
for (let ch of word) {
	arr[ch.charCodeAt(0) - 'a'.charCodeAt(0)] = 1;
}
</code>
</pre>

위 코드와 같은 방식으로 모든 단어(puzzle, words)를 배열로 변환한 다음에 인덱스를 통한 접근으로 _유효_ 한 단어인지 판단할 수 있다.
<pre>
<code>
// p_arr : puzzle에 대한 arr
// w_arr: word에 대한 arr

// 첫번째 조건에 대한 검사 
if (w_arr[puzzle[0].charCodeAt(0) - 'a'.charCodeAt(0)] != 1) {
	return "invalid"
}

// 두번째 조건에 대한 검사
let count = 0;
for (let i = 0; i < 26; i++) {
	count += p_arr[i] | w_arr[i];
}
	// 모든 puzzle은 중복되지 않는 7개의 글자로 이루어져 있다는 사전가정이 존재
if (count != 7) {
	return "invalid";
}
return "valid";
</code>
</pre>

문제는 이 방식 역시 문자열 자체를 비교한 것과 마찬가지로 많은 수의 puzzle과 word를 처리해야 한다면 비효율적이라는 것이다(제한시간 초과 문제 발생). 이러한 문제를 발생시키는 원인은 두번째 조건을 검사하는 과정이 너무 오래 걸린다는 것이라 판단된다. 적은 숫자의 words라면 문제가 되지 않겠지만, 10^5개 정도의 수라면 이야기가 다르다.

이 문제를 해결하기 위해서 **비트 연산**을 이용하였다. 위 방식이 많은 부분에서 유사 비트 조작 방식이기 때문에 실제 비트 연산을 통한 방식으로 변경해주면 된다.

우선 단어를 배열로 변환하던 것을 비트로 변환하도록 하였다. 1 을 왼쪽으로 `ch.charCodeAt(0) - 'a'.charCodeAt(0)`만큼 쉬프트하면서 `or 연산`을 수행하면 된다.
```
word = 'ac'
- 글자 별 쉬프트 결과
	- a: 1
	- c: 100
- or 연산: 101
```
<pre>
<code>
let word_bits = 0;
for (let ch of word) {
	word_bits |= 1 << ch.charCodeAt(0) - 'a'.charCodeAt(0)
}
</code>
</pre>

이제 단어와 퍼즐간의 비트연산을 통해 _유효_ 한 단어를 판단해보자.

puzzle의 첫 단어가 word에 포함되어 있는가? `& 연산`을 통해서 판단 가능하다. puzzle의 첫 단어를 쉬프트 하여 word의 값과 `& 연산`을 수행한다. 만약, 그 결과가 puzzle의 첫 단어를 쉬프트한 것과 동일하다면 첫 단어가 word에 포함된 것이다. 다음의 두 예를 보면 이해가 쉽다.
```
puzzle's first letter = 'b', word = "abc"
- puzzle's first letter bit = 010
- word bit = 111
- 010 & 111 = 010 (= puzzle's first letter bit)
```
```
puzzle's first letter = 'b', word = "ac"
- puzzle's first letter bit = 010
- word bit = 101
- 010 & 101 = 000 (!= puzzle's first letter bit)
```

word를 구성하는 모든 문자가 puzzle에 있는가? 이 조건 또한 `& 연산`을 통해 판단할 수 있다. word와 puzzle을 & 연산한 결과가 word와 같다면 이 조건을 만족하는 것이다.
```
puzzle = 'abcd', word = "ab"
- puzzle bit = 1111
- word bit = 0011
- 1111 & 0011 = 0011 (= word bit)
```

다음과 같은 if 구문으로 word와 puzzle이 두 조건을 만족하는지 체크할 수 있다.
<pre>
<code>
if ((word_bit & puzzle_first_letter_bit == puzzle_first_letter_bit) && (word_bit & puzzle_bit == word_bit)) {
	// All conditions Pass
}
</code>
</pre>

남은 작업은 주어진 puzzles와 words로 확장하는 작업 뿐이다.

## Full Code
|language|url|
|--------|---|
|Javascript|[1178.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1178.js)|
