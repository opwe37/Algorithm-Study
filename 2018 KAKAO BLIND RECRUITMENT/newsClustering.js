function solution(str1, str2) {
    var answer = 0;

    var str1Arr = createArr(str1);
    var str2Arr = createArr(str2);

    answer = jaccard(str1Arr, str2Arr);

    return answer;
}

function createArr(str) {
    var result = [];
    var strArr = str.split('');
    for (var i = 0; i < (strArr.length-1); i++) {
        var tmp = (strArr[i]+strArr[i+1]).toUpperCase();
        if (/[A-Z][A-Z]/.test(tmp)) result.push(tmp);
    }
    return result
}

function jaccard(arr1, arr2) {
    if (Object.keys(arr1).length == 0 && Object.keys(arr2).length == 0)   return 65536;

    var countOfIntersection = 0;
    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] == arr2[j]) {
                countOfIntersection++;
                arr2[j] = 0;
                break;
            }
        }
    }

    var countOfUnion = arr1.length;
    for (var i = 0; i < arr2.length; i++) {
        if (arr2[i] != 0) countOfUnion++;
    }
    
    return Math.floor((countOfIntersection / countOfUnion) * 65536);
}
