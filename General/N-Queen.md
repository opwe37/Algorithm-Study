# N-Queen
문제 출처 : [https://programmers.co.kr/learn/courses/30/lessons/12952](https://programmers.co.kr/learn/courses/30/lessons/12952)

## 문제 설명

가로, 세로 길이가 n인 정사각형으로된 체스판이 있습니다. 체스판 위의 n개의 퀸이 서로를 공격할 수 없도록 배치하고 싶습니다.

예를 들어서 n이 4인경우 다음과 같이 퀸을 배치하면 n개의 퀸은 서로를 한번에 공격 할 수 없습니다.

![Imgur](https://i.imgur.com/lt2zdK6.png)       ![Imgur](https://i.imgur.com/5c5EUrq.png)

체스판의 가로 세로의 세로의 길이 n이 매개변수로 주어질 때, n개의 퀸이 조건에 만족 하도록 배치할 수 있는 방법의 수를 return하는 solution함수를 완성해주세요.

## 제한 사항

-   퀸(Queen)은 가로, 세로, 대각선으로 이동할 수 있습니다.
-   n은 12이하의 자연수 입니다.

## 입출력 예

|n|result|
|:----|:----|
|4|2|

## 문제 풀이

- 백트래킹 방법을 사용하여 퀸이 놓일 수 있는 위치를 확인
- 체스판의 윗 행부터 시작하여 점차 아래쪽으로 이동하며 가로, 세로, 대각선을 확인
	- 가로의 경우, 퀸의 위치를 직접 저장하므로써 가로에 두개 이상의 퀸이 존재하는 경우를 애초에 배제
	- 세로의 경우, 놓인 가로의 위치가 동일하면 안됨
	- 대각선의 경우, 두 지점의 가로 거리와 세로 거리가 동일하면 안됨
<pre>
<code>
function check_Q(queen_site, n) {
    for (let i = 0; i < n; i++) {
        if (queen_site[i] == queen_site[n]) return false;
        if (Math.abs(queen_site[i]-queen_site[n]) == Math.abs(i-n)) return false;
    }
    return true;
}
</code>
</pre>

- 위의 조건을 이용하여 세로, 대각선을 체크 후에 퀸을 위치시킴
- 세로 또는 대각선에서 놓일 수 없는 위치로 판별되면 더 이상 확인하지 않고, 전 단계로 이동
- 모든 조건이 확인되어 결국 마지막 행에 도착했다면, 결과 카운트를 1 올림
<pre>
<code>
function batch_Q(queen_site, cur_q_idx, n) {
    if (cur_q_idx == n) {
        answer++;
        return;
    }

    for (let i = 0; i < n; i++) {
        queen_site[cur_q_idx] = i;
        if (check_Q(queen_site, cur_q_idx)) batch_Q(queen_site, cur_q_idx+1, n);
    }
}
</code>
</pre>
전체 코드 : [https://github.com/opwe37/Algorithm-Study/blob/master/General/N_Queen.js](https://github.com/opwe37/Algorithm-Study/blob/master/General/N_Queen.js)
