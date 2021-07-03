# 1186. Maximum Subarray Sum with One Deletion

출처: https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/

## 문제

Given an array of integers, return the maximum sum for a  **non-empty** subarray (contiguous elements) with at most one element deletion. In other words, you want to choose a subarray and optionally delete one element from it so that there is still at least one element left and the sum of the remaining elements is maximum possible.

Note that the subarray needs to be  **non-empty**  after deleting one element.

주어진 정수 배열에서, 최대 한 원소가 삭제된 **비어있지 않은** 서브-배열(연속적인 원소)의 최대 합을 반환하라.

한 요소가 삭제된 이후에도 서브-배열은 비어있지 않아야 한다.

## 예제

```
Input: arr = [1,-2,0,3]
Output: 4
Explanation: Because we can choose [1, -2, 0, 3] and drop -2, thus the subarray [1, 0, 3] becomes the maximum value.
```

```
Input: arr = [1,-2,-2,3]
Output: 3
Explanation: We just choose [3] and it's the maximum sum.
```

## 접근 방법

배열에서 **원소의 삭제 없이** 연속된 원소의 서브 배열의 최대 합을 찾는 효율적인 방법에는 '**카데인 알고리즘(kadane's Algorithm)**'이 있다.</br>

카데인 알고리즘은 원소 `i`까지의 서브 배열의 최대값을 찾기 위해서 `i-1`까지의 서브 배열의 최대값을 사용하는 방법으로 다음과 같이 표현할 수 있다.

- `max_subarray[i] = max(arr[i], max_subarray[i-1] + arr[i])`
<pre>
<code>
n = arr.length;
max_subarray = [arr[0],  ]
for (i = 1; i < n; i++) {
	max_subarray[i] = max(arr[i], max_subarray[i-1] + arr[i]);
}
</code>
</pre>
	
최대 하나의 원소를 삭제하는 경우도 카데인 알고리즘의 접근 방식을 이용할 수 있다. 이 문제에서도 이전 원소까지의 값을 이용하여 현재에서 최대 값을 찾을 수 있는데, 최대 값이 될 수 있는 케이스는 다음과 같다.

	- 원소를 삭제하지 않은 경우 : max_subarray[i]
	- 한 원소를 삭제하는 경우
		- arr[i]를 삭제 : max_subarray[i-1]
		- arr[i]가 아닌 다른 요소를 삭제 : ?      

최대 한 원소까지 삭제가 가능하기 때문에, 삭제를 하지 않는 케이스는 최대값 후보에 오를 수 있다. 한 원소를 삭제하는 경우에는, `arr[i]`가 삭제되는 케이스와 `arr[i]`가 아닌 `0` ~ `i-1`의 원소 중 하나가 삭제된 경우를 생각해볼 수 있다. 

`0` ~ `i-1`의 원소 중 하나가 삭제된 케이스는 어떻게 구할 수 있을까. 카데인 알고리즘이 이전까지의 서브-배열의 최대 값을 이용하듯, 이 경우에서도 한 원소가 삭제되었을 때의 서브-배열의 최대값을 저장하는 배열을 선언하여 이용할 수 있다. 이 배열의 이름을 `oneDeletion`이라 할때, `arr[i]`가 아닌 다른 원소가 삭제된 케이스는 `arr[i] + oneDeletion[i-1]`로 정의할 수 있다.

카데인 알고리즘을 통해 얻는 `max_subarray`를 `0`~`i`까지 삭제된 요소가 없다는 의미를 담아 `noDeletion`이라 이름을 바꾸어 표현하면 다음과 같은 방식으로 `oneDeletion`을 구해갈 수 있다.
- `oneDeletion[i] = max(noDeletion[i], noDeletion[i-1], arr[i] + oneDeletion[i-1])`

<pre>
<code>
noDeletion = [] // 이전 코드의 max_subarray의 이름을 noDeletion으로 변경
...
// 카데인 알고리즘을 통해 noDeletion의 각 인덱스에 값을 할당
...
oneDeletion = [arr[0], ]
for (i = 1; i < n; i++) {
	oneDeletion[i] = max(noDeletion[i], noDeletion[i-1], arr[i] + oneDeletion[i-1]) 
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|JavaScript|[1186.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1186.js)|
|Python3|[1186.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1186.py)|
