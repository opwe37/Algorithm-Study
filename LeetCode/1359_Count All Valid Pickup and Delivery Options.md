# 1359. Count All Valid Pickup and Delivery Options
출처 : https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options/

## 문제

Given  `n`  orders, each order consist in pickup and delivery services.
(`n`개의 주문이 주어진다. 각 주문은 픽업과 배달 서비스로 구성되어있다.)
Count all valid pickup/delivery possible sequences such that delivery(i) is always after of pickup(i).
(모든 유효한 픽업/배달 순서를 세어라. 배달 i는 항상 픽업 i 이후에 온다.)
Since the answer may be too large, return it modulo 10^9 + 7.
(답이 매우 클 수 있기때문에, 10^7+7로 나눈 나머지를 반환하라.)
## 예제

- Example 1 
	```
	Input: n = 1
	Output: 1
	Explanation: Unique order (P1, D1), Delivery 1 always is after of Pickup 1.
	```
- Example 2
	```
	Input: n = 2
	Output: 6
	Explanation: All possible orders: 
	(P1,P2,D1,D2), (P1,P2,D2,D1), (P1,D1,P2,D2), (P2,P1,D1,D2), (P2,P1,D2,D1) and (P2,D2,P1,D1).
	This is an invalid order (P1,D2,P2,D1) because Pickup 2 is after of Delivery 2.
	```

## 접근 방법

DP를 이용하여 풀 수 있는 문제.

```
1. n = 1
(P1, D1) 의 유일한 순서를 갖음

2. n = 2 
- P2가 D2보다 먼저와야하는 조건이 있기 때문에 P2가 들어갈 수 있는 위치부터 확보
(＿, P1, ＿, D2, ＿) : 2n - 1 = 3자리 가능
- 만약 P2가 맨 앞자리에 온다면, D2는 (P2, ＿, P1, ＿, D2, ＿)의 3자리 중 아무 곳에 들어가도 됨
- 만약 P2가 가운데 자리에 온다면, D2는 (P1, P2, ＿, D2, ＿)의 2자리 가능
- 만약 P2가 마지막 자리에 온다면, D2는 (P1, D2, P2, ＿)의 1자리 가능

결과적으로 n = 2 일때, 3+2+1 = 6 가지의 순서 가능
이때, n = 1 일때 1개의 순서만이 가능했지만, 만약 2개 이상의 순서가 가능하다면 
이에 대한 보상이 필요. 즉, 실제 계산 수식은 (3+2+1)×1 = 6 으로 생각해야 됨

n = 3이상 일때도 위와 같은 방식으로 계산 가능
```

위의 계산을 수식으로 변환하면 다음과 같음
```
count[n] = count[n-1] × ∑(i=1 ~ 2n-1)i
         = count[n-1] × n(2n-1)
```
## Code
<pre>
<code>
var countOrders = function(n) {
    var count = [0, 1];
    
    for (let i = 2; i <= n; i++) {
        count[i] = (count[i-1] * (i * ((2*i) - 1))) % 1000000007;
    }
    
    return count[n];
};
</code>
</pre>
