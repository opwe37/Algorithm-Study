# 1553. Minimum Number of Days to Eat N Oranges

출처 : https://leetcode.com/problems/minimum-number-of-days-to-eat-n-oranges/

## 문제

There are  `n`  oranges in the kitchen and you decided to eat some of these oranges every day as follows:

부엌에 `n`개의 오렌지가 있고 다음의 규칙에 따라 매일 몇개를 먹을지 결정한다.

-   Eat one orange.
-   If the number of remaining oranges (`n`) is divisible by 2 then you can eat n/2 oranges.
-   If the number of remaining oranges (`n`) is divisible by 3 then you can eat 2*(n/3) oranges.

- 하나를 먹는다.
- 남아있는 오렌지(`n`)가 2로 나눠진다면, n/2개를 먹는다.
- 남아있는 오렌지(`n`)가 3로 나눠진다면, 2*(n/3)개를 먹는다.

You can only choose one of the actions per day.

하루에 한가지 행동만을 선택할 수 있다.

Return the minimum number of days to eat  `n`  oranges.

`n`개의 오렌지를 먹는데 필요한 최소 며칠이 걸리는지 반환하라.

## 예제
```
Input: n = 10
Output: 4
Explanation: You have 10 oranges.
Day 1: Eat 1 orange,  10 - 1 = 9.  
Day 2: Eat 6 oranges, 9 - 2*(9/3) = 9 - 6 = 3. (Since 9 is divisible by 3)
Day 3: Eat 2 oranges, 3 - 2*(3/3) = 3 - 2 = 1. 
Day 4: Eat the last orange  1 - 1  = 0.
You need at least 4 days to eat the 10 oranges.
```

## 접근방법

문제를 보고 떠올린 방법은 DP이다.

n개의 오렌지를 먹는데 소요되는 날은 n-1개, n/2개, 2*(n/3)개를 먹는데 소요되는 시간에 의존하기 때문이다.
- func(n) = 1 + min(fun(n-1), func(n/2), func(n/3))

하지만, 위의 점화식을 이용하여 접근할 경우 n이 커질 경우에 메모리 공간이 n에 비례하여 사용되는 문제가 있다(메모리가 감당하지 못하는 n이 입력으로 주어질 수 있음).

즉, 점화식 자체의 수정도 필요하며 DP를 구현하기 위하여 일반적으로 사용하던 배열을 사용해서도 안된다.

먼저 점화식에 대해 생각해보면, 문제가 되는 부분은 `n-1`이다. 점화식을 n-1인 상황을 고려하지 않도록 설계해야한다. 어떤 숫자든 -1씩 감소하다보면 2 또는 3으로 나눠지는 숫자에 도달한다는 점을 이용하면 된다. 

`몇번의 -1을 수행해야 하는가?` 에 대한 답을 구해야 한다. 이는 나머지 연산자(modulo, %)을 이용하면 된다. 이를 이용하면 다음의 점화식이 된다.
- func(n) = 1 + min(n%2+func(n//2), n%3+func(n//3))

DP를 배열로 구현하여 생기는 문제의 해결 방법은 비교적 간단하다. 배열 대신 맵(Map)을 이용하여 실제 계산에 필요한 값에 대한 저장공간만을 사용하도록 한다.

## Code

<pre>
<code>
var dp = new Map();
var minDays = function(n) {
    if (n == 0 || n == 1) return n;
    if (dp.has(n)) return dp.get(n);
    dp.set(n, 1 + Math.min((n%2)+minDays(Math.floor(n/2)), (n%3)+minDays(Math.floor(n/3))));
    return dp.get(n);
};
</code>
</pre>
