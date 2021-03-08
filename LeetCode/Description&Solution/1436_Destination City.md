# 1436. Destination City
출처: https://leetcode.com/problems/destination-city/

## 문제

You are given the array  `paths`, where  `paths[i] = [cityAi, cityBi]`  means there exists a direct path going from  `cityAi`  to  `cityBi`.  _Return the destination city, that is, the city without any path outgoing to another city._

It is guaranteed that the graph of paths forms a line without any loop, therefore, there will be exactly one destination city.

`cityA`에서 `cityB`로 가는 경로가 존재함을 의미하는 `paths[i] = [cityA, cityB]`인 배열 `paths`가 주어진다. _다른 도시로 이동이 불가능한 도시, 도작지를 반환하라._

경로의 그래프에는 루프가 없기 때문에, 하나의 답만이 존재합니다.

## 예제
```
Input: paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]
Output: "Sao Paulo" 
Explanation: "London" -> "New York" -> "Lima" -> "Sao Paulo".
```
## 접근 방법

`paths[i]`를 `paths[i][0]`은 출발지, `paths[i][1]`은 도착지라 부를 때, 반환해야 하는 값은 출발지로 선정되지 않은 도시이다.

`paths`로부터 출발, 도착 구분하지 않고 도시들을 추출해 낸다. 이후, 각 도시에서 출발하는 경로가 있는지 체크할 것을 생각하여, 맵(map) 구조를 사용하였다.
<pre>
<code>
cities = new Map();
for (i = 0; i < paths.length; i++) {
	cities.set(paths[i][0], 0);
	cities.set(paths[i][1], 0);
}
</code>
</pre>

다시 `paths`를 돌면서 출발지에 대해서 값을 메겨야 하는데, 각 도시를 출발지(`paths[i][0]`)로 하는 경로가 존재하는지 여부만이 필요하므로 경로가 존재하면 1로 설정하는 것으로 하였다. 또한 별도의 반복문을 사용하는 것 보다, 위의 반복문 안에서 해결이 가능하다. 대신 각 도시를 `cities`에 생성할 때, 존재 여부를 체크하여 값이 덮어씌워지는 일을 방지해야 한다.

<pre>
<code>
cities = new Map();
for (i = 0; i < paths.length; i++) {
	// cities에 paths[i][0]과 paths[i][1]이 없다면 생성
	if (!cities.has(paths[i][0]) cities.set(paths[i][0], 0);
	if (!cities.has(paths[i][1]) cities.set(paths[i][1], 0);
	
	// paths[i][0]을 1로 설정
	cities.set(paths[i][0], 1);
}
</code>
</pre>

최종적으로 `cities`에서 그 값이 0인 것을 찾아내어 반환하면 된다.

## Full Code
|language|url|
|--------|---|
|JavaScript|[1436.js](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1436.js)|
|Python3|[1436.py](https://github.com/opwe37/Algorithm-Study/blob/master/LeetCode/src/1436.py)|
