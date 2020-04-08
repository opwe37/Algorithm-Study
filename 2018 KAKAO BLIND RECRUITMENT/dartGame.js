function solution(dartResult) {
    var answer = 0;

    var reg = /([0-9]+)(S|D|T)[\*\#]?/g;
    var dartResults = dartResult.match(reg)
    var setScore = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
        var n = /[0-9]+/.exec(dartResults[i]);
        var b = /S|D|T/.exec(dartResults[i]);
        var o = /[\*\#]/.test(dartResults[i]);

        switch(b[0]) {
            case 'S': b[0] = 1; break;
            case 'D': b[0] = 2; break;
            case 'T': b[0] = 3; break;
        }

        setScore[i] = Math.pow(n[0], b[0]);

        if (o == true) {
            var tmp = /[\*\#]/.exec(dartResults[i]);
            if (tmp == "*") {
                setScore[i] = setScore[i] * 2;
                if ((i-1) >= 0) setScore[i-1] = setScore[i-1] * 2;
            } else if (tmp == "#") {
                setScore[i] = setScore[i] * -1;
            }
        }
    }

    answer = setScore.reduce(function(acc, next){
        return acc + next;
    })

    return answer;
}
