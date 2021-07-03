# 1432. Max Difference You Can Get From Changing an Integer
출처: https://leetcode.com/problems/max-difference-you-can-get-from-changing-an-integer/

## 문제

You are given an integer  `num`. You will apply the following steps exactly  **two**  times:

-   Pick a digit  `x (0 <= x <= 9)`.
-   Pick another digit  `y (0 <= y <= 9)`. The digit  `y`  can be equal to  `x`.
-   Replace all the occurrences of  `x`  in the decimal representation of  `num`  by  `y`.
-   The new integer  **cannot**  have any leading zeros, also the new integer  **cannot**  be 0.

Let  `a` and  `b` be the results of applying the operations to  `num`  the first and second times, respectively.

Return  _the max difference_  between  `a`  and  `b`.

정수 `num`이 주어진다.  다음의 과정을 정확히 두번 수행한다:

- 0 ~ 9의 숫자 중 `x`를 선택한다.
- 0 ~ 9의 숫자 중 또 다른 `y`를 선택한다. 이때 `x` 와 `y`는 동일할 수있다.
- `num`에서 발견되는 모든 `x`를 `y`로 대체한다.
- 새로운 정수는 0으로 시작할 수 없으며, 0이 될 수도 없다.

`num`에 대해서 위의 과정을 수행한 첫 번재와 두번째 결과를 `a`와 `b`라 하자.

`a`와 `b`의 _최대 차_를 반환하라.

## 예제
```
Input: num = 555
Output: 888
Explanation: The first time pick x = 5 and y = 9 and store the new integer in a.
The second time pick x = 5 and y = 1 and store the new integer in b.
We have now a = 999 and b = 111 and max difference = 888
```
```
Input: num = 123456
Output: 820000
```

## 접근 방법

`num`에서 파생될 수 있는 최대 값과 최소 값을 구하는 문제이다.

**최대 값**은 `num`의 9가 아닌 숫자 중에서 가장 큰 자리의 숫자를 선택하여 9로 변경하여 구할 수 있다. **최소 값** 은 `num`의 가장 큰 자리의 수가 1인지 아닌지를 고려해야한다. 만약 1이라면 그 다음 가장 큰 자리의 수를 선택, 해당 숫자와 같은 숫자를 0으로 교체하여야하고, 1이 아니라면 해당 숫자를 선택하여 1로 교체하는 작업을 수행하여야한다.

## Code

<pre>
<code>
var maxDiff = function(num) {
    let arr = [];
    while (Math.floor(num/10) != 0) {
        arr.push(num % 10);
        num = Math.floor(num/10);
    }
    arr.push(num);
    
    let max = 0;
    let x = null;
    for (let i = arr.length-1; i >= 0; i--) {
        if (x == null && arr[i] != 9) x = arr[i];
        
        max *= 10;
        if (x != null && arr[i] == x) {
            max += 9;
        } else {
            max += arr[i];
        }
    }
    
    let min = 0;
    x = arr[arr.length-1] == 1 ? null : arr[arr.length-1];
    for (let i = arr.length-1; i >= 0; i--) {
        if (x == null && (arr[i] != 0 && arr[i] != 1)) x = arr[i];
        
        min *= 10;
        if (x != null && x == arr[i]) {
            min += (x == arr[arr.length-1]) ? 1 : 0;
        } else {
            min += arr[i];
        }
    }
    
    return max - min;
};
</code>
</pre>
