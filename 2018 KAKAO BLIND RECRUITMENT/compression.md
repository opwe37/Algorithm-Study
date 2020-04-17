3차 _ 압축 문제
============

신입사원 어피치는 카카오톡으로 전송되는 메시지를 압축하여 전송 효율을 높이는 업무를 맡게 되었다. 메시지를 압축하더라도 전달되는 정보가 바뀌어서는 안 되므로, 압축 전의 정보를 완벽하게 복원 가능한 무손실 압축 알고리즘을 구현하기로 했다.

어피치는 여러 압축 알고리즘 중에서 성능이 좋고 구현이 간단한 LZW(Lempel–Ziv–Welch) 압축을 구현하기로 했다. LZW 압축은 1983년 발표된 알고리즘으로, 이미지 파일 포맷인 GIF 등 다양한 응용에서 사용되었다.

LZW 압축은 다음 과정을 거친다.

1. 길이가 1인 모든 단어를 포함하도록 사전을 초기화한다.
2. 사전에서 현재 입력과 일치하는 가장 긴 문자열 **w** 를 찾는다.
3. **w** 에 해당하는 사전의 색인 번호를 출력하고, 입력에서 **w** 를 제거한다.
4. 입력에서 처리되지 않은 다음 글자가 남아있다면(**c**), **w+c** 에 해당하는 단어를 사전에 등록한다.
5. 단계 2로 돌아간다.

압축 알고리즘이 영문 대문자만 처리한다고 할 때, 사전은 다음과 같이 초기화된다. 사전의 색인 번호는 정수값으로 주어지며, 1부터 시작한다고 하자.

색인번호|1|2|3|...|24|25|26   
------|---|---|---|---|---|---|---      
단어|A|B|C|...|X|Y|Z

예를 들어 입력으로 **KAKAO** 가 들어온다고 하자.

1. 현재 사전에는 **KAKAO** 의 첫 글자 **K** 는 등록되어 있으나, 두 번째 글자까지인 **KA** 는 없으므로, 첫 글자 **K** 에 해당하는 색인 번호 11을 출력하고, 다음 글자인 **A** 를 포함한 **KA** 를 사전에 27 번째로 등록한다.
2. 두 번째 글자 **A** 는 사전에 있으나, 세 번째 글자까지인 **AK** 는 사전에 없으므로, **A** 의 색인 번호 1을 출력하고, **AK** 를 사전에 28 번째로 등록한다.
3. 세 번째 글자에서 시작하는 **KA** 가 사전에 있으므로, **KA** 에 해당하는 색인 번호 27을 출력하고, 다음 글자 **O** 를 포함한 **KAO** 를 29 번째로 등록한다.
4. 마지막으로 처리되지 않은 글자 **O** 에 해당하는 색인 번호 15를 출력한다.

현재 입력(w) | 다음 글자(c) | 출력 | 사전 추가(w+c)   
---------- | ---------- | --- | ---      
K | A | 11 | 27:KA   
A | K | 1 | 28:AK   
KA | O | 27 | 29:KAO   
O | | 15 |   

이 과정을 거쳐 다섯 글자의 문장 **KAKAO** 가 4개의 색인 번호 [11, 1, 27, 15]로 압축된다.


입력 형식
-------
입력으로  대문자로만 이뤄진 문장열 msg가 주어진다. (0 <= msg.length <= 1000)


출력 형식
-------
주어진 문자열을 압축한 후의 사전 색인 번호를 배열로 출력하라.


예제
---
msg | answer   
----|-------   
KAKAO | [11, 1, 27, 15]   
TOBEORNOTTOBEORTOBEORNOT | [20, 15, 2, 5, 15, 18, 14, 15, 20, 27, 29, 31, 36, 30, 32, 34]   
ABABABABABABABAB | [1, 2, 27, 29, 28, 31, 30]   


풀이
--

- 사전 색인번호를 저장 할 배열 생성 및 초기화

```javascript
var dic = [];
for (var i = 0; i < 26; i++) {
  dic.push(String.fromCharCode(65+i));
}
```
단어의 색인 번호는 *index + 1* 로 계산

- 재귀호출을 이용한 압축 알고리즘 구현

'KAKAO'예제를 통한 규칙성 확인 - dic 배열의 저장 유무를 기준으로 다음과 같은 방식으로 결과값을 도출
1. 'K' 존재 => 'KA' 존재하지 않음. 'K' 번호 출력 및 'KA' 사전 추가
2. 'A' 존재 => 'AK' 존재하지 않음. 'A' 번호 출력 및 'AK' 사전 추가
3. 'K' 존재 => 'KA' 존재 => 'KAO' 존재하지 않음. 'KA' 번호 출력 및 'KAO' 사전 추가
4. 'O' 존재 => 더 이상의 단어가 존재하지 않음. 'O' 번호 출력

낱알(한개의 단어)부터 시작해서 dic배열에서 존재 유무 체크함. 존재한다면 다음 단어를 붙여서 존재 유무를 반복 체크, 존재하지 않는다면 이전 검색 결과를 출력 및 현재 단어 추가. 단, 더이상 붙일 단어가 없다면 이전 값을 배열에 추가 후에 재귀 종료

```javascript
function searchWord(w, c_index, msg, preIndex, result) {
    if (c_index > msg.length) {
        result.push(preIndex+1);
        return result;
    }
    var p = dic.indexOf(w);

    if (p != -1) {
        return searchWord(w + msg[c_index], c_index + 1, msg, p, result);
    } else {
        dic.push(w);
        result.push(preIndex+1);
        return searchWord(msg[c_index - 1], c_index, msg, -1, result);
    }
}
```
  + w : 사전에서 검색할 단어
  + c_index : *msg* 에서 *w* 뒤에 오는 단어의 인덱스
  + msg : 입력으로 들어온 단어를 낱알로 나누어 저장한 배열
  + preIndex : 이전 단계에서 찾아진 단어의 사전 인덱스
  + result : 압축 결과를 저장하는 배열
  
[전체 코드](https://github.com/opwe37/Algorithm-Study/blob/master/2018%20KAKAO%20BLIND%20RECRUITMENT/compression.js)

재귀호출을 이용하지 않고, 반복문만을 이용한 문제해결도 가능