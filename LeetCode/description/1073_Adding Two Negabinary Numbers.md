# 1073. Adding Two Negabinary Numbers
출처: https://leetcode.com/problems/adding-two-negabinary-numbers/

## 문제

Given two numbers  `arr1`  and  `arr2`  in base  **-2**, return the result of adding them together.

Each number is given in  _array format_: as an array of 0s and 1s, from most significant bit to least significant bit. For example,  `arr = [1,1,0,1]`  represents the number  `(-2)^3 + (-2)^2 + (-2)^0 = -3`. A number  `arr`  in  _array, format_  is also guaranteed to have no leading zeros: either `arr == [0]`  or  `arr[0] == 1`.

Return the result of adding  `arr1`  and  `arr2`  in the same format: as an array of 0s and 1s with no leading zeros.

**-2**를 밑으로 하는 `arr1`과 `arr1`가 주어지면, 합을 반환하라.

각 수는 _배열_ 로 주어진다: 각 배열은 0과 1로 구성되어있으며,  최상위 비트에서 최하위 비트 순서되어 있다. 예를 들어, `arr = [1,1,0,1]`은 `(-2)^3 + (-2)^2 + (-2)^0 = -3`이다.

`arr1`과 `arr2`의 합을 동일한 형태로 반환하라.

## 예제
```
Input: arr1 = [1,1,1,1,1], arr2 = [1,0,1]
Output: [1,0,0,0,0]
Explanation: arr1 represents 11, arr2 represents 5, the output represents 16.
```

## 접근 방법

가장 먼저 떠올릴 수 있는 방법은 두 숫자를 10진법으로 변환 후, 덧셈 계산하고 그 결과를 -2진법으로 변환하는 것이다.

하지만 여기서는 진법의 변환없이 주어진 두 수를 더하는 방법으로 풀이를 한다. -2진법의 덧셈의 방식은 다른 일반적인 진법의 덧셈 방식과 동일하다. 최하위 비트부터 덧셈을 시작하고, 그 결과가 해당 진법의 표현 범위를 넘어가게 되면 `carry`를 이용하여 다음 비트의 계산에 사용하는 것이다.

-2진법에서 덧셈을 수행할 때, 발생될 수 있는 기본 결과에 대해 정리하면 다음과 같다.
```
sum(negabinay)	| 	Output
-1(011)		| bit = 1, carry = 1(01)
0(000)		| bit = 0, carry = 0(00)
1(001)		| bit = 1, carry = 0(00)
2(110)		| bit = 0, carry = -1(11)
3(111)		| bit = 1, carry = -1(11)
```
위의 기본 결과를 이용하여, 덧셈을 수행하는 예는 다음과 같다.
```
Carry:          1 −1  0 −1  1 −1  0  0  0
First addend:         1  0  1  0  1  0  1
Second addend:        1  1  1  0  1  0  0 +
               --------------------------
Number:         1 −1  2  0  3 −1  2  0  1
Bit (result):   1  1  0  0  1  1  0  0  1
Carry:          0  1 −1  0 −1  1 −1  0  0
```
위의 내용은 [Wikipidia: Negative base](https://en.wikipedia.org/wiki/Negative_base)를 참조하였다.

위 방법 이외에 carry값이 2비트인 것을 이용하여 2개의 carry를 활용하는 방안 역시 가능하다.

## Full Code
|language|url|
|--------|---|
|JavaScript|[1073.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1073.js)|
