# 1288. Remove Covered Intervals
출처 : https://leetcode.com/problems/remove-covered-intervals/

## 문제 

Given a list of  `intervals`, remove all intervals that are covered by another interval in the list.
`intervals`의 리스트가 주어지면, 리스트 안의 다른 간격에 포함되는 모든 간격을 제거하라

Interval  `[a,b)`  is covered by interval  `[c,d)`  if and only if  `c <= a`  and  `b <= d`.
간격 `[a,b)`와 `[c,d)`가 `c <= a`이고 `b <= d`라면, `[a,b)`는 `[c,d)`에 포함되는 간격이다.

After doing so, return  _the number of remaining intervals_.
포함되는 간격을 모두 제거한 뒤에, _남아 있는 간격의 수_ 를 반환하라.

## 예제

```
Input: intervals = [[1,4],[3,6],[2,8]]
Output: 2
Explanation: Interval [3,6] is covered by [2,8], therefore it is removed.
```
```
Input: intervals = [[1,2],[1,4],[3,4]]
Output: 1
```

## 접근 방법

리스트 내에서 제거 가능한 간격의 수를 산출하고, 원래 리스트의 길이에서 산출한 간격 수를 빼어 남는 간격의 개수를 계산한다.

리스트 내에서 제거 가능한 간격의 수를 산출하는 방법은 다음과 같다.

리스트 `intervals`를 간격의 시작점(intervals[i]의 0번째 요소)을 기준으로 오름차순으로 정렬한다. 이는 임의의 간격 `A=[a,b)`, `B=[c,d)`가 있을 때, A가 B보다 intervals 안에서 인덱스가 낮다면 `A의 시작점 = a`이 `B의 시작점 = c`보다 작거나 같음을 보장한다.

- 만약 `index(A) < index(B)`이라면 `a <= c`임
 
 위 과정을 통해 간격 A와 B 사이의 관계가 3가지로 압축된다. (`index(A) < index(B)`)
 1) `A ⊃ B` => `b >= d`
 2) `A ⊂ B` => `a == c and b <= d`
 3) 포함관계가 아님

이제 간격 C가 있다고 가정해보자. 간격 C는 간격 B보다 `invertals`에서 높은 인덱스를 가진다 (즉, `index(A) < index(B) < index(C)`). 이때 C와 비교해야하는 간격에 대해서 생각해보자.
1) if `A ⊃ B` => A와 C를 비교
	- A가 B를 포함한다는 것은 A가 B보다 더 큰 범위를 가진다는 뜻 (if A⊂B : a<=c && b>=d)
	- 그렇기 때문에, 만약 B가 C를 포함한다면 A는 C를 포함할 것임
2) if `A ⊂ B` => B와 C를 비교
	- 위와 동일한 이유
3) A와 B가 포함관계가 없음 => B와 C를 비교
	- A와 B가 아무런 관계가 없다는 것은 B 이후에 나오는 어떤 간격과도 A는 관계가 없음을 의미함(`intervals`가 간격의 시작점을 기준으로 정렬되어 있기 때문)

## Code
<pre>
<code>
var removeCoveredIntervals = function(intervals) {
    if (intervals.length == 1) return 1;
    
    intervals.sort((a, b) => a[0] - b[0]);
    
    let cur = [-1, -1];
    let overlap = 0;
    for (let interval of intervals) {
        if (interval[1] <= cur[1]) {
            overlap++;
        } else {
            if (interval[0] == cur[0] && cur[1] <= interval[1]) {
                overlap++;
            }
            cur = interval;
        }
    }
    
    return intervals.length - overlap;
};
</code>
</pre>
