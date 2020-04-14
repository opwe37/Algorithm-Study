var dic = [];

function solution(msg) {
    var answer = [];

    for (var i = 0; i < 26; i ++) {
        dic.push(String.fromCharCode(65+i));
    }

    var msgStr = msg.split('');
    var w_index = 0;
    var c_index = w_index + 1;
    answer = searchWord(msg[w_index], c_index, msg, -1, []);

    return answer;
}

function searchWord(w, c_index, msg, preIndex, result) {
    if (c_index > msg.length) {
        result.push(preIndex+1);
        return;
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
