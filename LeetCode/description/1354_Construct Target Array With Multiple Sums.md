# 1354. Construct Target Array With Multiple Sums
출처: https://leetcode.com/problems/construct-target-array-with-multiple-sums/

## 문제

Given an array of integers `target`. From a starting array,  `A` consisting of all 1's, you may perform the following procedure :

-   let  `x`  be the sum of all elements currently in your array.
-   choose index  `i`, such that `0 <= i < target.size`  and set the value of  `A`  at index  `i`  to  `x`.
-   You may repeat this procedure as many times as needed.

Return True if it is possible to construct the  `target`  array from  `A`  otherwise return False.

정수 배열 `target`이 주어진다. 원소가 1로 구성된 배열 `A`에서 다음의 규칙을 따른다:
- 배열의 모든 원소의 합을 `x`라 하자.
- `0 <= i < target.size`인 인덱스 `i`를 선택하고 `A`의 인덱스 `i`를 `x`로 설정한다.
- 필요하다면 이 과정을 계속 반복한다.

만약 `A`에서 `target`이 만들어진다면 True를 반환하고 그렇지 않다면 False를 반환하라.

## 예제
```
Input: target = [9,3,5]
Output: true
Explanation: Start with [1, 1, 1] 
[1, 1, 1], sum = 3 choose index 1
[1, 3, 1], sum = 5 choose index 2
[1, 3, 5], sum = 9 choose index 0
[9, 3, 5] Done
```
```
Input: target = [1,1,1,2]
Output: false
Explanation: Impossible to create target array from [1,1,1,1].
```

## 접근 방법

문제에서 주어진 규칙을 토대로 생각해보면, 배열의 모든 원소의 합(`x`)이 배열의 어떤 원소와 교환되는데 `x`은 기존 배열의 어떤 값보다 큰 값이다. 이를 수식으로 표현하면 더욱 잘 보인다.
```
A = [a[0], a[1], a[2], ..., a[n]]
x = a[0] + a[1] + a[2] + ... + a[n]

A의 모든 원소는 1보다 크거나 같음
즉, x는 A의 어떤 값보다도 큼 (최소 1은 커지게 되므로)
```
이를 통하여, 이전 단계에서 어떤 인덱스가 선택되어 교체되었는지 알 수 있으며, 그 값이 무엇인지 알 수 있다. (`a[1] = x - (a[0] + a[2] + a[3] + a[4] + ... a[n])`)

결과적으로 아래의 방법을 통해 `target`을 변경하며 문제에 대한 답을 찾아갈 수 있다.
- `target`에서 가장 큰 원소를 선택(`target[i]`), 인덱스 `i`를 제외한 나머지의 합(`restSum`) 계산
- `target[i] - restSum`을 `target`의 인덱스 `i` 와 교체
- 위의 과정을 반복하면서 target의 모든 원소가 1이 되는지를 확인한다.
- 만약 반복중에 모든 원소가 1이 된적이 없는데, 1보다 작은 값이 확인된다면 false를 반환한다.

위 방법의 문제는 특정 상황에서 **시간초과** 에러를 발생시킨다는 것이다. 시간 초과를 발생시키는 간단한 예는 `target = [2, 200009]`이다. 이 예의 경우 `target`의 가장 큰 값인 200009와 나머지의 합인 2사이의 차이가 매우 크다. 그렇기 때문에 200009에서 2를 빼고 난 뒤에도 가장 큰 값을 가르키는 인덱스와 restSum 값이 변하지 않는다. 이 문제를 다루기 위해서 mod연산을 사용하였다. mod연산을 사용하면 한 단계만에 restSum으로 몫만큼 뺀 결과를 얻을 수 있다.
- target[i] = target의 가장 큰 원소, restSum = 인덱스 `i`를 제외한 나머지 원소의 합
- target[i] = target[i] % restSum

하지만, 여전히 문제가 남아있다. mod 연산의 결과가 0인 경우이다. `target = [1, 200009]`을 생각해보자. 200009에서 1씩 빼는 것이기때문에 결과는 True여야 하지만 200009에서 1을 나눈 나머지는 0 이다. 즉, 원래의 방식대로라면 1보다 작은 값이 확인되기 때문에 False를 반환할 것이다. 이 문제를 해결하기 위해서 `target`의 가장 큰 값을 `restSum`으로 나누는 것이 아닌, `(가장 큰 값 - 1)`을 `restSum`으로 나눈 나머지에 `1`을 더한다.
- target[i] = ((target[i] - 1) % restSum) + 1

단순하게 생각해서, 최초 시작이 0이 아니라 1이기 때문에 1의 값을 따로 빼놓는다고 생각하면 된다.

## Code

아래 코드의 heapPush(), heapRearrange() 함수는 파라미터로 주어지는 배열을 heap구조로 사용할 수 있도록 별도로 구현한 함수이다. (target에서 최대값을 빠르게 찾을 수 있도록 최대힙을 구현한 것임)
<pre>
<code>
var isPossible = function(target) {
    if (target.length == 1) return target[0] == 1;
    
    const maxHeap = [];
    let sum = 0;
    target.forEach(val => {
        heapPush(maxHeap, val);
        sum += val;
    });
    
    while (maxHeap.length != 0) {
        const max = maxHeap[0];
        if (max == 1) return true;
        
        const restSum = (sum - max);
        const val = ((max-1) % restSum) + 1;
        if (val == max) return false;
        maxHeap[0] = val;
        heapRearrange(maxHeap);
        sum = restSum + val;
    }
    return true;
};
</code>
</pre>
