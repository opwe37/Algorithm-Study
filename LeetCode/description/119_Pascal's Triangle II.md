# 119. Pascal's Triangle II

출처: https://leetcode.com/problems/pascals-triangle-ii/

## 문제


Given an integer  `rowIndex`, return the  `rowIndexth`  (**0-indexed**) row of the  **Pascal's triangle**.

In  **Pascal's triangle**, each number is the sum of the two numbers directly above it as shown:

![](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)

`rowIndex`가 주어지면, **파스칼 삼각형**의 `rowIndexth`(**0-indexed**) 줄을 반환하라

## 예제

```
Input: rowIndex = 3
Output: [1,3,3,1]
```

## 접근 방법

위 그림에서 볼 수 있듯이 파스칼 삼각형은 다음과 같은 구조를 갖는다.
- a<sub>n1</sub> = 1
- a<sub>nn</sub> = 1
- a<sub>nk</sub> = a<sub>n-1k-1</sub> + a<sub>n-1k</sub>

a<sub>n</sub>을 구하기 위해서는 a<sub>n-1</sub>이 필요하다. 이를 재귀의 형태로 구할 수 있는데, **0-indexed**라는 것을 주의해서 구현하면 다음의 형태가 될 것이다.
<pre>
<code>
function pascal (n) {
	if (n == 0) return [1];
	nth_row = [1];
	pre_row = pascal(n-1);
	for (i = 1; i < n; i++){
		nth_row[i] = pre_row[i-1] + pre_row[i];
	}
	nth_row.push(1);
	return nth_row;
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|JavaScript|[119.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/119.js)|
