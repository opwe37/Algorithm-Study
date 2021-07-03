function solution(s) {
    var answer = 0;

    if (s.length > 1) {
        var result = [];
        for (var i = 1; i < s.length-1; i++) {
            var words = stringSplit(i, s);
            result.push(matchingString(words));
        }
        answer = Math.min(...result);
    } else if (s.length == 1) answer = 1;
    
    return answer;
}

function stringSplit(n, s) {
    var str = s.split('');
    var result = [];
    var tmp = ''
    for (var i = 0; i < str.length; i++) {
        if (i == str.length-1) {
            if (i % n == 0) {
                result.push(tmp);
                result.push(str[i]);
            } else {
                tmp += str[i];
                result.push(tmp);
            }
            break;
        }
        if (i % n == 0) {
            result.push(tmp);
            tmp = '';
        }
        tmp += str[i]
    }
    result.splice(0, 1);
    return result;
}

function matchingString(arr) {
    var conti = 0;
    var preWord = '';
    var result = '';
    for (var i = 0; i < arr.length; i++) {
        if (conti == 0) {
            conti++; preWord = arr[i];
            continue;
        }
        if (conti > 0 && preWord == arr[i]) {
            conti++;
            if (i == arr.length-1) {
                if (conti == 1) result += preWord;
                else result += (conti + preWord);
            } 
            continue;
        }
        if (conti > 0 && preWord != arr[i]) {
            if (conti == 1) result += preWord;
            else result += (conti + preWord);

            conti = 1; preWord = arr[i];
            if (i == arr.length-1) {
                if (conti == 1) result += preWord;
                else result += (conti + preWord);
            } 
            continue;
        }
    }
    return result.length;
}
