function solution(words, queries) {
    var answer = new Array(queries.length).fill(0);

    for (var i = 0; i < queries.length; i++) {
        var regExp = query2regExp(queries[i]);
        for (var j = 0; j < words.length; j++) {
            if (regExp.test(words[j]) && words[j].length == queries[i].length) answer[i]++;
        }
    }

    return answer;
}

function query2regExp(query) {
    var regExpStr = "";
    for (var i = 0; i < query.length; i++) {
        if (query[i] == '?') {
            regExpStr += '[a-z]'
        } else {
            regExpStr += query[i];
        }
    }

    var regExp = new RegExp(regExpStr);
    return regExp;
}
