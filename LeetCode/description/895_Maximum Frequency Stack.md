# 895. Maximum Frequency Stack
출처: https://leetcode.com/problems/maximum-frequency-stack/

## 문제

Implement  `FreqStack`, a class which simulates the operation of a stack-like data structure.

스택 자료 구조와 같은 동작을 수행하는 클래스, `FreqStack`을 구현하라.

`FreqStack` has two functions:

-   `push(int x)`, which pushes an integer  `x`  onto the stack.
-   `pop()`, which  **removes**  and returns the most frequent element in the stack.
    -   If there is a tie for most frequent element, the element closest to the top of the stack is removed and returned.

`FreqStack`은 두개의 함수를 갖는다:
- `push(int x)`, 스택에 정수 `x`를 삽입한다.
- `pop()`, 스택에 가장 빈번한 값을 **제거** 및 반환한다.
	- 만약 빈번한 정도가 동일하다면, 스택에 탑과 가장 가까운 원소를 제거하고 반환한다. 

## 예제

```
Input:
["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
Output: [null,null,null,null,null,null,null,5,7,5,4]
Explanation:
After making six .push operations, the stack is [5,7,5,7,4,5] from bottom to top.  Then:

pop() -> returns 5, as 5 is the most frequent.
The stack becomes [5,7,5,7,4].

pop() -> returns 7, as 5 and 7 is the most frequent, but 7 is closest to the top.
The stack becomes [5,7,5,4].

pop() -> returns 5.
The stack becomes [5,7,4].

pop() -> returns 4.
The stack becomes [5,7].
```

## 접근 방법

데이터 구조를 만들기 위해서 위의 예제인 `[5,7,5,7,4,5]`를  `pop`하는 상황에 대해 상세하게 살펴보자.

데이터 내에 동일 값이 존재하기 때문에 이를 구분하기 위하여 숫자(구분자)를 다음과 같이 부여한다.
```
[5, 7, 5, 7, 4, 5] => [5(1), 7(1), 5(2), 7(2), 4(1), 5(3)]
```
`pop`연산을 수행하게 되면, 가장 많이 등장한 5가 추출될 것이다. 그런데 어떤 5가 추출되어야 할까. 3개의 5(5(1), 5(2), 5(3))을 놓고 보았을 때, 5(3)이 가장 마지막에 입력된 값이기에 5(3)을 제거해 보자.

그 다음 `pop`을 수행하면, 5와 7이 동일한 빈도수 2로 가장 큰 빈도수를 갖는다. 이 둘 중 더 나중에 입력된 7이 추출되어야 하며, 이때도 위와 같은 이유로 7(2)가 추출된다고 생각해보자. 이 다음 pop()의 결과는 당연하게 5(2)가 될 것이다.

계속해서 `pop`을 수행하게 되면, 5, 7 그리고 4가 추출 후보가 되고, 이 세 숫자는 4(1), 7(1), 5(1)의 순서로 추출될 것이다. 

위의 결과를 한 군데에 모아보면 `[5(3), 7(2), 5(2), 4(1), 7(1), 5(1)]`이 되고, 동일 숫자를 구분하기 위해 임의로 붙였던 구분자가 **내림차순**으로 정렬되어 있음을 알 수 있다. 또한 동일 구분자가 붙어있다고 하더라도 추출된 순서는 스택의 규칙에 따라 처음 제공된 데이터의 입력 역순이다.

이를 알려져 있는 자료구조로 표현하면, 다음과 같이 `{구분자 : 스택}`의 형태를 갖는 Map으로 구조화가 가능하다.
```
group = Map({3: [5]}, {2: [5, 7]}, {1: [5, 7, 4]})
```

이제 `push` 과정에서 어떻게 해야 위의 구조가 완성되는지 생각해보자.

먼저, 어떤 값 x의 구분자는 `현재까지 입력된 x의 수 + 1`이 될 것이다. 이를 위해 현재까지 입력된 개수를 매번 새로 구하는 것 보다 별도의 메모리를 사용하여 기록하고 있도록 하였다. 이 역시 Map구조를 활용하였다(`{value: frequency}` 형태).
```
freq = Map({5: 3}, {7: 2}, {4: 1})
```
```
func push(x) {
	f = freq.get(x);
	group[f+1].push(x);
	freq[x] = f+1;
}
```
또한 이를 계산하면서 frequency의 최대 값을 별도로 저장한다. 이는 pop 연산을 할 때, 한번에 가장 높은 구분자에 접근하기 위함이다. 이 값을 이용하여 pop 연산 시 빠르게 추출이 이뤄질 스택에 접근하고, 스택이 비어 있는 경우에만 이 값을 -1 하도록 한다.

```
func push(x) {
	...
	max_freq = max(freq[x], max_freq);
}

func pop(x) {
	element = group[max_freq].pop();
	freq[x] -= 1;
	if (group[max_freq] is empty) {
		max_freq -= 1;
	}
	return element;
}
```

## Full Source Code

|language|code|
|-|-
|JavaScript|[895.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/895.js)|
|Python3|[895.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/895.py)|
