function solution(p) {
    var answer = '';
    
    if (correctCheck(p)) answer = p;
    else answer = balance2correct(p);

    return answer;
}

function balance2correct(w) {
    if (w.length == 0) return '';
    
    var u = '', 
        v = '';
    for (var i = 0; i < w.length; i+=2) {
        u += w.slice(i, i+2);
        if (balanceCheck(u)) {
            v += w.slice(i+2, w.length);
            break;
        }
    }

    if (correctCheck(u)) return (u + balance2correct(v));
    else {
        u = u.split('');
        u.splice(0, 1);
        u.splice(u.length-1, 1);

        for (var i = 0; i < u.length; i++) {
            if (u[i] == '(') u[i] = ')';
            else if (u[i] == ')') u[i] = '(';
        }

        u = u.join('');
        
        return '(' + balance2correct(v) + ')' + u;
    }
}

function balanceCheck(str) {
    var open = 0,
        close = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == '(') open++;
        else if (str[i] == ')') close++;
    }

    return open == close ? true : false;
}

function correctCheck(str) {
    var check = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == '(') check++;
        else if (str[i] == ')') check--;

        if (check < 0) return false;
    }
    return true;
}
