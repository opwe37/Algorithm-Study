# 517. Super Washing Machines
출처: https://leetcode.com/problems/super-washing-machines/

## 문제


You have  **n**  super washing machines on a line. Initially, each washing machine has some dresses or is empty.

For each  **move**, you could choose  **any m**  (1 ≤ m ≤ n) washing machines, and pass  **one dress**  of each washing machine to one of its adjacent washing machines  **at the same time** .

Given an integer array representing the number of dresses in each washing machine from left to right on the line, you should find the  **minimum number of moves**  to make all the washing machines have the same number of dresses. If it is not possible to do it, return -1.

### 한글 요약 

`n`개의 세탁기가 있고, 각각의 세탁기 안에는 몇개의 세탁물이 있거나 비어있다.

세탁기 안의 세탁물의 개수를 일정하게 맞추기 위해, 한 순간에 `m`(1 <= m <= n)개의 세탁기를 선택하여 동시에 각각의 인접한 세탁기 중 하나로 세탁물 한 개를 이동시킨다.

이를 가능하게 하는 **최소 이동 수**를 구하고, 세탁물을 일정하게 맞추는게 불가능 하다면 -1을 반환하라.

## 예제

```
Input: [1,0,5]
Output: 3
Explanation:
1st move:    1     0 <-- 5    =>    1     1     4
2nd move:    1 <-- 1 <-- 4    =>    2     1     3    
3rd move:    2     1 <-- 3    =>    2     2     2
```
```
Input: [0,3,0]
Output: 2
Explanation:
1st move:    0 <-- 3     0    =>    1     2     0    
2nd move:    1     2 --> 0    =>    1     1     1
```

## 접근 방법

모든 세탁기가 같은 수의 세탁물을 갖을 수 있느냐 없느냐는 수학적으로 계산이 가능하다. 현재 모든 세탁물의 수를 세탁기의 수로 나누었을 때, 나누어 떨어지지 않는다면 문제에서 요구하는데로 -1을 반환해야 한다.
```
if (total number of dresses % n != 0) return -1;
```
반대로 나누어 떨어진다면, 모든 세탁기가 그 값(`target`)만큼의 세탁물을 갖도록 만드는데 필요한 최소 이동 수를 계산해야 한다.

`target`을 알기 때문에, 각 세탁기가 몇개의 세탁물이 더 필요한지 혹은 몇개의 세탁물을 나누어야하는지 계산할 수 있다.
```
diff[i] = machines[i] - target
```
만약 `diff[i]`가 음수라면 `|diff[i]|`개의 세탁물이 필요하고, 양수라면 `diff[i]`개만큼을 나눌 수 있다는 말이다. `diff`를 0부터 n-1까지 누적시키며 그 값을 기록한다. 다음의 예를 통해 이 작업의 의미를 생각해면,
```
machines = [1, 1, 5, 5], target = 3
diff = [-2, -2, 2, 2]
running diff = [-2, -4, -2, 0]
```
1th 세탁기를 보면, 3개의 세탁물을 갖기 위해선 2개의 세탁물만 더 필요하지만, 0th 세탁기 역시 2개가 더 필요하기 때문에 2개의 추가 세탁물을 받아야한다. 이 값이 -4인 것이다. 즉, `running diff`의 각 값은 해당 세탁기가 우측 세탁기로 부터 받아야하는 세탁물의 수(음수) 또는 좌측으로 주고 남은 세탁물의 수(양수_우측으로 넘길 세탁물의 수 이기도 하다) 이다. 다음은 양수값이 나오는 예 이다.
```
machines = [1, 2, 7, 2], target = 3
diff = [-2, -1, 4, -1]
running diff = [-2, -3, 1, 0]
```

최종적으로 반환해야하는 값은 `max(max(diff), max(|running diff|)`이다. `diff`와 `running diff`를 모두 고려하는 이유는 한 세탁기의 세탁물이 좌우측을 모두 커버할 수 있는 경우가 있기 때문이다. 

## Full Source Code

|language|code|
|-|-
|JavaScript|[517.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/517.js)|
|Python3|[517.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/517.py)|
