# 808. Soup Servings
출처: https://leetcode.com/problems/soup-servings/

## 문제

There are two types of soup: type A and type B. Initially we have  `N`  ml of each type of soup. There are four kinds of operations:

1.  Serve 100 ml of soup A and 0 ml of soup B
2.  Serve 75 ml of soup A and 25 ml of soup B
3.  Serve 50 ml of soup A and 50 ml of soup B
4.  Serve 25 ml of soup A and 75 ml of soup B

두 가지의 수프(A와 B)가 있다. 처음에 각 수프는 `N`ml가 있다. 여기 4가지 종류의 동작이 있다.
1. 수프 A 100ml와 B 0ml를 제공한다.
2. 수프 A 75ml와 B 25ml를 제공한다.
3. 수프 A 50ml와 B 50ml를 제공한다.
4. 수프 A 25ml와 B 75ml를 제공한다.

When we serve some soup, we give it to someone and we no longer have it. Each turn, we will choose from the four operations with equal probability 0.25. If the remaining volume of soup is not enough to complete the operation, we will serve as much as we can. We stop once we no longer have some quantity of both types of soup.

수프를 제공할 때, 누군가에게 수프를 제공하고 더 이상 먹지 않는다. 각 차례에, 0.25% 확률로 4 동작 중 하나를 선택한다. 수프에 남아있는 양이 동작을 수행하기에 충분하지 않다면, 할 수 있는 한 최대한을 제공할 것이다. 두 수프가 남아 있지 않을때 멈춘다.

Note that we do not have the operation where all 100 ml's of soup B are used first.

처음에 수프 B를 100ml 제공하는 동작이 없다는 것을 명심해라.

Return the probability that soup A will be empty first, plus half the probability that A and B become empty at the same time.

수프 A가 먼저 빌 확률을 반환하라, 추가적으로 A와 B가 동시에 빌 확률은 절반을 갖는다.

## 예제

```
Input: N = 50
Output: 0.625
Explanation: 
If we choose the first two operations, A will become empty first. For the third operation, A and B will become empty at the same time. For the fourth operation, B will become empty first. So the total probability of A becoming empty first plus half the probability that A and B become empty at the same time, is 0.25 * (1 + 1 + 0.5 + 0) = 0.625.
```

## 접근 방법

문제에서 제공된 예제를 살펴보자. N = 50 일 때, 1과 2의 동작에서는 1의 확률로 A가 B보다 먼저 바닥을 보이고, 3번 동작에서는 동시에 바닥을 보이기 때문에 0.5의 확률을 갖는다. 하지만 4번의 경우 B가 먼저 바닥을 보이기 때문에 0의 확률을 갖을 것이다. 이 4가지 동작이 0.25의 확률로 이루어지기 때문에 `0.25 * (1 + 1 + 0.5 + 0)`의 확률로 A가 먼저 바닥을 보이게 될 것임을 알 수 있다.

이렇게 0 ~ 100의 경우, 4가지 동작의 경계점인 `25, 50, 75, 100`를 기점으로 한번의 계산으로 확률을 알 수 있다. 100보다 큰 경우는 어떠할까.  N이 100보다 크다면, 처음 선택한 행동의 결과에 의존하여 확률이 정해질 것이다. 
- 0.25 * (1번 행위 결과의 확률 + 2번 행위 결과의 확률 + 3번 행위 결과의 확률 + 4번 행위 결과의 확률)

위의 수식을 계산을 하기 위해서 DFS방식을 사용해볼 수 있을 것같다.
```
oper = [[100, 0], [75, 25], [50, 50], [25, 75]]
func dfs(A's volume, B's volume) {
	if (A's volume <= 0 && B's volume <= 0) return 0.5;
	if (A's volume <= 0) return 1;
	if (B's volume <= 0) return 0;
	
	prob = 0;
	for (i = 0; i < 4; i++) {
		next A's volume = A's volume - oper[i][0];
		next B's volume = B's volume - oper[i][1];
		prob += dfs(next A's volume, next B's volume)
	}
	prob = prob * 0.25;
	return prob;
}
```

이 상태에서 알고리즘의 성능을 개선할 수 있는 포인트가 있는데, 1번과 3번 행위가 연속해서 일어나거나, 2번 행위가 연속으로 선택되는 경우에 대해 생각해자. N = 125라 할때, 1번과 3번이 연속해서 일어난다면, A는 100(75 + 25) 만큼, B는 100(25 + 75)만큼 감소할 것이다. 또한 2번 동작이 연속으로 일어나는 경우도 A와 B 모두 100(50 + 50) 만큼 감소한다. 이 케이스 모두 남는 수프는 25ml가 된다. 문제는 각각의 모든 케이스에서 N = 25인 경우를 별도로 계산해야 한다는 것이다. 여기서 **메모이제이션** 혹은 **동적 프로그래밍** 방법이 사용될 수 있음을 알 수 있다. 계산 결과를 어딘가 기록해 놓는 것이다. 

```
memo = hash map _ {key: A's volume:B's volume, value: prob}
func dfs(A's volume, B's volume) {
	if (memo['A's volume:B's volume']) return memo['A's volume:B's volume']
	
	...
	
	memo['A's volume:B's volume'] = prob;
	return memo['A's volume:B's volume'];
}
```


마지막으로 4가지 행위를 다시 살펴보면, 2가지는 A가 B보다 많은 양이 감소하고 1가지는 동일 비율로 감소, 마지막 1가지는 B가 A보다 많은 양이 감소한다. 이를 통해 N이 커지면 커질 수록 A가 바닥을 먼저 보일 확률이 커질 것이라 추측할 수 있는데, 실제 실행 결과를 통해 이를 확실히 알 수 있다.
|N|A가 먼저 바닥을 보일 확률|
|--|---------|
|50|0.625|
|75|0.65625|
|100|0.71875|
|150|0.75781|
|175|0.78516|
이러한 추세를 보면 N이 충분히 커지게 되면, 그 결과가 1에 가까워 질 것 같다. 실제로 N이 4800이 되면 결과는 0.9999가 된다. 이를 통해서 N이 4800 이상인 경우, 별도의 계산 없이 1을 반환하게 하는 것으로 성능 개선이 가능하다.

## Full Source Code

|language|code|
|-|-
|JavaScript|[808.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/808.js)|
|Python3|[808.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/808.py)|
