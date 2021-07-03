function solution(n, weak, dist) {
    var answer = 0;
    dist.sort(function(a, b) {
        return a - b;
    });
    answer = checkWeak(n, weak, dist, 0);
    return answer;
}

function checkWeak(n, rWeak, rDist, count) {
    if (rWeak.length == 0) return count;
    if (rWeak.length != 0 && rDist.length == 0) return -1;

    var copyDist = rDist.slice();
    var dist = copyDist.pop();

    var results = [];
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

        results.push(checkWeak(n, rest, copyDist, count+1));
    }

    results = results.filter((item, index) => results.indexOf(item) === index);
    if (results.includes(-1)) {
        results.splice(results.indexOf(-1), 1);
        if (results.length != 0)    return Math.min.apply(null, results);
        else return -1;
    } else {
        return Math.min.apply(null, results);
    }
}
