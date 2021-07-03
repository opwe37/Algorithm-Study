# 1029. Two City Scheduling

출처: https://leetcode.com/problems/two-city-scheduling/

## 문제

A company is planning to interview  `2n`  people. Given the array  `costs`  where  `costs[i] = [aCosti, bCosti]`, the cost of flying the  `ith`  person to city  `a`  is  `aCosti`, and the cost of flying the  `ith`  person to city  `b`  is  `bCosti`.

Return  _the minimum cost to fly every person to a city_  such that exactly  `n`  people arrive in each city.

한 회사가 `2n`명의 사람을 인터뷰하려고 한다. 배열 `costs`은 `cost[i] = [aCosti, bCosti]`로 표시되어 있으며, `ith` 사람이 `a` 도시로 이동할 때의 비용 `aCosti`과 `b`도시로 이동할 때의 비용`bCosti`이다.

각 도시에는 정확히 `n`명의 사람이 모이며, 이때 _모든 사람의 최소 비용_ 을 반환하라.

## 예제
```
Input: costs = [[10,20],[30,200],[400,50],[30,20]]
Output: 110
Explanation: 
The first person goes to city A for a cost of 10.
The second person goes to city A for a cost of 30.
The third person goes to city B for a cost of 50.
The fourth person goes to city B for a cost of 20.

The total minimum cost is 10 + 30 + 50 + 20 = 110 to have half the people interviewing in each city.
```

## 접근방법

각 사람마다 `a`도시로 이동하는 비용과 `b`도시로 이동하는 비용의 격차를 구하고, 격차가 큰 사람부터 적은 비용이 드는 도시로 배정하는 방식으로 접근

이동 비용의 격차에 대해서 생각을 하면,
- 만약 비용의 격차가 없다고 가정하면, 어떤 도시로 배정이 되어도 전체 비용에 영향을 끼치지 않을 것이다.
- 하지만, 비용의 격차가 크다면(예를 들어 `a`도시로 이동하는데 백만원을 쓰고, `b`도시로 이동하는데 만원이 필요하다고 가정), 적은 비용이 드는 도시로 배정하는 것이 전체 비용을 감소시킬 것이다.

## 코드
<pre>
<code>
var twoCitySchedCost = function(costs) {
    const sub = costs.map(val => [val[0] - val[1], ...val]).sort((a, b) => a[0] - b[0]);
    
    let sum = 0;
    const half = Math.floor(costs.length / 2);
    for (let i = 0; i < costs.length; i++) {
         if (i < half) {
             sum += sub[i][1];
         } else {
             sum += sub[i][2];
         }
    }
    return sum;
};
</code>
</pre>
