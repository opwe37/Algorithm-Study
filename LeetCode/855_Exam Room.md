# 855. Exam Room

출처 : https://leetcode.com/problems/exam-room/

## 문제


In an exam room, there are  `N`  seats in a single row, numbered  `0, 1, 2, ..., N-1`.
(시험장 안에, 한 줄로 `0 ~ N-1`까지 넘버링된 `N`개의 좌석이 있음)

When a student enters the room, they must sit in the seat that maximizes the distance to the closest person. If there are multiple such seats, they sit in the seat with the lowest number. (Also, if no one is in the room, then the student sits at seat number 0.)
(학생이 들어올때, 인접한 사람과 최대의 거리가 되는 좌석이 앉음. 만약 동일한 거리의 여러 좌석이 존재한다면 숫자가 작은 좌석에 앉음. 또한 방 안에 사람이 없다면 0번째 좌석에 앉음)

Return a class  `ExamRoom(int N)` that exposes two functions:  `ExamRoom.seat()` returning an  `int` representing what seat the student sat in, and  `ExamRoom.leave(int p)` representing that the student in seat number  `p` now leaves the room. It is guaranteed that any calls to  `ExamRoom.leave(p)`  have a student sitting in seat  `p`.
(`ExamRoog(int N)` 클래스는 두가지 함수를 갖음
	- `ExamRoom.seat()`는 학생이 앉아야 하는 좌석을 `int` 값으로 반환
	- `ExamRoom.leave(int p)`는 `p`좌석에 학생이 시험장을 나가 좌석이 빈 것을 의미(`ExamRoom.leave(p)`는 `p`좌석에 학생이 있음을 보장함))

## 예제

- Example 1
	```
	Input: ["ExamRoom","seat","seat","seat","seat","leave","seat"], [[10],[],[],[],[],[4],[]]
	Output: [null,0,9,4,2,null,5]
	Explanation:
	ExamRoom(10) -> null
	seat() -> 0, no one is in the room, then the student sits at seat number 0.
	seat() -> 9, the student sits at the last seat number 9.
	seat() -> 4, the student sits at the last seat number 4.
	seat() -> 2, the student sits at the last seat number 2.
	leave(4) -> null
	seat() -> 5, the student sits at the last seat number 5.
	```

## 접근 방법

- 어떤 좌석에 학생이 앉아 있는지 저장하는 배열(seatPerson) 선언 : `0 ~ N-1` 숫자만 저장, 저장된 숫자에는 학생이 앉아 있음을 나타내고 저장되지 않은 숫자는 빈 좌석임

- ExamRoom.seat() : 
	- seatPerson이 비어있다면, `0`을 push
	- seatPerson 배열을 순회하면서 seatPerson[i]와 seatPerson[i+1]의 중간 좌석을 찾고 거리 계산, 각 거리 중 가장 긴 거리와 해당 좌석만을 기억하는 방식으로 학생이 앉아야 할 좌석을 서치(linear하게 결과를 얻을 수 있도록 seatPerson 배열은 정렬 시켜둬야 함)
	- 주의! leave() 함수를 통해 0, N-1번째 좌석의 학생이 나갈 수 있으므로, seatPerson의 첫번째와 마지막 요소의 값이 0, N-1이 아닐 수 있음(즉, 양 끝 값 `0 ~ seatPerson[0]` 과 `seatPerson[seatPerson.length-1] ~ N-1`의 거리를 계산하여 위에서 찾은 최대 거리보다 해당 거리가 멀 경우 고려)
- ExamRoom.leave(p) : `p`좌석에 학생이 있음이 보장되므로 추가적인 연산 없이 바로 배열에서 `p`를 찾아 제거 

## Code
<pre>
<code>
var ExamRoom = function(N) {
    this.n = N;
    this.seatPerson = [];
};

ExamRoom.prototype.seat = function() {
    if (this.seatPerson.length == 0) {
        this.seatPerson.push(0);
        return 0;
    } else {
        let cur = null;
        if (this.seatPerson[0] >= this.n-1 - this.seatPerson[this.seatPerson.length-1]) {
            cur = [0, this.seatPerson[0]];
        } else {
            cur = [this.n-1, this.n-1 - this.seatPerson[this.seatPerson.length-1]];
        }
        
        for (let i = 0; i < this.seatPerson.length-1; i++) {
            let mid = Math.floor((this.seatPerson[i] + this.seatPerson[i+1]) / 2);
            let dis = mid - this.seatPerson[i];
            
            if (cur[1] < dis || (cur[1] == dis && cur[0] > mid)) {
                cur = [mid, dis];
            }
        }
        this.seatPerson.push(cur[0]);
        this.seatPerson.sort((a, b) => a - b);
        return cur[0];
    }
};

ExamRoom.prototype.leave = function(p) {
    this.seatPerson.splice(this.seatPerson.indexOf(p), 1);
};
</code>
</pre>
