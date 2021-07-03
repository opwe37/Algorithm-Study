#  423. Reconstruct Original Digits from English

출처 : https://leetcode.com/problems/reconstruct-original-digits-from-english/

## 문제

Given a  **non-empty**  string containing an out-of-order English representation of digits  `0-9`, output the digits in ascending order.
(0~9를 표현하는 영단어가 알파벳 순서가 뒤죽박죽인체 주어짐, 주어진 숫자를 오름차순으로 출력하라.)

>**Note:**  
>1.  Input contains only lowercase English letters.
>2.  Input is guaranteed to be valid and can be transformed to its original digits. That means invalid inputs such as "abc" or "zerone" are not permitted.
>3.  Input length is less than 50,000.

## 예제
- Example 1
```
Input: "owoztneoer"
Output: "012"
```
- Example 2:
```
Input: "fviefuro"
Output: "45"
```

## 접근방법

영단어에서 중복되지 않는 알파벳통해 숫자를 주어진 문자열에서 숫자를 찾아가는 방식

0 = zero
1 = one
2 = two
3 = three
4 = four
5 = five
6 = six
7 = seven
8 = eight
9 = nine

1. 0, 2, 4, 6 ,8 의 경우 각각 z, w, u, x, g 가 다른 숫자를 표현하는 영단어의 알파벳과 중복되지 않음
2. 1번에서 추출되는 숫자를 제외한 나머지를 살펴보면 1, 3, 5, 7은 각각 유일한 알파벳 o, r, f, s를 지님
3. 1번과 2번 과정을 통해 0~8의 숫자를 추출할 수 있고, 남은 숫자는 9가 유일

위의 특징을 통해 2가지 방식으로 구현 가능
- 탐색을 3번에 나눠서 진행하는 방식
	1. 주어진 문자열이 (0, 2, 4, 6, 8)에 해당하는 고유 알파벳을 갖고 있는지 확인
	2. 갖고 있다면, 해당하는 숫자를 결과에 저장 후 영어 표현을 문자열에서 제거
	3. 1~2 과정을 문자열에서 고유 알파벳이 등장하지 않을때까지 반복
	4. 3번 이후, 남은 문자열에서 (1, 3, 5, 7)에 해당하는 고유 알파벳의 유무 확인
	5. 갖고 잇다면, 해당하는 숫자를 결과에 저장 후 영어 표현 제거
	6. 4~5 과정을 문자열에서 고유 알파벳이 등장하지 않을 때까지 반복
	7. 6번 이후, 남은 문자열이 있다면 9를 결과에 저장 후 영어 표현을 제거하고 이를 문자열이 없을 때까지 반복

- 한번의 탐색으로 각각의 알파벳의 등장 횟수를 기록 후, (1, 3, 5, 7 ,9) 케이스에 대해 추후 처리하는 방식
	1. 주어진 문자열에서 각 숫자의 고유 알파벳인 [z, w, u ,x, g, o, r, f, s, n]의 등장 횟수를 저장
	2. 0, 2, 4, 6, 8(z, w, u, x, g)의 경우, 모든 범위에서 유일한 알파벳이기 때문에 1에서 저장한 횟수 그 자체가 등장 횟수임
	3. 1, 3, 5, 7(o, r, f, s)의 경우,  0, 2, 4, 6, 8를 표현하는 영단어와 중복되는 알파벳이기 때문에 이를 계산해줘야 함
		- 1의 경우, o를 포함하고 있는 0, 2, 4를 고려해야 함
		- 3의 경우, r을 포함하고 있는 0, 4를 고려해야 함
		- 5의 경우, f를 포함하고 있는 4를 고려해야 함
		- 7의 경우, s를 포함하고 있는 6을 고려해야 함
		- 9의 경우, n이 등장하는 영단어인 1과 7을 고려하고 본인이 n을 2개 소유하고 있음을 고려

## Code
1. 3번의 탐색을 통한 해결 방식
<pre>
<code>
var originalDigits = function(s) {
    var answer = [];
    
    var first_search = [['w', 2], ['u', 4], ['x', 6], ['g', 8], ['z', 0]];
    var second_search = [['o', 1], ['t', 3], ['f', 5], ['s', 7]];
    
    var res = findNumber(s, first_search);
    s = res[0];
    answer = answer.concat(res[1]);

    res = findNumber(s, second_search);
    s = res[0];
    answer = answer.concat(res[1]);
    
    while (s.length != 0)  {
        answer.push(9);

        let removeTarget = 'nine';
        for (let w of removeTarget) {
            s = s.replace(w, '');
        }
    }
    
    answer.sort();
    answer = answer.join('');
    
    return answer;
};

var findNumber = function(s, info) {
  var numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  var result = [];

  var count = 0;
  while (s.length != 0) {
      count = 0;
      info.forEach(val => {
          if (s.includes(val[0])) {
              result.push(val[1]);

              let removeTarget = numbers[val[1]];
              for (let w of removeTarget) {
                  s = s.replace(w, '');
              }
          } else {
              count++;
          }
      });
      if (count == info.length) break;
  }

  return [s, result];
}
</code>
</pre>

2. 한번의 탐색, 일부 케이스에 대한 추후 처리 방식
<pre>
<code>
var originalDigits = function(s) {
    var answer = '';
    
    var nums = [['w', 2], ['u', 4], ['x', 6], ['g', 8], ['z', 0], ['o', 1], ['r', 3], ['f', 5], ['s', 7], ['n', 9]];
    var counts = Array(10).fill(0);

    nums.forEach(val => {
      let regex = new RegExp(val[0], 'g');
      let res;
      if ((res = s.match(regex)) != null) {
        counts[val[1]] = res.length;
      }
    });

    counts[1] -= (counts[0] + counts[2] + counts[4]);
    counts[3] -= (counts[0] + counts[4]);
    counts[5] -= counts[4];
    counts[7] -= counts[6];
    counts[9] = (counts[9] - counts[7] - counts[1])/2;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < counts[i]; j++) {
        answer += i;
      }
    }
    
    return answer;
};
</code>
</pre>
