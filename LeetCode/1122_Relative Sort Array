# 1122. Relative Sort Array

출처 : https://leetcode.com/problems/relative-sort-array/

## 문제

Given two arrays  `arr1`  and  `arr2`, the elements of  `arr2`  are distinct, and all elements in  `arr2`  are also in  `arr1`.
(두 배열 `arr1`과 `arr2`가 주어질 때, `arr2`의 요소는 서로 구분되고, `arr2`의 모든 요소는 `arr1`에 있다.)

Sort the elements of  `arr1`  such that the relative ordering of items in  `arr1`  are the same as in  `arr2`. Elements that don't appear in  `arr2`  should be placed at the end of  `arr1`  in  **ascending**  order.
(`arr1`의 상대적 순서가 `arr2`와 같도록 `arr1`을 정렬하라. `arr2`에 없는 요소는 `arr1`의 끝에 **오름차순**으로 정렬하라 )

## 예제

- Example 1
	```
	Input: arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
	Output: [2,2,2,1,4,3,3,9,6,7,19]
	```
## 접근 방법

arr1의 요소 중에서 arr2에 있는 요소와 그렇지 않은 요소를 분리하는 것이 핵심
- arr1을 읽으면서 각 요소들이 몇번 등장하였는지 기록
- arr2를 순차적으로 읽으면서 위에서 기록한 내용대로 해당 요소를 결과에 추가 (ex_ 예제 1처럼 arr1에서 숫자 2가 3번 등장하였다면, 숫자 2를 결과에 연속으로 3번  추가하는 형식)
- 한번 사용된 숫자에 대한 기록은 삭제(arr2를 다 읽었을 때, 최종적으로 남은 기록이 결국 arr1에만 있는 숫자가 되도록 하기 위함)
- 최종적으로 남은 기록에 대해서 별도의 배열로 만든 후, 정렬하여 결과에 추가

## Code
<pre>
<code>
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function(arr1, arr2) {
    var hash = {};
    var answer = [];
    
    arr1.forEach(val => {
        if (hash.hasOwnProperty(val)) {
            hash[val] = hash[val] + 1;
        } else {
            hash[val] = 1;
        }
    });
    
    arr2.forEach(val => {
        for (let i = 0; i < hash[val]; i++) {
            answer.push(val);
        }
        delete hash[val];
    });
    
    var notDup = [];
    for (let i in hash) {
        notDup = notDup.concat(Array(hash[i]).fill(parseInt(i)));
    }
    
    notDup.sort((a, b) => a - b);
    answer = answer.concat(notDup);
    return answer;
};
</code>
</pre>
