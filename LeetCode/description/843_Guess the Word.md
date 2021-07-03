# 843. Guess the Word

출처: https://leetcode.com/problems/guess-the-word/

## 문제

This is an  **_interactive problem_**.

You are given an array of  **unique**  strings  `wordlist`  where  `wordlist[i]`  is  `6`  letters long, and one word in this list is chosen as  `secret`.

You may call  `Master.guess(word)`  to guess a word. The guessed word should have type  `string`  and must be from the original list with  `6`  lowercase letters.

This function returns an  `integer`  type, representing the number of exact matches (value and position) of your guess to the  `secret`  word. Also, if your guess is not in the given `wordlist`, it will return  `-1`  instead.

For each test case, you have exactly  `10`  guesses to guess the word. At the end of any number of calls, if you have made  `10`  or fewer calls to  `Master.guess`  and at least one of these guesses was  `secret`, then you pass the test case.

여기 **_인터랙티브 문제_** 가 있다.

`wordlist[i]`가 길이 `6`인 `고유한` 문자열로 구성된 배열 `wordlist`가 주어지고, 이 리스트의 단어 하나를 `secret`으로 지정한다.

단어를 추측하기 위해 `Master.guess(word)`을(를) 호출한다. 추측된 단어는 `string` 타입이어야 하고, 원래의 리스트에 있는 길이 `6`의 소문자 단어이어야 한다.

이 함수는 `integer` 타입의 값을 반환하는데, 추측된 단어와 `secret`이 정확히 일치한(값과 위치) 문자의 수 이다. 또한, 주어진 `wordlist`에 추측한 단어가 없다면, `-1`을 반환한다.

모든 테스트케이스는 정확히 `10`번의 추측 기회를 제공한다. 만약 `10`번 기회안에 `secret`을 추측할 수 있다면, 테스트 케이스를 통과한다.

## Example
```
Input: secret = "acckzz", wordlist = ["acckzz","ccbazz","eiowzz","abcczz"], numguesses = 10
Output: You guessed the secret word correctly.
Explanation:
master.guess("aaaaaa") returns -1, because "aaaaaa" is not in wordlist.
master.guess("acckzz") returns 6, because "acckzz" is secret and has all 6 matches.
master.guess("ccbazz") returns 3, because "ccbazz" has 3 matches.
master.guess("eiowzz") returns 2, because "eiowzz" has 2 matches.
master.guess("abcczz") returns 4, because "abcczz" has 4 matches.
We made 5 calls to master.guess and one of them was the secret, so we pass the test case.
```
```
Input: secret = "hamada", wordlist = ["hamada","khaled"], numguesses = 10
Output: You guessed the secret word correctly.
```
## 접근 방법

이 문제의 핵심은 `Master.guess(word)`를 통해 매칭 점수를 받을 `word`를 어떻게 선정할 것인가 이다. 매칭 점수를 얻고 난 이후는 `wordlist`를 매칭 점수에 맞게 줄이고, 다시 단어를 추측하는 과정의 반복이다.

우선, `Master.guess(word)`를 통해 매칭 점수를 얻었다는 가정을 하고 이후, `wordlist`를 줄이는 작업 먼저 생각해보자.
<pre>
<code>
// JavaScript Code

word_length = 6;
function calcScore(word1, word2) {
	let count = 0;
	for (let i = 0; i < word_length; i++) {
		if (word1[i] == word2[i]) count += 1
	}
	return count;
}

// guessedWord: wordlist에서 선정된 단어
// guessScore: Master.guess(guessedWord)의 반환 값
wordlist = wordlist.filter(word => calcScore(guessedWord, word) == guessScore)
</code>
</pre>

`Master.guess(word)`는 호출 횟수가 제한되어있고, `secret`과의 점수만 얻을 수 있기 때문에 단어 2개를 입력받아 점수를 계산해주는 `calcScore(word1, word2)`를 구현하였다. 이 함수와 JavaScript에서 제공하는 `filter`를 이용하여 `wordlist`를 위와 같이 업데이트할 수 있다.

이제 문제의 핵심인 단어 선정은 방법은 다음과 같다. 우선 `wordlist`의 각 단어의 인덱스 0 ~ 5위치에 어떤 알파벳이 등장했는지를 통계를 낸다. 이후에 다시 `wordlist`의 각 단어에 대해서 통계치를 이용하여 단어의 점수를 계산한다. 이렇게 계산된 점수 중 가장 큰 점수를 얻은 단어를 `Master.guess(word)`를 통해 추측 점수를 얻을 단어로 선정한다.

<pre>
<code>
word_length = 6;
function countChar(wordlist) {
	const arr = Array(word_length ).fill(0).map(val => Array(26).fill(0))
	for (let word of wordlist) {
		for (let i = 0; i < word_length; i++) {
			arr[i][word[i].charCodeAt() - 'a'.charCodeAt()] += 1;
		}
	}
	return arr;
}

function getCommonWord(arr, wordlist) {
	let max_score = 0;
	let max_idx = 0;
	for (let idx in wordlist) {
		const word = wordlist[idx];
		let tmp_score = 0;
		for (let i = 0; i < word_length; i++) {
			tmp_score += arr[i][word[i].charCodeAt() - 'a'.charCodeAt()];
		}
		if (tmp_score > max_score) {
			max_score = tmp_score;
			max_idx = idx;
		}
	}
	return wordlist[max_idx];
}

guessedWord = getCommonWord(countChar(wordlist), wordlist);
</code>
</pre>

위의 방식으로 얻어지는 단어는 다른 다수의 단어와 같은 위치에 같은 문자를 갖고 있다는 의미가 된다. 만약 이 단어로 얻는 추측 점수가 0이라면, 다수의 단어를 `wordlist`에서 제거 가능한 상태로 다음 추측을 시도할 때, 이상적인 상황이 된다(숫자 야구 게임에서 쓰리 아웃을 얻은 상태). 그렇지 않다고 하더라도 동일 점수를 얻을 수 있는 단어만 남길 것이기 때문에 많은 단어를 제거할 수 있기에 다음 추측 과정에 도움이 된다.

여기서 위와 같은 방식 말고도, 랜덤을 사용한 방법도 가능하다. `wordlist`의 각 단어가 동등한 확률로 선정되게 하는 것이다. 앞서 소개한 방법이 최상의 상황(0점을 얻는 상황)을 항상 보장하는 것이 아니고, 최상의 상황이 아니라면 사실상 랜덤한 하게 선택한 단어로 추측하는 것과 크게 다르지 않다는 것을 이용한 것이다.

<pre>
<code>
guessedWord = wordlist[Math.random() * wordlist.length]
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|Javascript|[843.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/843.js)|
