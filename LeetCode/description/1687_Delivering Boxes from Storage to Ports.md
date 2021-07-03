# 1687. Delivering Boxes from Storage to Ports

출처: https://leetcode.com/problems/minimum-depth-of-binary-tree/

## 문제

### 번역

오직 한개의 배로 창고에서 항구로 박스를 옮겨야한다. 배는 실을 수 있는 **박스의 수**와 **총 무게**에 대한 제한이 존재한다.

`boxes[i] = [portsi, weighti]`인 배열 `boxes`와 정수 `portsCount`, `maxBoxes` 그리고 `maxWeight`가 주어진다.

- `portsi`는 `ith` 박스가 배달되어야 할 항구를 뜻하고 `weighti`는 `ith` 박스의 무게이다.
- `portCount`는 항구의 수이다.
- `maxBoxes`와 `maxWeight`은 배가 실을 수 있는 박스와 무게의 상한 값이다.

박스는 주어진 순서대로 배달되어야 한다. 배는 다음의 규칙을 따른다:

- 배는 `boxes` 큐에서  `maxBoxes`와 `maxWeight`에 위배되지 않게 몇개의 박스를 선택한다.
- 박스가 **순서대로** 적재되고 나면, 박스가 배달되어야 하는 항구로 **이동**한다. 만약 배가 이미 올바른 항구에 있다면, 이동은 필요없으며 즉시, 배송된다.
- 그런 다음, 배는 창고에 남은 박스를 옮기기 위해서 다시 창고로 **이동**한다.

배는 모든 박스를 배송한 이후에 반드시 창고로 돌아와야 합니다.

창고의 모든 박스를 배송하기 위해서 **이동**해야 하는 **최소** 수를 반환하라.

### 원문

You have the task of delivering some boxes from storage to their ports using only one ship. However, this ship has a  **limit**  on the  **number of boxes**  and the  **total weight**  that it can carry.

You are given an array  `boxes`, where  `boxes[i] = [ports​​i​, weighti]`, and three integers  `portsCount`,  `maxBoxes`, and  `maxWeight`.

-   `ports​​i`  is the port where you need to deliver the  `ith`  box and  `weightsi`  is the weight of the  `ith`  box.
-   `portsCount`  is the number of ports.
-   `maxBoxes`  and  `maxWeight`  are the respective box and weight limits of the ship.

The boxes need to be delivered  **in the order they are given**. The ship will follow these steps:

-   The ship will take some number of boxes from the  `boxes`  queue, not violating the  `maxBoxes`  and  `maxWeight`  constraints.
-   For each loaded box  **in order**, the ship will make a  **trip**  to the port the box needs to be delivered to and deliver it. If the ship is already at the correct port, no  **trip**  is needed, and the box can immediately be delivered.
-   The ship then makes a return  **trip**  to storage to take more boxes from the queue.

The ship must end at storage after all the boxes have been delivered.

Return  _the  **minimum**  number of  **trips**  the ship needs to make to deliver all boxes to their respective ports._

## Example

```
Input: boxes = [[1,1],[2,1],[1,1]], portsCount = 2, maxBoxes = 3, maxWeight = 3
Output: 4
Explanation: The optimal strategy is as follows: 
- The ship takes all the boxes in the queue, goes to port 1, then port 2, then port 1 again, then returns to storage. 4 trips.
So the total number of trips is 4.
Note that the first and third boxes cannot be delivered together because the boxes need to be delivered in order (i.e. the second box needs to be delivered at port 2 before the third box).
```
```
Input: boxes = [[2,4],[2,5],[3,1],[3,2],[3,7],[3,1],[4,4],[1,3],[5,2]], portsCount = 5, maxBoxes = 5, maxWeight = 7
Output: 14
Explanation: The optimal strategy is as follows:
- The ship takes the first box, goes to port 2, then storage. 2 trips.
- The ship takes the second box, goes to port 2, then storage. 2 trips.
- The ship takes the third and fourth boxes, goes to port 3, then storage. 2 trips.
- The ship takes the fifth box, goes to port 3, then storage. 2 trips.
- The ship takes the sixth and seventh boxes, goes to port 3, then port 4, then storage. 3 trips. 
- The ship takes the eighth and ninth boxes, goes to port 1, then port 5, then storage. 3 trips.
So the total number of trips is 2 + 2 + 2 + 2 + 3 + 3 = 14.
```
## 접근 방법

`boxes`의 `ith`박스까지의 최소 이동 수를 어떻게 구할 수 있을까. `0th ~ i-1th` 까지의 최소 이동 수를 알 고 있다고 가정하면, `ith`박스를 개별적으로 이동하는 케이스와 `ith`박스와 이전 박스를 묶어서 이동하는 케이스 중 더 작은 케이스가 `ith` 박스까지의 최소 이동 수 일 것이다.
<pre>
<code>
dp_memory[i] = dp_memory[i] + 2;
ship_info = {boxes: 1, weight: boxes[i][1]};
cur_port = boxes[i][0];
port_count = 0;
for (let j = i-1; j >= 0; j--) {
	if (ship_info.boxes + 1 > maxBoxes || ship_info.weight + boxes[j][1] > maxWeight) { 
		break;
	}
	if (cur_port != boxes[j][0]) {
		port_count += 1;
	}
	dp_memory[i] = min(dp_memory[i], dp_memory[j-1] + 2 + port_count);
}
</code>
</pre>
`dp_memory`는 `0th ~ ith`까지 박스를 각 항구로 배송하는 최소 이동 수를 저장하는 배열이다. `ith` 박스를 계산하기 앞서, `ith` 박스가 이전 박스들과 별개로 배송이 이루어질때 얻을 수 있는 `dp_memory[i]`의 값은 `dp_memory[i-1] + 2`이다. 여기서 `+2`는 창고에서 나가고 들어오는 값을 의미한다. </br>
실제로 `dp_memory[i]`의 최소를 구하는 과정은 for 구문을 통해서 이루어지는데, for문에서는 `ith`이전 박스들을 하나씩 추가하면서 해당 상태에서의 이동 수를 계산한다. 이동 수는 `dp_memory[j-1] + 2 + port_count`로 계산되어 지는데, `port_count + 2`가 `jth ~ ith` 박스를 싣고 나갈때의 이동수 이고 이를 `dp_memory[j-1]`과 더하여 `0th ~ ith`일 때를 구하는 것이다.

위 코드를 `i`를 `0 ~ boxes의 수`까지 반복하면서 `dp_memeory`를 업데이트하고, 최종 `dp_memory`에 저장된 마지막 인덱스 값을 가져오는 것으로 문제의 답을 얻을 수 있다.

이 접근 방식은 DP만을 이용한 접근 방식인데, 이 방식으로는 **TLE**(Time Limit Exceeded, 시간초과)와 마주하게 된다.

위의 방식을 효율적으로 변경하기위해서 **슬라이딩 윈도우**방식을 적용할 수 있다. 이전의 방식은 `ith`박스와 함께 배송 될수 있는 `ith`이전 박스와의 모든 조합을 확인하는 방식이면, 슬라이딩 윈도우 방식은 윈도우에 `ith`박스를 포함하여 배에 실을 수 있는 최대 박스를 유지하는 방식이다. 박스는 개별적으로 움직이는 것보다, 함께 움직이는 것이 더 적은 이동 수를 만드는 방법이므로 모든 케이스를 확인하지 않겠다는 것이다. 

<pre>
<code>
start = 0;
port_count = 0;
ship_info = {boxes: 0, weight: 0};
for (let i = 0; i < boxes.length; i++) {
	ship_info.boxes += 1;
	ship_info.weight += boxes[i][1];
	if (i != 0 && boxes[i][0] != boxes[i-1][0]) port_count += 1;

	while (start < i && (ship_info.boxes > maxBoxes || ship_info.weight > max_weight)) { 
		ship_info.boxes -= 1;
		ship_info.weight -= boxes[start][1];
		if (boxes[start][0] != boxes[start+1][0]) port_count -= 1;
		start += 1;
	}
	
	dp_memory[i] = start == 0 ? diff + 2: dp_memory[start-1] + diff + 2
}
</code>
</pre>

`start`변수는 윈도우의 시작 지점을 가르키고, for문의 `i`가 윈도우의 끝 지점을 가르킨다. for문 안에 있는 while문이 배의 상태를 체크하고 제한 조건에 맞도록 `start`를 이동시키는 역할을 한다.

이 코드에서 한 가지 더 생각해야 하는 부분이 있다. `start`가 이동한다는 것의 의미를 생각해봐야 한다. `start`가 변경 전에는 `a`박스를, 변경 후에는 `b`박스를 가르킨다고 하자.
원래는 `a`박스와 `b`박스가 한 번에 이동했을 것인데, 변경 후에는 `a`와 `b`가 분리되어 이동할 것이다. 이때 만약 `a`와 `b`가 같은 항구에 배송되는 박스라면, 이 분리 상황으로 인해서 불필요한 이동이 추가될 것임을 예상할 수 있다.
이 상황을 피하기 위해서, 위 while문에서 한 가지 조건을 더 추가시킬 것이다. 바로 `dp_memory[start] == dp_memory[start-1]`이다.

<pre>
<code>
for(let i = 0; i < boxes.length; i++) {
	while (... && (... || dp_memory[start] == dp_memory[start-1])) {
		...
	}
	dp_memory[i] = start == 0 ? diff + 2 : dp_memory[start-1] + 2 + diff;
}
</code>
</pre>

이와 같이 DP + Sliding Window 방식으로 제한시간 내에 문제를 해결할 수 있다.

## Full Code
|language|url|
|--------|---|
|Javascript|[1687.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1687.js)|
