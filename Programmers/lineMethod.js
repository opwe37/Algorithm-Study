function solution(n, k) {
    var answer = [];

    var arr = new Array(n).fill(0).map((val, i) => val = i+1);
    
    var target = k;
    while (answer.length != n) {
        let pivot = calcFactorial(arr.length -1);

        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            count += pivot;
            if (c >= target) {
                answer.push(arr[i]);
                arr.splice(i, 1);
                target -= (count - pivot);
                break;
            }
        }
    }

    return answer;
}

var factorial = [1, ];
function calcFactorial(n) {
    if (factorial[n]) return factorial[n];

    factorial[n] = calcFactorial(n-1) * n;
    return factorial[n];
}
