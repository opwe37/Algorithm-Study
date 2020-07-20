function solution(arr) {
    var answer = 1;

    const numOfInteger = Math.floor(arr.length/2) + 1;
    const numOfOperator = arr.length - numOfInteger;

    var maxMemory = new Array(numOfInteger).fill(0).map(val => new Array(numOfOperator+1).fill(Number.NEGATIVE_INFINITY));
    var minMemory = new Array(numOfInteger).fill(0).map(val => new Array(numOfOperator+1).fill(Number.POSITIVE_INFINITY));

    var idx = 0;
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) {
            maxMemory[idx][idx] = parseInt(arr[i]);
            minMemory[idx][idx++] = parseInt(arr[i]);
        }
    }

    for (let op = 1; op < numOfOperator+1; op++) {
        for (let i = 0; i < numOfInteger; i++) {
            let j = i + op;
            for (let k = i; k < j; k++) {
                if (arr[(k*2)+1] == '-') {
                    maxMemory[i][j] = maxMemory[i][j] > maxMemory[i][k] - minMemory[k+1][j] ? maxMemory[i][j] : maxMemory[i][k] - minMemory[k+1][j];
                    minMemory[i][j] = minMemory[i][j] < minMemory[i][k] - maxMemory[k+1][j] ? minMemory[i][j] : minMemory[i][k] - maxMemory[k+1][j];
                } else if (arr[(k*2)+1] == '+') {
                    maxMemory[i][j] = maxMemory[i][j] > maxMemory[i][k] + maxMemory[k+1][j] ? maxMemory[i][j] : maxMemory[i][k] + maxMemory[k+1][j];
                    minMemory[i][j] = minMemory[i][j] < minMemory[i][k] + minMemory[k+1][j] ? minMemory[i][j] : minMemory[i][k] + minMemory[k+1][j];
                }
            }
        }
    }
    answer = maxMemory[0][numOfOperator];
    return answer;
}
