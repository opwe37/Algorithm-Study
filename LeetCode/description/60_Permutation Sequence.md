# 60. Permutation Sequence

출처 : https://leetcode.com/problems/permutation-sequence/

## 문제

The set  `[1,2,3,...,_n_]`  contains a total of  _n_! unique permutations.

(집합 [1, 2, 3, ..., n]은 _n_!개의 순열을 갖음)

By listing and labeling all of the permutations in order, we get the following sequence for  _n_  = 3:

(순열을 순서대로 정렬한다고 하면, n=3일 때 다음과 같은 순서를 갖음)

1.  `"123"`
2.  `"132"`
3.  `"213"`
4.  `"231"`
5.  `"312"`
6.  `"321"`

Given  _n_  and  _k_, return the  _k_th  permutation sequence.

(n과 k가 주어지면, k번째의 순열을 반환해라)

## 예제
- Example 1
	<pre>
	Input: n = 3, k = 3
	Output: "213"	
	</pre>

- Example 2
	<pre>
	Input: n = 4, k = 9
	Output: "2314"
	</pre>

## 접근 방법

찾아야하는 순열의 맨 앞자리부터 하나씩 찾는 방식

맨 앞자리가 정해졌을 때, _n-1_!개의 순열이 존재함을 이용

n = 3, k = 5이라 가정하면, 찾고자 하는 순열은 '312'

1XX => 2!개의 순열 존재, k = 5 - 2! = 3

2XX => 2!개의 순열 존재, k = 3 - 2! = 1

3XX => 2!개의 순열 존재, k = 1 - 2! = -1 (k <= 0인 순간이 해당 자리의 값, 맨 앞자리를 3으로 고정하고 2번째 자리의 수를 찾기 시작)

31X => 1!개의 순열 존재, k = 1 - 1! = 0 (뒤에 남은 자리가 한자리이므로 더이상 반복할 이유X)

## Code
<pre>
<code>
var factorial = [0, 1];
var getPermutation = function(n, k) {
    var answer = '';
    
    if (n == 1) {return '1';}
    
    var arr = Array(n).fill(0).map((val, idx) => idx+1);
    
    var curK = k;
    while (arr.length != 0) {
        let step = calcFactorial(arr.length-1);
        for (let i = 0; i < arr.length; i++) {
            curK -= step;
            if (curK <= 0) {
                answer += arr[i];
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 1) {
            answer += arr[0];
            break;
        }
        curK += step;
    }
    
    return answer;
};

var calcFactorial = function(n) {
    if (factorial[n]) {return factorial[n];}
    
    factorial[n] = calcFactorial(n-1) * n;
    return factorial[n];
}
</code>
</pre>
