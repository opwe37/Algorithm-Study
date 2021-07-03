# 292. Nim Game

출처 : https://leetcode.com/problems/nim-game/


## 문제

You are playing the following Nim Game with your friend:
당신은 친구와 함께 다음의 규칙을 따르는 Nim 게임을 플레이하고 있다.
-   Initially, there is a heap of stones on the table.
-   You and your friend will alternate taking turns, and  **you go first**.
-   On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
-   The one who removes the last stone is the winner.
-  처음에 탁자 위에 돌 더미가 놓여져있다. 
-  당신과 친구는 돌아가며 플레이를 할 것이고, **당신부터 시작한다**.
- 각 턴마다, 플레이어는 더미에서 1 ~ 3개의 돌을 제거한다.
-  마지막 돌을 제거한 사람이 승자이다.

Given  `n`, the number of stones in the heap, return  `true` _if you can win the game assuming both you and your friend play optimally, otherwise return_ `false`.
더미에 있는 돌의 개수인 `n`이 주어질때, 당신과 친구가 최적의 플레이를 수행한다고 가정했을 때 당신이 게임에서 이길 수 있으면 `true`를 반환하고, 그렇지 않다면 `false`를 반환하라 

## 예제

```
Input: n = 4
Output: false
Explanation: These are the possible outcomes:
1. You remove 1 stone. Your friend removes 3 stones, including the last stone. Your friend wins.
2. You remove 2 stones. Your friend removes 2 stones, including the last stone. Your friend wins.
3. You remove 3 stones. Your friend removes the last stone. Your friend wins.
In all outcomes, your friend wins.
```

## 접근방법

게임의 규칙성을 찾기 위해서 몇개의 케이스를 살펴보면 다음과 같음
```
// 각 플레이어는 본인이 이기기위한 최적의 플레이를 한다!!
n = 1 ~ 3 : 1P WIN

n = 4 : 2P WIN 
1P가 뺀 돌의 수 | 남은 돌의 수 | 게임의 결과
1              | 3           | 2P WIN
2              | 2           | 2P WIN
3              | 1           | 2P WIN

n = 5 :
1P가 뺀 돌의 수 | 남은 돌의 수 | 게임의 결과
1              | 4           | 1P WIN
2              | 2           | 2P WIN
3              | 1           | 2P WIN 

n = 6 :
1P가 뺀 돌의 수 | 남은 돌의 수 | 게임의 결과
1              | 5           | 2P WIN
2              | 4           | 1P WIN
3              | 3           | 2P WIN

n = 7 :
1P가 뺀 돌의 수 | 남은 돌의 수 | 게임의 결과
1              | 6           | 2P WIN
2              | 5           | 2P WIN
3              | 4           | 1P WIN

n = 8 :
1P가 뺀 돌의 수 | 남은 돌의 수 | 게임의 결과
1              | 7           | 2P WIN
2              | 6           | 2P WIN
3              | 5           | 2P WIN
```
위의 케이스를 살펴보면,
- n = 4일때, 1P부터 게임이 시작하기 때문에 1P가 어떤 선택을 하더라도 2P의 승리로 게임이 끝남
- 이를 이용하면, n = 5 ~ 7인 경우에 1P가 의도적으로 남은 돌을 4개를 만들어 2P에게 턴을 넘기면 1P가 무조건 게임을 가져올 수 있다.
- n = 8이되면, 1P가 어떠한 선택을 하더라도 남는 돌은 5이상이 되고 이 말은 2P가 의도적으로 1P에게 돌을 4개 남겨서 2P가 게임을 주도할 수 있다는 말
- 이는 n = 9 ~ 11까지는 1P가 의도적으로 2P에게 8개의 돌을 남겨 승리를 가져올 수 있음을 뜻함

결국 Nim 게임은 돌의 수가 4의 배수일때는 2P가 게임을 승리할 수 있지만, 4의 배수가 아닐때는 1P가 게임을 이길 수 있는 승리법이 존재한다는 말

최종적으로 이 문제는 n이 4의 배수인지, 아닌지를 판단하여 4의 배수이면 false를 아니면 true를 반환하는 문제로 간략화할 수 있다.

## Code

<pre>
<code>
var canWinNim = function(n) {
    if (n % 4 == 0) return false;
    return true;
};
</code>
</pre>
