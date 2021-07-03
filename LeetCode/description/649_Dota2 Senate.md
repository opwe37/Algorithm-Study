# 649. Dota2 Senate
출처: https://leetcode.com/problems/dota2-senate/

## 문제

In the world of Dota2, there are two parties: the  `Radiant`  and the  `Dire`.

The Dota2 senate consists of senators coming from two parties. Now the senate wants to make a decision about a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise  `one`  of the two rights:

1.  `Ban one senator's right`:  
    A senator can make another senator lose  **all his rights**  in this and all the following rounds.
2.  `Announce the victory`:  
    If this senator found the senators who still have rights to vote are all from  **the same party**, he can announce the victory and make the decision about the change in the game.

Given a string representing each senator's party belonging. The character 'R' and 'D' represent the  `Radiant`  party and the  `Dire`  party respectively. Then if there are  `n`  senators, the size of the given string will be  `n`.

The round-based procedure starts from the first senator to the last senator in the given order. This procedure will last until the end of voting. All the senators who have lost their rights will be skipped during the procedure.

Suppose every senator is smart enough and will play the best strategy for his own party, you need to predict which party will finally announce the victory and make the change in the Dota2 game. The output should be  `Radiant`  or  `Dire`.

### 한글 요약 

도타2 세계에는 `Radiant`와 `Dire` 두 종족이 있다. 

이 두 종족의 원로로 구성된 원로회는 투표를 통해 게임의 변화를 줄 수 있는 종족을 선정한다. 투표 방식은 라운드 기반 절차로, 각 라운드 마다 원로는 다음 2가지 권리 중 한 가지를 선택할 수 있다.
1. `한 원로의 권리를 금지한다.`
	한 원로는 다른 원로의 이번과 다음 모든 라운드에 그가 가진 모든 권리를 박탈시킬 수 있다. 박탈당한 원로는 어떠한 권리도 행사하지 못한다.
2. `승리를 선포한다.`
	만약 한 원로가 남은 원로들이 모두 자신과 같은 종족임을 발견한다면, 그는 승리를 선포할 수 있고, 게임의 변화에 대한 결정을 할 수 있다.

각 원로가 속한 종족을 나타내는 문자열이 주어질 때, 선택권을 갖는 종족이 어떤 종족인지 반환하라.

권리를 행사하는 순서는 주어진 문자열의 순서이며, 모든 원로는 자신의 종족을 이기게 할 최고의 전략을 수행한다.

## 예제

```
Input: "RD"
Output: "Radiant"
```
```
Input: "RDD"
Output: "Dire"
```

## 접근 방법

자신의 종족을 승리로 이끌기 위해서는 각 원로는 이번 라운드에서 권리를 행사하지 않은 원로 중 자신과 다른 종족의 원로가 권리를 행사하지 못하도록 해야한다. 그렇다면 `권리를 행사하지 않은 다른 종족의 원로 중 원로를 선택해야할까`를 고려해봐야한다. 

정답은 자신과 가까운 순번에 있는 다른 종족이다. 자신과 가까운 순번의 다른 종족을 제거함으로써 한 라운드에서 같은 종족이 더 많은 권리를 행사할 수 있도록 하는 전략이다. 만약 다른 전력을 취한다면 어떻게 될지를 보기 위해 `Input: "RDRDD"`를 생각해보자.
```
Input: R(1)D(1)R(2)D(2)D(3)
Dire의 전략: 권리를 행사하지 않은 원로 중 자신과 가까운 Radiant원로 제거
Raidant의 전략: 
		- 자신과 가까운 원로가 아닌 다른 순번의 원로를 금지
		- 자신과 가까운 원로를 금지

1. 자신과 가까운 원로가 아닌 다른 순번의 원로를 선택 및 금지시킬 때: Dire 승리
	- Round 1
		- R(1) => D(2) 제거, 남은 원로: R(1)D(1)R(2)D(3)
		- D(1) => R(2) 제거, 남은 원로: R(1)D(1)D(3)
		- D(3) => R(1) 제거, 남은 원로: D(1)D(3)

2. 자신과 가까운 원로를 금지시킬 때: Radiant 승리
	- Round 1
		- R(1) => D(1) 제거, 남은 원로: R(1)R(2)D(2)D(3)
		- R(2) => D(2) 제거, 남은 원로: R(1)R(2)D(3)
		- D(3) => R(1) 제거, 남은 원로: R(2)D(3)
	- Round 2
		- R(2) => D(3) 제거, 남은 원로: R(2)
```
비교를 위해 `Dire`의 전략은 고정시키고 `Radiant`의 전략을 두 가지로 나누었다. Radiant의 전략에 따라 결과가 다른데, 그 이유는 첫 번째 전략에서 두번째 R원로 순서 이전에 있는 Dire 원로를 금지시키지 않은 것이 다른 결과를 만든 핵심적인 이유이다. 이러한 이유에서 권리를 행사하지 않은 다른 종족 중 가장 가까운 원로를 금지시키는 전략이 필요하다.

엄밀히 말하면, 자신의 종족이 더 많은 권리를 행사하게 하기 위해서는 본인과 본인 다음의 같은 종족의 원로 사이에 있는 다른 종족을 금지시켜야 한다.
```
R(i)D(j)D(j+1)...D(k)R(i+1) 이라면,R(i)는 D(j) ~ D(k) 중 어떤 D원로든 아무나 선택해도 됨
이를 단순화 한 것이, R(i)와 가장 가까운 D(j)를 제거하는 방식이다.
```

## Full Source Code

|language|code|
|-|-
|JavaScript|[649.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/649.js)|
|Python3|[649.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/649.py)|
