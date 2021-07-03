# 168. Excel Sheet Column Title
출처: https://leetcode.com/problems/excel-sheet-column-title/

## 문제


Given an integer  `columnNumber`, return  _its corresponding column title as it appears in an Excel sheet_.

정수 `columnNumber`가 주어지면, _그것과 대응되는 엑셀 시트의 열 제목_ 을 반환하라.

For example:
```
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...
```

## 예제
```
Input: columnNumber = 1
Output: "A"
```
```
Input: columnNumber = 28
Output: "AB"
```
```
Input: columnNumber = 701
Output: "ZY"
```

## 접근 방법

A ~ Z가 반복되는 것을 이용하여 숫자를 26으로 나눈 몫과 나머지를 이용하면 된다. 10진법의 숫자에서 각 자리의 숫자를 확인하기 위해서 10으로 나눈 나머지와 몫을 이용하는 원리와 같다.

여기서 문제는 주어진 숫자를 그대로 사용할 경우, 26의 경우 몫이 1, 나머지가 0이 된다는 것이다. 즉, Z로 표현되어야 되는 것이 AZ로 표현된다는 것이다. 이러한 이유로 숫자에서 -1을 하여 0 = A, Z = 25에 대응되도록 한다. 이 과정은 계산 과정에서 구해지는 모든 몫에 적용되어야한다. 다음은 701에 대응되는 문자를 구하는 과정이다.
```
columnNumber = 701

1)
columnNumber에 -1 적용: 701 - 1 = 700
700 ÷ 26: 몫 = 26, 나머지 = 24
next colmnNumber: 26, 구해진 문자: Y

2) 
columnNumber에 -1 적용: 26 - 1 = 25
25 ÷ 26: 몫 = 0, 나머지 = 25
next colmnNumber: 0, 구해진 문자: Z

3)
next colmnNumber이 0이기 때문에 구해진 문자를 합침: ZY
(가장 나중에 구해진 문자가 맨 앞으로 오게 합쳐야 함)
```


## Full Code
|language|url|
|--------|---|
|JavaScript|[168.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/168.js)|
|Python3|[168.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/168.py)|
