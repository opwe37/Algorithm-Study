function solution(begin, end) {
    var answer = [];

    for (let i = begin; i <= end; i++) {
        answer.push(findBlockNumber(i));
    }

    return answer;
}

function findBlockNumber(val) {
    if (val == 1) return 0;
    for (let i = 2; i * i <= val; i++) {
        if (val % i == 0) {
            if (Math.floor(val/i) <= 10000000)
                return Math.floor(val/i);
            else continue;
        }
    }
    return 1;
}
