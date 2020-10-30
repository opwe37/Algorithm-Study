# 1227. Airplane Seat Assignment Probability

출처 : https://leetcode.com/problems/airplane-seat-assignment-probability/

## 문제

`n` passengers board an airplane with exactly `n` seats. The first passenger has lost the ticket and picks a seat randomly. But after that, the rest of passengers will:
(`n`여행객이 정확히 `n`개의 좌석이 있는 비행기에 탑승합니다. 첫 여행객이 티켓을 잃어버렸고 랜덤하게 아무 좌석에 앉습니다. 그 후, 다른 탑승자들은 다음의 행동을 합니다.)

-   Take their own seat if it is still available, (자신의 좌석이 남아있다면, 그 좌석에 앉는다.)
-   Pick other seats randomly when they find their seat occupied (자신의 좌석에 누군가 앉아있다면, 남은 자리 중 아무 좌석이나 랜덤하게 앉는다.)

What is the probability that the n-th person can get his own seat?
(n번째 사람이 자신의 좌석에 앉을 확률은 얼마인가?)

## 예제

- Example 1
	```
	Input: n = 1
	Output: 1.00000
	Explanation: The first person can only get the first seat.
	```
- Example 2
	```
	Input: n = 2
	Output: 0.50000
	Explanation: The second person has a probability of 0.5 to get the second seat (when first person gets the first seat).
	```
## 접근방법

세 가지의 케이스로 나누어서 생각
1. 첫 사람이 자신의 자리에 앉고, n번째 사람이 자신의 자리에 앉을 확률 = (1/n) * 1
	- 첫 사람 이후의 사람은 모두 자신의 자리에 앉게 되니,
	- n번째 사람은 100% 본인의 자리에 앉을 수 있음
2. 첫 사람이 n번째 사람의 자리에 앉고, n번째 사람이 자신의 자리에 앉을 확률 = (1/n) * 0
	- n-1번째 사람까지는 모두 자신의 자리에 앉을 수 있지만, 
	- n번째 사람은 자신의 자리에 절대 앉을 수 없음
3. 첫 사람이 `2` ~ `n-1`번째에 해당하는 사람의 좌석 중에 한 자리를 선택할 확률
	- 첫 사람이 i번째 좌석에 앉았다고 가정 (1 < i < n)
	- 2 ~ i - 1번째 사람까지는 본인 좌석에 앉을 수 있음.
	- i + 1 ~ n번째 사람은 i번째 사람의 선택에 의존하여 결정됨. 이는 `n - i + 1`명이 탑승할 수 있는 비행기에서 첫 사람이 티켓을 잃어버린 소규모 문제와 같음.

어떤 함수 func()가 문제에 대한 해결을 알고 있다면 다음과 같은 전개식을 만들 수 있음
- func(n) = (1/n)*1 + [sum(i = 2 to n-1) (n-2/n) * func(n - i + 1)] = (1/n)*sum(i= 1 to n-1) f(i)

위의 전개식을 이용하여 문제를 재귀적으로 풀 수도 있지만, 차근차근 계산해보면 n >= 2경우에서 같은 값이 나오는 것을 확인할 수 있음

## Code
<pre>
<code>
var nthPersonGetsNthSeat = function(n) {
    if (n == 1) return 1;
    else return 0.5;
};
</code>
</pre>
