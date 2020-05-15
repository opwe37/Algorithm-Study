function solution(n, weak, dist) {
    var answer = 0;
    answer = checkWeak(n, weak, dist, 0);
    return answer;
}

function checkWeak(n, rWeak, rDist, count) {
    if (rWeak.length == 0) return count;
    if (rWeak.length != 0 && rDist.length == 0) return -1;

    var copyDist = rDist.slice();
    var dist = copyDist.pop();

    var tmp = [];
    for (var i = 0; i < rWeak.length; i++) {
        var rest_weak = rWeak.slice();
        var startPosi = rest_weak[i];
        rest_weak.splice(i, 1);

        var rest = rest_weak.filter(function(e){
            if (e < startPosi) {
                return e + n - startPosi > dist;
            } else {
                return e - startPosi > dist;
            }
        });

        if (tmp.length == 0) tmp.push(rest);
        else if (tmp[0].length == rest.length) {
            tmp.push(rest);
        } else if (tmp[0].length > rest.length) {
            tmp = [];
            tmp.push(rest);
        }
    }

    var results = [];
    for (var i = 0; i < tmp.length; i++) {
        results.push(checkWeak(n, tmp[i], copyDist.slice(), count+1));
    }

    results.filter((item, index) => results.indexOf(item) === index);
    if (results.includes(-1)) {
        results.splice(results.indexOf(-1), 1);
        if (results.length != 0)    return Math.min.apply(null, results);
        else return -1;
    } else {
        return Math.min.apply(null, results);
    }
}
