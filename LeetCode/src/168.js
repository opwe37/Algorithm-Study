var convertToTitle = function(columnNumber) {
    let answer = '';
    let val = columnNumber - 1;
    while (val >= 0) {
        answer = String.fromCharCode((val % 26) + 65) + answer;
        val = Math.floor(val / 26) - 1;
    }
    return answer;
};
