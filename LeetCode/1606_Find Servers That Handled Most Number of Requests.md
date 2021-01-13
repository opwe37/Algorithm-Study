# 1606. Find Servers That Handled Most Number of Requests
출처 : https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests/

## 문제 

You have  `k`  servers numbered from  `0`  to  `k-1`  that are being used to handle multiple requests simultaneously. Each server has infinite computational capacity but  **cannot handle more than one request at a time**. The requests are assigned to servers according to a specific algorithm:

-   The  `ith`  (0-indexed) request arrives.
-   If all servers are busy, the request is dropped (not handled at all).
-   If the  `(i % k)th`  server is available, assign the request to that server.
-   Otherwise, assign the request to the next available server (wrapping around the list of servers and starting from 0 if necessary). For example, if the  `ith`  server is busy, try to assign the request to the  `(i+1)th`  server, then the  `(i+2)th`  server, and so on.

You are given a  **strictly increasing**  array  `arrival`  of positive integers, where  `arrival[i]`  represents the arrival time of the  `ith`  request, and another array  `load`, where  `load[i]`  represents the load of the  `ith`  request (the time it takes to complete). Your goal is to find the  **busiest server(s)**. A server is considered  **busiest**  if it handled the most number of requests successfully among all the servers.

Return  _a list containing the IDs (0-indexed) of the  **busiest server(s)**_. You may return the IDs in any order.

동시에 여러개의 요청을 처리하는대 사용되는 `0`~`k-1`까지 넘버링된 `k`개의 서버가 있다. 각 서버는 무한한 계산 능력을 가지고 있지만 **한 순간에 하나의 요청만을 처리할 수 있다**. 요청은 다음의 특별한 알고리즘에 따라 서버에 할당된다 :
- `i번째`(0부터 시작) 요청이 도착한다.
- 만약 모든 서버가 바쁘다면, 그 요청은 버려진다.
- 만약 `(i % k)번째` 서버가 이용 가능하다면, 요청은 해당 서버에 할당된다.
- 그렇지 않다면, 다음 이용 가능한 서버에 할당된다(서버 리스트를 래핑하고, 필요하다면 0부터 시작). 예를 들어, 만약 `i번째` 서버가 바쁘면, `(i+1)번째` 서버에 할당하려 하고, 다음엔 `(i+2)번째` 서버에 할당하려는 식이다.

엄격하게 증가하는 양의 정수 배열 `arrival`이 주어진다, `arrival[i]`는 `i번째` 요청이 도착하는 시간을 표현한다. 그리고 또다른 배열 `load`가 주어진다, `load[i]`는 `i번째`요청의 로드(요청이 완료되는데 걸리는 시간)를 표현한다. 목표는 **가장 바쁜 서버**를 찾는 것이다. 모든 서버 중에서 가장 많은 요청을 성공적으로 처리한 서버가 **가장 바쁜** 것으로 고려된다.

_**가장 바쁜 서버**의 ID를 가진 리스트_ 를 반환하라. ID의 순서는 상관없다. 

## 예제
![](https://assets.leetcode.com/uploads/2020/09/08/load-1.png)
```
Input: k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3] 
Output: [1] 
Explanation:
모든 서버가 이용 가능하다.
처음 세개의 요청은 3개의 서버에 순서대로 할당되어 처리된다.
요청 3이 들어온다. 서버 0은 바쁘기 때문에 다음으로 이용 가능한 서버인 1에 할당된다.
요청 4가 들어온다. 모든 서버가 바쁘므로 처리될 수 없고, 버려진다.
서버 1이 2개의 요청을 처리하는 동안, 서버 0과 2는 1개의 요청을 처리하였다. 그래서 서버 1이 가장 바쁜 서버이다.
```

## 접근 방법

크기가 k인 배열 2개를 이용하여 알고리즘 구현, 첫번째 배열은 '서버의 상태'를 저장하고 두번째 배열은 '서버가가 처리한 요청의 수'를 저장한다.

- `serverState` : 서버의 상태를 저장
	- 만약 `serverState[i] == -1` : 서버 i는 유휴상태
	- 만약 `serverState[i] != -1` : 서버 i는 바쁜상태이며, `serverState[i]`는 서버 i가 유휴상태로 바뀌는 시간
- `assignedCnt` : 각 서버가 처리한 요청의 수를 저장
	- `serverState[i]` : 서버 i가 처리한 요청 수

하나의 요청이 입력되면 기본적으로 요청 시간을 기준으로 serverState를 갱신해준다.
```
for (i = 0; i < serverState's size; i++) {
	if (serverState[i] <= request time) serverState[i] = -1;
}
```
이후 갱신된 serverState를 기준으로 요청이 할당될 수 있는 서버를 찾는다.
```
serverId = request id % k;	// 체크할 서버의 id
tryCnt = 0 			// 몇 개의 서버를 확인했는지 체크
while (tryCnt < k) {
	tryCnt++;
	if (serverState[serverId] != -1) {
		serverState[serverId] = request time + load[request id];
		assignedCnt[serverId]++;
		break;
	}
	serverId = (++serverId) % k;
}
```
모든 요청에 대하여 이 과정을 거친후, `assginedCnt`에서 최대 값을 찾아 해당 값과 동일한 서버를 리스트로 출력하면 된다.

이 풀이 방식은 O(N*K)의 실행시간이 소요되는데(N = 요청 수, K = 서버 수), 문제에서 요구하는 실행 시간 이내에 해답을 내놓지 못한다. 코드 내에서 가장 많은 시간이 소요되는 다음의 부분을 개선하여 문제를 해결하고자 하였다.

	1. 특정 시간에 유휴인 서버로 바뀌는 서버를 알기 위해서 유휴 서버를 포함한 모든 서버를 탐색해야 한다. 
	2. 사용 가능한 서버를 찾기 위해 최악의 경우 바쁜 서버를 포함한 모든 서버를 탐색해야 한다.
 
첫 번째로는 탐색 범위를 줄이고자 하였다. 즉, 특정 시간에 유휴가 되는 서버를 찾고 싶다면 바쁜 서버 목록만을 확인하고 사용가능한 서버를 찾을 때는 유휴 서버 목록만을 확인하게 하자는 것이다. (서버에 대한 **저장공간을 분할하자**)
- idle : 유휴 서버의 id를 기록하는 저장공간
- busy : 바쁜 서버의 id와 완료시간을 기록하는 저장공간

두 번째로는 탐색 시간을 줄이고자 하였다.
- busy에서 완료 시간이 빠른 순으로 값을 얻을 수 있을까? => 우선순위 큐
- idle에서 사용가능한 서버를 바로 얻을 수 있을까?

idle에서 사용 가능한 서버를 얻는 과정에 대해 스스로 답을 얻지 못했고, 이 문제를 해결한 다른 개발자의 코드를 분석하여 적용하였다. 핵심은 idle에 대해서 두 개의 우선순위 큐를 사용한다는 것이다.
- after : request time에 서버의 id가 (request id % k)보다 큰 서버를 저장  
- before : request time에 서버의 id가 (request id % k)보다 작은 서버를 저장

after와 before를 위와 같이 유지시키는 방법은 아래와 같으며, 이처럼 after와 before를 유지시킬 수 있다면 이용가능한 서버를 찾는 과정은 O(1)이라는 빠른 시간안에 해결할 수 있다.
```
// busy, after and before are priority queue
// busy[i] = [turn around time, server id]
serverId = request id % k;
if (serverId == 0) {
	after = before;
	before = new priority queue;
}
while (!busy.isEmpty() && busy[0]'s turn around time < request time) {
	newIdle = busy.pop().getServerId();
	if (newIdle >= serverId) {
		after.push(newIdle);
	} else {
		before.push(newIdel);
	}
}

// 이용가능한 서버를 찾는 과정
availableServer = after.isEmpty() ? before : after;
if (availableServer.isEmpty()) request drop;
else {
	 assignedServer = availableServer.pop();
	 assignedServer's handled count ++;
}
```

## Code

1. 시간 초과가 발생된 초기 코드
<pre>
<code>
var busiestServers = function(k, arrival, load) {
    var servereState= Array(k).fill(-1);
    var assignedCnt = Array(k).fill(0);
    
    arrival.forEach((time, idx) => {
        for (let i = 0; i < k; i++) {
            if (servereState[i] <= time) servereState[i] = -1;
        }
        
        let serverIdx = idx % k;
        let tryCnt = 0;
        while (tryCnt != k) {
            tryCnt ++;
            if (servereState[serverIdx] == -1) {
                servereState[serverIdx] = time + load[idx];
                assignedCnt[serverIdx]++;
                break;
            }
            serverIdx = (++serverIdx) % k;
        }
    });
    
    let max = Math.max.apply(null, assignedCnt);
    const result = [];
    for (let i = 0; i < k; i++) {
        if (max == assignedCnt[i]) result.push(i);
    }
    
    return result;
};
</code>
</pre>

2. 개선한 코드
- 우선순위 큐를 구현하기 위해 최소 힙을 사용하였음
- 자바스크립에서는 힙이 기본적으로 제공되지 않으므로, 별도로 heapPush(), heapPop()을 구현하였음
<pre>
<code>
var busiestServers = function(k, arrival, load) {
    const handledCnt = Array(k).fill(0);
    
    const busyServers = [];
  
    let after = [],
        before = Array(k).fill(0).map((val, idx) => idx);
    
    arrival.forEach((time, idx) => {
        const serverId = idx % k;
        if (serverId == 0) {
            after = before;
            before = [];
        }
        
        while (busyServers[0] && busyServers[0][0] <= time) {
            const freeServer = heapPop(busyServers)[1];
            if (freeServer < serverId) heapPush(before, freeServer);
            else heapPush(after, freeServer)
        }
        
        const available = after.length != 0 ? after : before;
        if (available.length == 0) return; // drop
        const select = heapPop(available);
        handledCnt[select]++;
        heapPush(busyServers, [time+load[idx], select]);
    })
    
    const max = Math.max.apply(null, handledCnt);
    const result = [];
    for (let i = 0; i < k; i++) {
        if (max == handledCnt[i]) result.push(i);
    }
    
    return result;
};
</code>
</pre>
