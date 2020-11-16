# 567. Permutation in String

출처 : https://leetcode.com/problems/permutation-in-string/

## 문제

Given two strings **s1** and **s2**, write a function to return true if **s2** contains the permutation of **s1**. In other words, one of the first string's permutations is the **substring** of the second string.
(두 문자열 **s1**과 **s2**이 주어지면, s2가 s1의 순열을 포함한다면 true를 반환하는 함수를 작성하라. 다른 말로 표현하면, 첫 문자열의 순열 중 하나가 두번째 문자열의 하위 문자인지 아닌지 판단하라)

## 예제

- Example 1
	```
	Input: s1 = "ab" s2 = "eidbaooo"
	Output: True
	Explanation: s2 contains one permutation of s1 ("ba").
	```
- Example 2 
	```
	Input: s1= "ab" s2 = "eidboaoo"
	Output: False
	```
	
## 접근방법

Sliding Window 방법을 사용하여 문자열 S2를 한번 탐색하는 것 만으로 문제 해결 가능

S2 내에서 S1의 순열이 있는지 확인하는 문제인데, 가장 쉽고 단순한 방법은 Brute Force 방식 (S1의 모든 순열을 나열하여 S2와 대조하는 방법)이겠지만, 이는 효율적이지 못함

순열이 어떤 순서가 있는 집합을 다른 순서로 뒤바꾼 것이기 때문에 그 내부를 구성하는 원소 각각은 변하지 않음. 즉, 원래의 집합에 'a'가 4개 존재하였다면 해당 집합의 순열 또한 'a'가 4개. 이점을 이용하여 문제를 접근

최초 슬라이딩 윈도우 방식을 사용하여 문제를 해결하였다고 하였는데, s1과 동일한 사이즈의 윈도우를 만들고, s1을 읽으면서 s1이 어떤 알파벳으로 이루어졌는지 저장한다. 이후, s2를 읽으면서 동일한 구성의 알파벳이 존재하는지 확인하는 방식으로 문제를 해결
 
## Code
<pre>
<code>
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;
    
    var map = Array(26).fill(0);
    s1.split('').forEach(val => {
        map[val.charCodeAt(0)-97]++;
    });
    
    var s = 0, e;
    // init 
    for (e = 0; e < s1.length; e++) {
        map[s2[e].charCodeAt(0)-97]--;
    }
    
    while (e != s2.length) {
        // repeat check
        if (map.every(val => val == 0)) {
            return true;
        }
        
        map[s2[e++].charCodeAt(0)-97]--;
        map[s2[s++].charCodeAt(0)-97]++;
    }
    
    // final check 
    if (map.every(val => val == 0)) {
        return true;
    }
    
    return false;
};
</code>
</pre>
