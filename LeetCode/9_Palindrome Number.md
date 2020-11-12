# 9. Palindrome Number

출처 : https://leetcode.com/problems/palindrome-number/

## 문제

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.
(정수가 팰린드롬(회문)인지 아닌지 결정하라. 정수를 앞으로 읽은 것과 뒤로 읽은 것이 같으면 팰린드롬이다.)

**Follow up:**  Could you solve it without converting the integer to a string?
(정수를 문자형으로 변형 없이 문제를 풀 수 있는가?)

## 예제

- Example 1
	```
	Input: x = 121
	Output: true
	```
- Example 2
	```
	Input: x = -121
	Output: false
	Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
	```
- Example 3
	```
	Input: x = 10
	Output: false
	Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
	```
	
## 접근방법

가장 먼저 음의 정수의 경우 `-` 부호로 인하여 어느 경우에도 팰린드롬을 만들 수 없음을 예제를 통해 쉽게 알 수 있다. 이후 양의 정수에 대해서 팰린드롬을 체크해야 한다.

팰린드롬을 체크하는 방법에는 여러 방법이 있을 수 있으나 여기에서는 2가지 방법을 이야기하고자 한다. 

첫 번째 방법은 숫자를 문자형으로 변환하여 reverse()를 사용하는 방법이 있다. reverse()는 배열의 순서를 뒤집는 함수로 손쉽게 배열의 역순을 얻을 수 있다. 이후, 원래의 문자열과 비교를 통해 팰린드롬 여부를 직관적으로 판단가능하다.

두 번째 방법은 문자열로 변환하지 않고, 입력으로 들어오는 값이 숫자임을 이용한 방법이 있다. 숫자를 10으로 나누어 각 자리의 숫자를 얻는 방법이다. 아래의 예를 살펴보자.
```
193 이라는 숫자가 있다고 가정하면
193 % 10 = 3 (193의 1의 자리숫자)
193 / 10 = 19

19 % 10 = 9 (193의 10의 자리숫자)
19 / 10 = 1

1 % 10 = 1 (193의 100의 자리숫자)
```
위와 같이 반복적으로 10으로 나누는 것을 통해 각 자리의 숫자를 추출할 수 있고, 이를 통해 뒤집어진 숫자를 얻는 것이 가능하다. 이후에는 입력으로 주어진 숫자와의 직접적인 비교를 통해 팰린드롬 여부를 확인할 수 있다.

여기서는 문자열로 바꾸는 방법을 구현하였고, 두번째 방법은 문제에서 언급된 바와 같이 문자형으로 변환없이 푸는 방법에 대한 설명임
 
## Code
1. Convert Integer to String
<pre>
<code>
var isPalindrome = function(x) {
    if (x < 0) return false;
    
    var reverseX = x.toString().split('').reverse();
    x = x.toString();
    var n = x.length / 2;
    
    var answer = true;
    for (let i = 0; i < n; i++) {
        if (x[i] != reverseX[i]) {
            answer = false;
            break;
        }
    }
    return answer;
};
</code>
</pre>
