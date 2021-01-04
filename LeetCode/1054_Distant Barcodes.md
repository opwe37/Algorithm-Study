# 1054. Distant Barcodes

출처 : https://leetcode.com/problems/distant-barcodes/


## 문제

In a warehouse, there is a row of barcodes, where the  `ith`  barcode is  `barcodes[i]`.

창고에 바코드가 저장되어 있고, `ith`바코드는 `barcodes[i]`이다. 

Rearrange the barcodes so that no two adjacent barcodes are equal. You may return any answer, and it is guaranteed an answer exists.

바코드를 두 인접한 바코드가 같지 않도록 재배열하여라. 어떤 답을 반환하여도 되고 답이 존재함이 보장된다.

## 예제

```
Input: barcodes = [1,1,1,2,2,2]
Output: [2,1,2,1,2,1]
```
```
Input: barcodes = [1,1,1,1,2,2,3,3]
Output: [1,3,1,3,1,2,1,2]
```

## 접근방법

인접한 두 바코드가 같지 않게 하기위해서 짝수 인덱스와 홀수 인덱스를 나눠서 생각

입력으로 주어지는 바코드들을 동일한 바코드가 몇개 있는지 체크
```
Given Input = [1,1,1,1,2,2,3,3]
[barcode, count] : [1, 4], [2, 2], [3, 2]
```
가장 많은 수의 바코드부터 짝수 인덱스에 삽입
```
// 홀수 인덱스에는 아직 어떤 값이 들어갈지 모르기 때문에 null 삽입
Result = [1,null,1,null,1,null,1,null]
```
이후 홀수 인덱스에 남은 바코드를 차례대로 삽입
```
Result = [1,2,1,2,1,3,1,3]
```

## Code

<pre>
<code>
var rearrangeBarcodes = function(barcodes) {
    var codes = new Map();
    barcodes.forEach(val => {
        if (codes.has(val)){
            codes.set(val, codes.get(val)+1);
        } else {
            codes.set(val, 1);
        }
    });
    
    codes = Array.from(codes.entries());
    codes = codes.sort((a, b) => b[1] - a[1]);
    
    var answer = Array(barcodes.length).fill(0);
    var idx = 0;
    for (let i = 0; i < barcodes.length; i+=2) {
        answer[i] = codes[idx][0];
        codes[idx][1]--;
        if (codes[idx][1] == 0) {
            idx++;
        }
    }
    
    for (let i = 1; i < barcodes.length; i+=2) {
        answer[i] = codes[idx][0];
        codes[idx][1]--;
        if (codes[idx][1] == 0) {
            idx++;
        }
    }
    
    return answer;
};
</code>
</pre>
