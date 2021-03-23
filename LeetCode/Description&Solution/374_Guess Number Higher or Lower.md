# 374. Guess Number Higher or Lower

출처: https://leetcode.com/problems/guess-number-higher-or-lower/

## 문제

We are playing the Guess Game. The game is as follows:

I pick a number from  `1`  to  `n`. You have to guess which number I picked.

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API  `int guess(int num)`, which returns 3 possible results:

-   `-1`: The number I picked is lower than your guess (i.e.  `pick < num`).
-   `1`: The number I picked is higher than your guess (i.e.  `pick > num`).
-   `0`: The number I picked is equal to your guess (i.e.  `pick == num`).

Return  _the number that I picked_.

### 요약

`1`에서 `n`까지의 숫자에 대해서 업다운 게임을 한다.

사전에 정의된 API `int guess(int num)`을 이용하여 다음 3가지 결과를 알려준다:
- `-1`: 말한 숫자가 맞춰야 하는 숫자보다 작음 (i.e. `pick < num`)
- `1`: 말한 숫자가 맞춰야 하는 숫자보다 큼 (i.e. `pick > num`)
- `0`: 정답 (i.e. `pick == num`)

_정답_ 을 반환하라

## 예제

```
Input: n = 10, pick = 6
Output: 6
```

## 접근 방법

정렬된 배열에서 어떤 숫자를 찾는 문제로 접근

이진 탐색 기법을 이용하여 문제를 풀 수 있다. 이진탐색 시, low와 high를 움직이는 조건절에 약간의 변화를 주면 된다.

일반적인 이진탐색에서 low와 high의 이동은 아래와 같이 이동한다.
<pre>
<code>
if (arr[mid] < target) {
	low = mid + 1;
} else if (arr[mid] > target) {
	high = mid - 1;
} else {
	return mid;
}
</code>
</pre>

문제에서는 `target`이 명확히 주어지지 않는 대신에, `guess()`함수를 통해 크기 비교를 해주기 때문에 이를 이용하여 다음과 같이 변형할 수 있다.
<pre>
<code>
if (guess(mid) == -1) {
	high = mid - 1;
} else if (guess(mid) == 1) {
	low = mid + 1;
} else {
	return mid;
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|JavaScript|[374.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/374.js)|
