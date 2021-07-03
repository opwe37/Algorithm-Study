function solution(n, arr1, arr2) {
    var answer = [];
    
    var answer = convertToBinary(orOperator(arr1, arr2));

    for (var i = 0; i <arr1.length; i++) {
        var tmp = pad(answer[i], n);
        var convert = '';
        for (var j = 0; j < n; j++) {
            if (tmp[j] == 1)    convert = convert + '#';
            else    convert = convert + ' ';
        }
        answer[i] = convert;
    }
    
    return answer;
}

function convertToBinary(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(arr[i].toString(2))
    }
    return result;
}

function orOperator(arr1, arr2) {
    var result = []
    for (var i = 0; i< arr1.length; i++) {
        result.push(arr1[i]|arr2[i]);
    }
    return result;
}

function pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
