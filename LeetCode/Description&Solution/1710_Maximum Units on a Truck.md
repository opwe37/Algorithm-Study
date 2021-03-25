# 1710. Maximum Units on a Truck

출처: https://leetcode.com/problems/maximum-units-on-a-truck/

## 문제

You are assigned to put some amount of boxes onto  **one truck**. You are given a 2D array  `boxTypes`, where  `boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi]`:

-   `numberOfBoxesi`  is the number of boxes of type  `i`.
-   `numberOfUnitsPerBoxi`  is the number of units in each box of the type  `i`.

You are also given an integer  `truckSize`, which is the  **maximum**  number of  **boxes**  that can be put on the truck. You can choose any boxes to put on the truck as long as the number of boxes does not exceed  `truckSize`.

Return  _the  **maximum**  total number of  **units**  that can be put on the truck._

**한개의 트럭**에 박스를 실어야 한다. `boxTypes[i] = [numberOfBoxesi, numberOfUnitsPerBoxi]`인 2차원 배열 `boxTypes`가 주어진다:
- `numberOfBoxesi`는 유형 `i`의 박스 개수이다.
- `numberOfUnitsPerBoxi`는 유형 `i` 박스 하나에 있는 유닛의 수이다.

트럭에 실을 수 있는 최대 박스의 수인, 정수 `truckSize`가 주어진다. `truckSize`를 초과하지 않는 이상 어떤 박스든 트럭에 실을 수 있다.

_트럭에 실릴 수 있는 **최대 유닛의 수**_ 를 반환하라. 

## 예제

```
Input: boxTypes = [[1,3],[2,2],[3,1]], truckSize = 4
Output: 8
Explanation: There are:
- 1 box of the first type that contains 3 units.
- 2 boxes of the second type that contain 2 units each.
- 3 boxes of the third type that contain 1 unit each.
You can take all the boxes of the first and second types, and one box of the third type.
The total number of units will be = (1 * 3) + (2 * 2) + (1 * 1) = 8.
```

## 접근 방법

탐욕(Greedy) 방법으로 접근이 가능하다. 

한 박스 당 유닛의 수(`numberOfUnitsPerBoxi`)를 기준으로 내림차순으로 정렬한다. 이후, 정렬된 배열을 인덱스 0부터 시작하여 박스를 싣는 작업을 수행하는데, 이 전에 현재 실린 박스의 수를 기록할 변수를 하나 선언하여 이용하도록 한다. 이 변수는 `truckSize`를 초과해서는 안된다.

정렬된 `typeBoxes`를 순회하면서 현재 유형의 박스가 실리게 되면 트럭에 실린 박스의 수가 truckSize를 초과하는지 체크하고, 초과한다면 몇 개까지 싣는게 가능한지 체크하도록 한다.

위의 내용을 코드로 정리하면 아래와 같다.
<pre>
<code>
sorted_boxes = typeBoxes.sort();	// numberOfUnitsPerBoxi를 기준으로 내림차순
current_number_of_boxes = 0;
current_number_of_units = 0; 

for (i = 0; i < sorted_boxes.length; i++) {
	if (sorted_boxes[i][0] + current_number_of_boxes > truckSize) {
		current_number_of_units += (truckSize - current_number_of_boxes) * sorted_boxes[i][1];
		break;
	}
	current_number_of_boxes += sorted_boxes[i][0];
	current_number_of_units += sorted_boxes[i][0] * sorted_boxes[i][1]
}
</code>
</pre>

## Full Code
|language|url|
|--------|---|
|JavaScript|[1710.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1710.js)|
