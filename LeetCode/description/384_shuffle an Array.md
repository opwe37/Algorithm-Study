# 384. Shuffle an Array

출처 : https://leetcode.com/problems/shuffle-an-array/

## 문제

Shuffle a set of numbers without duplicates.
(중복없는 숫자들을 섞어라)

## 예제

- Example 1
	```
	// Init an array with set 1, 2, and 3.
	int[] nums = {1,2,3};
	Solution solution = new Solution(nums);

	// Shuffle the array [1,2,3] and return its result. Any permutation of [1,2,3] must equally likely to be returned.
	solution.shuffle();

	// Resets the array back to its original configuration [1,2,3].
	solution.reset();

	// Returns the random shuffling of array [1,2,3].
	solution.shuffle();
	```

## 접근 방법

예제를 통해 Solution 함수는 nums(정수 배열)을 입력으로 받고 shuffle(), reset() 함수를 갖음을 알 수 있음
- shuffle() : 주어진 배열로 만들 수 있는 순열 중 하나를 반환하도록 구현해야하는 것으로 난수 생성을 통해서 i번째 요소와 위치를 교환할 임의의 인덱스를 선택하고 교환하는 방식으로 구현
- reset() : 최초 주어진 배열을 반환하는 함수 => 최초의 배열을 저장하고 있다가 reset()이 호출될 때 반환

## Code
<pre>
<code>
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    this.origin = nums;
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.origin;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    let shuffled = this.origin.slice();
    
    for (let i = 0; i < shuffled.length; i++) {
        const idx = Math.round(Math.random() * (shuffled.length-1));
        [shuffled[i], shuffled[idx]] = [shuffled[idx], shuffled[i]];
    }
    
    return shuffled;
};
</code>
</pre>
