function solution(n, t, m, p) {
    var answer = '';
    answer = n_notationGame(n, t, m, p).toUpperCase();
    return answer;
}

function n_notationGame(n, t, m, p) {
    var game = [0, 1, ''];
    while (t > 0) {
        var number = game[0].toString(n).split('');
        for (var i = 0; i < number.length; i++) {
            if (game[1] == p && t > 0) {
                game[2] = game[2] + number[i];
                t--;
            }
            game[1]++;
            if (game[1] > m) game[1] = 1;
        }
        game[0]++;
    }
    return game[2];
}
