# 977. Squares of a Sorted Array

출처 : https://leetcode.com/problems/squares-of-a-sorted-array/

## 문제

Given an integer array `nums` sorted in **non-decreasing** order, return _an array of  **the squares of each number** sorted in non-decreasing order_.

**오름차순**으로 정렬된 배열 `nums`가 주어질 때, **각 요소의 제곱값**을 오름차순으로 정렬한 배열을 반환하라. 

## 예제

```
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].
```

## 접근방법

문제를 해결하기 위해 다음의 3가지 방법으로 접근
1. 정렬 함수를 이용하는 방법
2. 이진탐색트리를 이용하는 방법
3. 투 포인터(two pointers) 알고리즘을 이용하여 문제 해결

**정렬 함수**를 이용한 방법의 경우, 가장 손쉽게 떠올릴 수 있는 방법
- `nums`의 각 숫자의 제곱을 계산하여 별도의 배열로 저장
- 제곱값을 저장하는 배열을 정렬 함수를 이용하여 정렬 후 반환

**이진탐색트리**를 이용하는 방법
- `nums`의 각 숫자에 대하여 제곱값을 구하고, 그 값들을 이진탐색트리에 삽입
- 이진탐색트리를 중위순회 방법으로 전체 트리를 순회하며 값을 배열로 저장 및 반환

**투 포인터 알고리즘**을 이용하는 방법
- 두개의 포인터(l, r)를 주어진 `nums`의 시작과 끝 인덱스로 설정 (시작 = l, 끝 = r)
- 포인터가 가르키는 값의 제곱값을 비교하여 더 큰 값을 저장
	- 만약, r^2^ >= l^2^ 이라면, r^2^을 저장하고, r = r-1
	- 만약, r^2^ < l^2^ 이라면, l^2^을 저장하고, l = l+1
- 결과 저장은 배열의 시작 인덱스(0)부터 저장하는 것이 **아닌**, 배열의 마지막 인덱스(nums.length-1)부터 인덱스 0 방향으로 저장해가야 함


## Code

1. 정렬 함수 이용
<pre>
<code>
var sortedSquares = function(nums) {
    var result = [];
    nums.forEach(val => result.push(val*val));
    result = result.sort((a, b) => a-b);
    return result;
};
</code>
</pre>

2. 이진탐색트리 이용
<pre>
<code>
var sortedSquares = function(nums) {
    var tree = new Node(Math.pow(nums[0], 2));
    for (let i = 1; i < nums.length; i++) {
        tree.insert(Math.pow(nums[i], 2));
    }
    return tree.print([]);
    
};

var Node = function(val) {
    this.value = val;
    this.leftChild = null;
    this.rightChild = null;
}

Node.prototype.insert = function(val) {
    if (val > this.value) {
        if (this.rightChild == null) {
            this.rightChild = new Node(val);
        } else {
            this.rightChild.insert(val);
        }
    } else {
        if (this.leftChild == null) {
            this.leftChild = new Node(val);
        } else {
            this.leftChild.insert(val);
        }
    }
}

Node.prototype.print = function(result) {
    if (this.leftChild != null) result = this.leftChild.print(result);
    result.push(this.value);
    if (this.rightChild != null) result = this.rightChild.print(result);
    
    return result;
}
</code>
</pre>

3. 투 포인터 알고리즘 이용
<pre>
<code>
var sortedSquares = function(nums) {
    var l = 0, r = nums.length-1;
    var idx = nums.length-1;
    var arr = Array(nums.length).fill(null);
    while (l <= r) {
        if (Math.pow(nums[l], 2) < Math.pow(nums[r], 2)) {
            arr[idx--] = Math.pow(nums[r], 2);
            r--;
        } else {
            arr[idx--] = Math.pow(nums[l], 2);
            l++;
        }
    }
    return arr;
};
</code>
</pre>
