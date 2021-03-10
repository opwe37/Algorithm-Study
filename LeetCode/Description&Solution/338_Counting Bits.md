# 338. Counting Bits
출처: https://leetcode.com/problems/counting-bits/

## 문제

Given a non negative integer number **num**. For every numbers **i** in the range **0 ≤ i ≤ num** calculate the number of 1's in their binary representation and return them as an array.

양의 정수 **num**이 주어진다. **0 <= i <= num** 범위의 모든 숫자 **i**에 대해서 그 이진 표현에서 1의 수를 계산하고 그것을 배열의 형태로 반환하라.

## 예제
```
Input: 2
Output: [0,1,1]
```
```
Input: 5
Output: [0,1,1,2,1,2]
```

## 접근 방법

숫자를 나열하면서 규칙 존재 여부를 체크해보자. 0 ~ 10에 대해 이진 표현과 그 안에서 1의 개수를 다음과 같이 표현하였다.

|i|binary representation|number of 1's|
|-|---------------------|-------------|
|0|0|0|
|1|1|1|
|**2**|10|1|
|3|11|2|
|**4**|100|1|
|5|101|2|
|6|110|2|
|7|111|3|
|**8**|1000|1|
|9|1001|2|
|10|1010|2|

우선 눈에 보이는 것은 **2<sup>n</sup>**의 경우 이진 표현에서 1은 1번 등장 한다는 것이다. 이를 보고 2<sup>n</sup>의 숫자를 기준으로 그 사이 값들의 관계를 보면, `2 ~ 3`은 `0 ~ 1`의 +1이고, `4 ~ 7`은 `0 ~ 3`의 +1이라는 것이다. 이 정보를 기반으로 어떤 숫자 i가 있을 때, i의 이진 표현에서 1의 수를 구하는 식을 다음과 같이 만들 수 있다.
- i의 1의 개수 = '**i - 2<sup>k</sup>**' 의 1의 개수 + 1
- 여기서 2<sup>k</sup>는 i보다 작거나 같은 2의 거듭제곱 중에서 가장 큰 값이다. 

## Full Code
|language|url|
|--------|---|
|JavaScript|[338.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/338.js)|
|Python3|[338.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/338.py)|
