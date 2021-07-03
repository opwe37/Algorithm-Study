# 1386. Cinema Seat Allocation

출처: https://leetcode.com/problems/cinema-seat-allocation/

## 문제

![](https://assets.leetcode.com/uploads/2020/02/14/cinema_seats_1.png)

A cinema has  `n` rows of seats, numbered from 1 to  `n` and there are ten seats in each row, labelled from 1 to 10 as shown in the figure above.

Given the array  `reservedSeats`  containing the numbers of seats already reserved, for example,  `reservedSeats[i] = [3,8]` means the seat located in row  **3**  and labelled with  **8** is already reserved.

_Return the maximum number of four-person groups you can assign on the cinema seats._  A four-person group occupies four adjacent seats  **in one single row**. Seats across an aisle (such as [3,3] and [3,4]) are not considered to be adjacent, but there is an exceptional case on which an aisle split a four-person group, in that case, the aisle split a four-person group in the middle, which means to have two people on each side.

한 영화관은 1부터 `n`까지 번호가 부여된 `n`행의 좌석이 있으며, 각 행은 10개의 좌석이 배치되어 있다.

`reservedSeats` 배열은 사전에 예약된 좌석의 번호가 포함되어 있다. 예를들어, `reservedSeats[i] = [3,8]`은 **3**행 **8**번 좌석이 예약이 되어 있다는 것을 의미한다.

_영화관 좌석에 할당할 수 있는 4인 그룹의 최대 수를 반환하라._ 4인 그룹은 **한 줄의** 인접한 좌석을 할당 받을 수 있다. 통로를 지나는 좌석은 인접하지 않는 것으로 간주하지만, 4인 그룹이 통로를 기준으로 반으로 분리될 수 있는 예외가 존재한다. 이는 통로를 기점으로 양쪽에 두명씩 분할되는 경우를 말한다. 

## 예제
![](https://assets.leetcode.com/uploads/2020/02/14/cinema_seats_3.png)
```
Input: n = 3, reservedSeats = [[1,2],[1,3],[1,8],[2,6],[3,1],[3,10]]
Output: 4
Explanation: The figure above shows the optimal allocation for four groups, where seats mark with blue are already reserved and contiguous seats mark with orange are for one group.
```

## 접근방법

영화관의 좌석 배치가 통로를 기점으로 3 4 3인 것을 주목.

4인이 배치되는 경우는 [2, 3, 4, 5], [4, 5, 6, 7], [6, 7, 8, 9]의 3가지 케이스이다. 이를 고려하여 예약된 자석을 표시하면서 앉을 수 있는 케이스를 줄이는 방식으로 접근
- 좌석 2 또는 3이 예약되는 경우: [2, 3, 4, 5] 할당 불가
- 좌석 4 또는 5가 예약되는 경우: [2, 3, 4, 5], [4, 5, 6, 7] 할당 불가
- 좌석 6 또는 7이 예약되는 경우: [4, 5, 6, 7], [6, 7, 8, 9] 할당 불가
- 좌석 8 또는 9가 예약되는 경우: [6, 7, 8, 9] 할당 불가

한 줄에 대한 모든 예약 정보가 사용되어지면, 해당 줄에서 할당 가능한 케이스를 통해 최대한 많은 그룹이 할당될 수 있도록 한다.
- 모든 케이스가 할당 가능한 경우: 2개의 그룹 할당 가능
- 모든 케이스가 할당 불가능한 경우: 0개의 그룹 할당 가능
- 나머지 케이스 : 1개의 그룹 할당 가능

## 코드
<pre>
<code>
var maxNumberOfFamilies = function(n, reservedSeats) {
    const reserved = new Map();
    for (let [row, seat] of reservedSeats) {
        const reservedInfo = reserved.has(row) ? reserved.get(row) : [true, true, true];
        
        switch (seat) {
            case 2:
            case 3:
                reservedInfo[0] = false;
                break;
            case 4:
            case 5:
                reservedInfo[0] = false;
                reservedInfo[1] = false;
                break;
            case 6:
            case 7:
                reservedInfo[1] = false;
                reservedInfo[2] = false;
                break;
            case 8:
            case 9:
                reservedInfo[2] = false;
                break;
            default:
                break;
        }
        
        reserved.set(row, reservedInfo);
    }
    
    let answer = 0;
    const reservedRows = reserved.keys();
    let count = 0;
    for (let row of reservedRows) {
        count++;
        const info = reserved.get(row);
        if (info[0] && info[1] && info[2]) {
            answer += 2;
        } else if (!info[0] && !info[1] && !info[2]) {
            answer += 0;
        } else {
            answer += 1;
        }
    }
    answer += (n - count) * 2;
    return answer;
};
</code>
</pre>
