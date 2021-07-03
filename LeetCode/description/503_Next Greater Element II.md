# 503. Next Greater Element II

출처 : https://leetcode.com/problems/next-greater-element-ii/

## 문제

Given a circular array (the next element of the last element is the first element of the array), print the Next Greater Number for every element. The Next Greater Number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, output -1 for this number.

환형 배열(배열의 마지막 요소 다음이 첫 요소인 배열)이 주어지면, 모든 요소에 대해서 Next Greater Number를 출력하라. 숫자 x의 Next Greater Number는 배열의 순차적으로 탐색 시에 처음으로 발견되는 더 큰 숫자이다. 만약 존재하지 않으면, -1을 출력하라.

## 예제
```
Input: [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2;   
The number 2 can't find next greater number;   
The second 1's next greater number needs to search circularly, which is also 2.
```

## 접근방법

1. Brute Force

모든 요소를 시작점으로 하여, 순차적으로 환형 배열을 탐색하며 Next Greater Number가 존재하는 지 체크하는 방식 (2중 for문으로 구현)

환형 배열을 탐색하기 위하여 나머지 연산(modulo, %)을 이용한다.

2. Stack

스택을 이용하여 Next Greater Number에 대한 정보를 저장하는 방식

스택을 이용한 방식으로 쉽게 이해하기 위해서, 환형 배열이 아닌 일반 배열인 상황으로 바꾸어 생각하자.

이를 위해 배열을 오르쪽으로 왼쪽으로 탐색을 하며, 스택을 이용하여 Next Greater Number를 찾는다. 오른쪽에서 왼쪽으로 탐색하는 이유는 임의의 인덱스 i의 Next Greater Number 후보자는 i의 오르쪽에 있기 때문이다. 즉, 오른쪽부터 탐색을 하여 그 결과를 바탕으로 왼쪽의 Next Greater Number를 별도의 탐색없이 찾기 위함이다.

스택에는 배열의 인덱스를 저장하는데, 이는 배열 내에 동일한 값이 존재할 수 있기 때문이다. 스택의 push와 pop은 다음과 같이 이뤄진다.
```
while(!stack.empty() && nums[stack.top] <= current element) {
	stack.pop();
}
```
위의 과정을 거치게 되면 스택의 Top에는 current element의 Next Greater Number의 인덱스가 위치하게 된다. 만약 스택에 남아있는 값이 없다면, 이는 current element보다 더 큰 값이 이후에 존재하지 않음을 뜻한다.

위의 pop과정이 끝나게 되면 current element의 인덱스를 스택에 push한다. 현재의 값은 이 다음 요소의 입장에서 Next Greater Number가 될 수 있기 때문이다.
```
stack.push(current idx)
```

일반 배열에서 스택을 이용하여 Next Greater Number를 찾는 방식은 이 것으로 끝난다. 이제 이 방식을 이제 환형 배열인 상태로 변경해야 하는데, 이는 매우 간단하다.

위의 과정(일반 배열의 과정)이 인덱스 0까지 모두 수행된 후의 스택의 상태를 생각해보면, 이 스택이 마지막 인덱스의 Next Greater Number를 찾는데 사용될 수 있음을 알 수 있다. 환형 배열은 배열의 마지막과 처음이 연결되어 있기때문이다.

## Code

1. Brute Force
<pre>
<code>
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
    var answer = [];
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        let cur = nums[i];
        for (let j = 1 ; j < n; j++) {
            let idx = i + j;
            if (nums[idx % n] > cur) {
                answer.push(nums[idx]);
                break;
            }
        }
        if (answer[i] == undefined) answer.push(-1);
    }
    return answer;
};
</code>
</pre>

2. Stack
<pre>
<code>
var nextGreaterElements = function(nums) {
	var result = Array(nums.length);
	var stack = [];
	for (let i = 2*nums.length -1; i >= 0; i--) {
		while (stack.length != 0 && nums[stack[stack.length-1]] <= nums[i%nums.length]) {
			 stack.pop();
		 }
        
		result[i%nums.length] = stack.length == 0 ? -1 : nums[stack[stack.length-1]];
		stack.push(i % nums.length);
	}
    return result;
};
</code>
</pre>
