# 949. Largest Time for Given Digits
출처: https://leetcode.com/problems/largest-time-for-given-digits/

## 문제

Given an array `arr`  of 4 digits, find the latest 24-hour time that can be made using each digit  **exactly once**.

24-hour times are formatted as  `"HH:MM"`, where  `HH` is between `00` and `23`, and `MM` is between `00` and `59`. The earliest 24-hour time is  `00:00`, and the latest is  `23:59`.

Return  _the latest 24-hour time in `"HH:MM"`  format_. If no valid time can be made, return an empty string.

0~4의 숫자로 이루어진 배열 `arr`이 주어지면, 각 숫자를 **정확히 한 번** 사용하여 24시에 가장 근접한 시간을 찾아라. 

24시간제는 `"HH:MM"`의 형태이며, `HH`는 `00`과 `23` 사이의 숫자이고 `MM`은 `00`과 `59` 사이의 숫자이다. 24시간제의 가장 이른 시간은 `00:00`이고, 가장 늦은 시간은 `23:59`이다.

_`"HH:MM"` 형태의 가장 늦은 시간_ 을 반환하라. 만약 만들 수 있는 유효한 시간이 없다면, 빈 문자열을 반환하라.

## 예제
```
Input: A = [1,2,3,4]
Output: "23:41"
Explanation: The valid 24-hour times are "12:34", "12:43", "13:24", "13:42", "14:23", "14:32", "21:34", "21:43", "23:14", and "23:41". Of these times, "23:41" is the latest.
```
```
Input: A = [5,5,5,5]
Output: ""
Explanation: There are no valid 24-hour times as "55:55" is not valid.
```

## 접근 방법

`A`에서 두 요소를 선택하면 자연스럽게 두개의 선택받지 못한 요소가 생긴다. 이를 이용하여 선택된 요소를 `HH`로 선택받지 못한 요소를 `MM`으로 생각할 수 있다. 

`HH`로 A[i]와 A[j]가 선택되었다고 한다면, 이 두 요소로 2개의 `HH` 형태(`A[i]A[j]`, `A[j]A[i]`)를 만들 수 있고 `MM` 또한 마찬가지이다. 만들어진 `HH`와 `MM`는 유효성 검사를 수행한다. `HH`는 23보다 작아야하고 `MM`은 59보다 작은 값이여야한다. 이 과정을 통해 `A`로 만들 수 있는 모든 `HH:MM`의 형태를 얻을 수 있다.

가장 늦은 시간임을 어떻게 알 수 있을까. 이는 `HH:MM`을 `HHMM`의 형태로 변환하게 되면 쉽게 해결할 수 있다. `HHMM`의 형태에서 가장 큰 숫자가 시간 표현 `HH:MM`에서 `24:00`에 가장 가까운 시간일 것이다.

해답을 구하는 전체 과정은 다음과 같다.
1. `A`배열에서 두 개의 요소를 선택하여 `HH`로 선택받지 못한 요소를 `MM`으로 만든다.
2. 구해진 `HH`와 `MM`을 `HHMM`형태로 만든다.
3. 2에서 구해진 `HHMM`을 기존에 알고 있던 가장 큰 `HHMM`과 비교하여 더 큰 값을 선택한다.
4. `A`배열의 가능한 모든 i, j 조합을 만들어가면서 1~3과정을 반복한다.
5. 최종 적으로 선택된 `HHMM`을 `HH:MM`의 형태로 만들어 반환한다.


## Code

<pre>
<code>
var largestTimeFromDigits = function(arr) {
    let result = -1;
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            const tmp = arr.slice();
            if (i != j) {
                if (arr[i] * 10 + arr[j] > 23) continue;
                
                tmp.splice(i, 1);
                tmp.splice(j, 1);
                
                if (tmp[0] * 10 + tmp[1] > 59) continue;
                const time = arr[i]*1000 + arr[j]*100 + tmp[0]*10 + tmp[1];
                result = time > result ? time : result;
                
                if (tmp[1] * 10 + tmp[0] > 59) continue;
                const time2 = arr[i]*1000 + arr[j]*100 + tmp[1]*10 + tmp[0];
                result = time2 > result ? time2 : result;
            }
        }
    }
    
    return result;
};
</code>
</pre>
