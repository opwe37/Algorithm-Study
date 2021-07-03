function solution(N) {
    var answer = 0;
    return answer = calcTileRound(N);
}

var dp_round = [0, 4, 6];
function calcTileRound(n) {
    if (n <= 2) return dp_round[n]; 
    if (dp_round[n] != undefined) return dp_round[n];
    
    dp_round[n] = calcTileRound(n-1) + calcTileRound(n-2);
    return dp_round[n]; 
}
