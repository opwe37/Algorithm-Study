# 636. Exclusive Time of Functions

출처 : https://leetcode.com/problems/exclusive-time-of-functions/

## 문제
On a  **single-threaded**  CPU, we execute a program containing  `n`  functions. Each function has a unique ID between  `0`  and  `n-1`.
(**단일 스레드**를 지닌 CPU에서, `n`개의 함수를 실행한다. 각 함수는 유일한 ID `0`~`n-1`을 갖는다.)

Function calls are  **stored in a  call stack**: when a function call starts, its ID is pushed onto the stack, and when a function call ends, its ID is popped off the stack. The function whose ID is at the top of the stack is  **the current function being executed**. Each time a function starts or ends, we write a log with the ID, whether it started or ended, and the timestamp.
(함수 호출은 **콜스택에 저장**된다: 함수 호출이 시작될때, 스택에 푸시되고 함수 호출이 끝날때, 스택에서 팝된다. 스택의 탑에 있는 함수는 **현재 실행되고 있는 함수**이다. 함수가 시작 또는 끝날 때, 해당 함수의 ID와 시간을 기록한다.)

You are given a list  `logs`, where  `logs[i]`  represents the  `ith`  log message formatted as a string  `"{function_id}:{"start" | "end"}:{timestamp}"`. 
(`logs` 리스트가 주어진다: 각 로그는 `{function_id}:{"start" | "end"}:{timestamp}`형태의 메시지로 기록되며, `logs[i]`는 `i번째` 로그 메시지를 의미한다.)

A function's  **exclusive time**  is the sum of execution times for all function calls in the program. For example, if a function is called twice, one call executing for  `2`  time units and another call executing for  `1`  time unit, the  **exclusive time**  is  `2 + 1 = 3`.
(**exclusive time**는 프로그램에서 각 함수들이 실행된 시간의 합계이다. 예를 들어, 함수가 두번 호출되었고 첫 호출은 `2`의 시간동안 두번째 호출이 `1`의 시간동안 실행되었다면 **exclusive time**은 `2 + 1 =3`이다.)

Return  _the  **exclusive time**  of each function in an array, where the value at the_ `ith` _index represents the exclusive time for the function with ID_ `i`.
(배열에 각 함수의 **exclusive time**을 반환하라. 반환된 배열의 `i`번째 인덱스에는 ID가 `i`인 함수의 exclusive time을 저장한다.)


## 예제

- Example 1
	```
	Input: n = 2, logs = ["0:start:0","1:start:2","1:end:5","0:end:6"]
	Output: [3,4]
	Explanation:
	Function 0 starts at the beginning of time 0, then it executes 2 for units of time and reaches the end of time 1.
	Function 1 starts at the beginning of time 2, executes for 4 units of time, and ends at the end of time 5.
	Function 0 resumes execution at the beginning of time 6 and executes for 1 unit of time.
	So function 0 spends 2 + 1 = 3 units of total time executing, and function 1 spends 4 units of total time executing.
	```
- Example 2
	```
	Input: n = 1, logs = ["0:start:0","0:start:2","0:end:5","0:start:6","0:end:6","0:end:7"]
	Output: [8]
	Explanation:
	Function 0 starts at the beginning of time 0, executes for 2 units of time, and recursively calls itself.
	Function 0 (recursive call) starts at the beginning of time 2 and executes for 4 units of time.
	Function 0 (initial call) resumes execution then immediately calls itself again.
	Function 0 (2nd recursive call) starts at the beginning of time 6 and executes for 1 unit of time.
	Function 0 (initial call) resumes execution at the beginning of time 7 and executes for 1 unit of time.
	So function 0 spends 2 + 4 + 1 + 1 = 8 units of total time executing.
	```
- Example 3
	```
	Input: n = 2, logs = ["0:start:0","0:start:2","0:end:5","1:start:6","1:end:6","0:end:7"]
	Output: [7,1]
	Explanation:
	Function 0 starts at the beginning of time 0, executes for 2 units of time, and recursively calls itself.
	Function 0 (recursive call) starts at the beginning of time 2 and executes for 4 units of time.
	Function 0 (initial call) resumes execution then immediately calls function 1.
	Function 1 starts at the beginning of time 6, executes 1 units of time, and ends at the end of time 6.
	Function 0 resumes execution at the beginning of time 6 and executes for 2 units of time.
	So function 0 spends 2 + 4 + 1 = 7 units of total time executing, and function 1 spends 1 unit of total time executing.
	```

- Example 4
	```
	Input: n = 2, logs = ["0:start:0","0:start:2","0:end:5","1:start:7","1:end:7","0:end:8"]
	Output: [8,1]
	```
- Example 5
	```
	Input: n = 1, logs = ["0:start:0","0:end:0"]
	Output: [1]
	```
## 접근 방법

함수의 start, end가 이뤄질때마다 실행 시간을 계산하여 최종적으로 해당 값을 누적시켜 각 함수의 exclusive time을 계산

아래의 그림(예제1)을 보면 다음과 같이 실행 시간 계산을 할 수 있음
![](https://assets.leetcode.com/uploads/2019/04/05/diag1b.png)
time 0 : ID_0 start
time 2 : ID_1 start : ID_0의 실행 시간 = 2 - 0 = 2
time 5 : ID_1 end : ID_1의 실행 시간 = 5 - 2 + 1 = 4 
time 6 : ID_0 end : ID_0의 실행 시간 = 6 - 5 = 1

total exclusive time
ID_0 = 2 + 1 =3
ID_1 = 4

위와 같이 계산하기 위하여 스택을 이용하고 log 기록에 대해 아래의 작업을 수행 
- start일 때, ID와 시간을 push하고 push 이전의 탑인 ID의 실행 시간을 계산
- end일 때, 현재 탑 ID의 실행 시간을 계산 후, pop을 수행. pop으로 인해 변경된 스택의 탑에 기록된 시간을 현재 로그 시간으로 변경
- 모든 로그에 대해 위와 같이 수행후에 각 함수 별로 총 시간을 계산한다.(또는 위의 과정 중간중간에 값을 누적시킨다.)

## Code
<pre>
<code>
/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
var exclusiveTime = function(n, logs) {    
    var answer = Array(n).fill(0);
    
    var logIdx = 0;
    var callStack = [logs[logIdx++].split(':')];
    
    while(logs.length != logIdx) {
        let curExe = callStack.length != 0 ? callStack[callStack.length - 1] : null;
        let curLog = logs[logIdx++].split(':');
        if (curLog[1] == 'start') {
            if (curExe != null) {
                answer[curExe[0]] += parseInt(curLog[2]) - parseInt(curExe[2]);
            }
            callStack.push(curLog.slice());
        } else {
            answer[curLog[0]] += parseInt(curLog[2]) - parseInt(curExe[2]) + 1;
            callStack.pop();
            if (callStack.length != 0)  callStack[callStack.length - 1][2] = parseInt(curLog[2]) + 1;
        }
    }
    
    return answer;
};
</code>
</pre>
