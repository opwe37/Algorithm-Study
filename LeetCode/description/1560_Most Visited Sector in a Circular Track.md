# 1560. Most Visited Sector in a Circular Track
출처 : https://leetcode.com/problems/most-visited-sector-in-a-circular-track/

## 문제

Given an integer  `n`  and an integer array  `rounds`. We have a circular track which consists of  `n`  sectors labeled from  `1`  to  `n`. A marathon will be held on this track, the marathon consists of  `m`  rounds. The  `ith` round starts at sector  `rounds[i - 1]`  and ends at sector  `rounds[i]`. For example, round 1 starts at sector  `rounds[0]`  and ends at sector  `rounds[1]`

Return  _an array of the most visited sectors_  sorted in  **ascending**  order.

Notice that you circulate the track in ascending order of sector numbers in the counter-clockwise direction (See the first example).
## 예제

- Example 1
![](https://assets.leetcode.com/uploads/2020/08/14/tmp.jpg)
	```
	Input: n = 4, rounds = [1,3,1,2]
	Output: [1,2]
	Explanation: The marathon starts at sector 1. The order of the visited sectors is as follows:
	1 --> 2 --> 3 (end of round 1) --> 4 --> 1 (end of round 2) --> 2 (end of round 3 and the marathon)
	We can see that both sectors 1 and 2 are visited twice and they are the most visited sectors. Sectors 3 and 4 are visited only once.
	```
	
## 접근방법

두 가지 방법 존재
1. 모든 라운드를 시뮬레이션하여 각 섹션의 방문 횟수를 구하는 방법
2. 시작지점과 도착지점을 이용한 방법

첫 번째 방법의 경우, 가장 쉽께 떠올릴 수 있는 방법이고 직관적인 방법. 단, 구현함에 있어 원형 트랙에서 시합이 이뤄지는 걸 감안해야함. n = 4일때를 가정하면 마라톤은 1 -> 2 -> 3 -> 4 -> 1 -> 2 ... 와 같은 순서로 이뤄질 것이고, 4 -> 1의 순간이 존재하기 때문에 이를 고려해서 구현해야 함

두 번째 방법의 경우, 손쉬운 이해를 위해 문제 상황을 달리 표현한다면 아래와 같음
```
어떤 트랙을 '4바퀴 반'을 돌아야한다고 가정하면 
4바퀴를 도는 순간에는 트랙의 각 구역을 동일한 횟수(4번)만큼 지나가지만 
마지막 반 바퀴에 의해 5번 지나가는 구역이 생김
```
그렇기 때문에 시작 섹터와 마지막 섹터를 활용하면 방금 예로 든 '반 바퀴'에 해당하는 추가적으로 방문된 섹터을 구할 수 있음

**Case 1.** Start Sector <= Last Sector
Ex) n = 5, start = 3, end = 5
```
start   : __345
end     : 12345
overlap : __***
```
마라톤 선수는 섹터 3에서 시작하여 섹터4와 5를 지날 것이고, 마찬가지로 마지막 섹터 5에 도착하기 위해서 섹터 1,2,3,4를 지나쳐 올것임. 그 사이 몇 바퀴를 돌았는지는 상관없음

Ex) n = 5, start = 3, end = 3
```
start   : __345
end     : 123__
overlap : __*__
```

**Case 2.** Start Sector > Last Sector
Ex) n = 5, start = 4, end = 2
```
start   : ___45
end     : 12___
overlap : **_**
```
## Code
1. 모든 라운드를 시뮬레이션하여 각 섹션의 방문 횟수를 구하는 방법
<pre>
<code>
/**
 * @param {number} n
 * @param {number[]} rounds
 * @return {number[]}
 */
var mostVisited = function(n, rounds) {
    var visited = Array(n+1).fill(0);
    var round = 1;
    while (round < rounds.length) {
        let s = rounds[round - 1],
            e = rounds[round];
        if (e < s) {e += n;}
        for (let i = s; i < e; i++) {
            let sector = i;
            if (sector > n) {sector -= n;}
            visited[sector]++;
        }
        round++;
    }
    visited[rounds[round-1]]++;
    var max = Math.max.apply(null, visited);
    var answer = [];
    visited.forEach((val, idx) => {
        if (val == max) answer.push(idx); 
    });
    return answer;
};
</code>
</pre>

2. 시작지점과 도착지점을 이용한 방법
<pre>
<code>
var mostVisited = function(n, rounds) {
    var startSector = rounds[0],
        endSector = rounds[rounds.length -1];
    
    var answer = [];
    if (startSector <= endSector) {
        for (let i = 1; i <= n; i++) {
            if (i >= startSector && i <= endSector) answer.push(i);
        }
    } else {
        for (let i = 1; i <= n; i++) {
            if (i >= startSector || i <= endSector) answer.push(i);
        }
    }
    return answer;
};
</code>
</pre>
