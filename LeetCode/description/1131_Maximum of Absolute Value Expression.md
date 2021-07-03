# 1131. Maximum of Absolute Value Expression

출처: https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays/

## 문제

### 번역

동일한 길이의 두 정수 배열이 주어지면, 다음 수식의 최대 값을 반환하라:

`|arr1[i] - arr1[j]| + |arr2[i] - arr2[j]| + |i - j|`,

( `0 <= i, j < arr1.length` )

### 원문

Given two arrays of integers with equal lengths, return the maximum value of:

`|arr1[i] - arr1[j]| + |arr2[i] - arr2[j]| + |i - j|`

where the maximum is taken over all  `0 <= i, j < arr1.length`.

## Example
```
Input: arr1 = [1,2,3,4], arr2 = [-1,4,5,6]
Output: 13
```
```
Input: arr1 = [1,-2,-5,0,10], arr2 = [0,-2,-1,-7,-4]
Output: 20
```

## 접근 방법

두 수의 절대값의 합은 다음과 같이 4가지 케이스 중 최대값을 찾는 것과 같다.
```
abs(A) + abs(B) = max(A+B, A-B, -A+B, -A-B)
```
세 수의 절대값의 합 또한 위와 같이 케이스를 나누어 볼 수 있는데, 총 8가지 케이스이다.
```
1.(arr1[i] - arr1[j]) + (arr2[i] - arr2[j]) + (i - j)
2.(arr1[i] - arr1[j]) + (arr2[i] - arr2[j]) - (i - j)
3.(arr1[i] - arr1[j]) - (arr2[i] - arr2[j]) + (i - j)
4.(arr1[i] - arr1[j]) - (arr2[i] - arr2[j]) - (i - j)
5.-(arr1[i] - arr1[j]) + (arr2[i] - arr2[j]) + (i - j)
6.-(arr1[i] - arr1[j]) + (arr2[i] - arr2[j]) - (i - j)
7.-(arr1[i] - arr1[j]) - (arr2[i] - arr2[j]) + (i - j)
8.-(arr1[i] - arr1[j]) - (arr2[i] - arr2[j]) - (i - j)
```
여기서 1과 8, 2와 7, 3과 6, 4와 5를 보면 서로 정확히 -1을 곱한 것과 같은 모습인 것을 확인할 수 있는데, 이를 통해서 1 ~ 4 혹은 5 ~ 6만 계산하면 나머지는 계산하지 않아도 알 수 있다는 의미가 된다.

1 ~ 4를 계산한다고 가정하고, 동일 인덱스끼리 묶으면 아래와 같은 형태가 된다. 
```
1.arr1[i] - arr1[j] + arr2[i] - arr2[j] + i - j 
  = (arr[i] + arr2[i] + i) - (arr1[j] + arr2[j] + j)
  
2.arr1[i] - arr1[j] + arr2[i] - arr2[j] - i + j
  = (arr[i] + arr2[i] - i) - (arr1[j] + arr2[j] - j)
  
3.arr1[i] - arr1[j] - arr2[i] + arr2[j] + i - j
  = (arr[i] - arr2[i] + i) - (arr1[j] - arr2[j] + j)
  
4.arr1[i] - arr1[j] - arr2[i] + arr2[j] - i + j
  = (arr[i] - arr2[i] - i) - (arr1[j] - arr2[j] - j)
```
중간의 `-` 연산자를 기점으로 양 쪽의 부호가 동일하다는 것을 알 수 있으며, 다음의 4가지 형태를 보인다.
```
(1, 1, 1), (1, 1, -1), (1, -1, 1), (1, -1, -1)
```
찾아야 하는 값이 최대값인 것을 생각할 때, `-`연산자를 기점으로 왼쪽은 최대값을 오른쪽은 최소값이 되도록 해야 한다는 것을 생각하며, 지금까지의 정보를 종합하여 코드를 구성하면 다음과 같다.
<pre>
<code>
function calcMax(sign1, sign2) {
	let max = -Infinity,
		min = Infinity;
	for (let i = 0; i < arr1.length; i++) {
		// arr1에 대한 부호는 항상 +로 동일
		const val = arr1[i] + (arr2[i] * sign1) + (i * sign2);
		max = Math.max(max, val);
		min = Math.min(min, val);
	}
	return Math.abs(max - min)
}

let answer = Math.max(calcMax(1, 1), calcMax(1, -1), calcMax(-1, 1), calcMax(-1, -1))
</code>
</pre>


## Full Code
|language|url|
|--------|---|
|Javascript|[1131.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1131.js)|
