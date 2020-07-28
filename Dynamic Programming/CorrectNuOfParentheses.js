function solution(n) {
    var answer = 0;
    answer = calcCatalanNumber(n);
    return answer;
}

var dp = [0, 1];
function calcCatalanNumber(n){
    return Math.ceil(calcFactorial(2*n)/(calcFactorial(n+1)*calcFactorial(n)))
}

function calcFactorial(n) {
    if (dp[n]) return dp[n];
    
    dp[n] = calcFactorial(n-1) * n;
    return dp[n];
}
