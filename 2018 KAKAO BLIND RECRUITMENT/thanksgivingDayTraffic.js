function calcTraffic(chkTime, start, end) {
    var result = 0;

    var chkStart = chkTime.getTime();
    var chkEnd = chkStart + 999;

    for (var i in start) {
        if (!(chkEnd < start[i].getTime() || chkStart > end[i].getTime())) {
            result++;
        }
    }
    
    return result;
}

function solution(lines) {
    var answer = 0;

    var S_end = new Array;
    var S_start = new Array;
    var T = new Array;

    for (var i in lines) {
        var tmp;
        tmp = lines[i].split(' ')
        S_end.push(new Date(tmp[0] + ' ' + tmp[1]));
        T.push(tmp[2].split('s')[0]*1000);
        S_start.push(new Date(S_end[i].getTime() - T[i] + 1));
    }

    var result = new Array();
    for (var j in lines) {
        result.push(calcTraffic(S_start[j], S_start, S_end));
        result.push(calcTraffic(S_end[j], S_start, S_end));
    }

    answer = Math.max.apply(null, result);
        
    return answer;
}
