# 93. Restore IP Addresses
출처: https://leetcode.com/problems/restore-ip-addresses/

## 문제

Given a string  `s`  containing only digits, return all possible valid IP addresses that can be obtained from  `s`. You can return them in  **any**  order.

A  **valid IP address**  consists of exactly four integers, each integer is between  `0`  and  `255`, separated by single dots and cannot have leading zeros. For example, "0.1.2.201" and "192.168.1.1" are  **valid**  IP addresses and "0.011.255.245", "192.168.1.312" and "192.168@1.1" are  **invalid**  IP addresses.

오직 0 ~ 9의 숫자로만 이루어진 문자열 `s`가 주어지면, `s`로 얻을 수 있는 모든 유효한 IP 주소를 반환하라. 어떤 순서로든 반환 가능하다.

**유효한 IP 주소**는 정확히 4개의 정수로 이루어져있고, 각 정수는 `0`과 `255` 사이의 정수이며, 하나의 점으로 구분되어 있고 0으로 시작할 수 없다. 예를들어, "0.1.2.201"과 "192.168.1.1"은 **유효한** IP 주소이고 "0.011.255.245", "192.168.1.312" 그리고 "192.168@1.1"은 **유효하지 않은** IP 주소이다.

## 예제
```
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
```
```
Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
```

## 접근 방법

문제를 요약하면, `s`를 4개의 그룹으로 나누는데 각 그룹이 `0`~`255`의 범위를 갖도록 나누어야 한다. 이를 위해 `s`를 읽으면서 순차적으로 그룹에 값을 할당하는 방식으로 문제 접근.

예를 들어, `s = "101023"`일때의 그룹을 채우는 방식은 아래와 같다.
```
Groups = ['','','','']

'1': 유효 => Groups[0] = '1'
'0': 유효 => Groups[1] = '0'
'1': 유효 => Groups[2] = '1'
'0': 유효 => Groups[3] = '0'

s가 다 읽히지 않았음에도 Groups가 다 참.
- 마지막 그룹에 남은 숫자를 다 넣을 수 있는가? : No!(0이 이끄는 숫자는 올 수 없음)
- Groups[3]을 채우기 이전으로 돌아가 Groups[2]에 더 많은 숫자를 할당할 수 있는지 탐색

현재 Groups[2] = '1';
'1' + '0' = '10': 유효 => Groups[2] = '10'
'2': 유효 => Groups[3] = '2'

아직 s가 다 읽히지 않았음에도 Groups가 다 참
- 마지막 그룹에 남은 숫자를 다 넣을 수 있는가? : Yes!('23'은 유효한 범위)
- Groups[3] = '23'

최종 Groups = ['1', '0', '10', '23'] => IP: "1.0.10.23"
```
이후 과정은 다시 Groups[2]에 더 많은 숫자가 할당 가능한지를 체크하면서 더 이상 할당이 불가능할 때까지 반복하며 IP를 찾고, Groups[2]에 할당이 불가능해지면 Groups[1]에 더 많은 숫자를 할당해보고, 최종적으로 Groups[0]은 어디까지 할당 가능한지 반복하는 과정을 거쳐 모든 가능한 IP를 찾는다.

## Code

<pre>
<code>
var restoreIpAddresses = function(s) {
    if (s.length == 4) {
        return [s.split('').join('.')];
    }
    
    const ips = [];
    findIPAddresses(s, 0, [], ips);
    return ips;
};

var findIPAddresses = function(s, idx, ip, ips) {
    if (ip.length > 4) return;
    
    if (idx == s.length && ip.length == 4) {
        ips.push(ip.join('.'));
        return;
    }
    
    if (s[idx] == 0) {
        ip.push('0');
        return findIPAddresses(s, idx+1, ip, ips);
    }
    
    let cur = '';
    for (let i = 0; i < 3; i++) {
        if (!isValid(cur + s[idx+i])) {
            return;
        }
        cur += s[idx+i];
        const newIp = ip.slice();
        newIp.push(cur);
        findIPAddresses(s, idx+i+1, newIp, ips);
    }
};

var isValid = function (s) {
    if (Number(s) <= 255) return true;
    return false;
} 
</code>
</pre>
