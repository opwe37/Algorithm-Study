function solution(n, build_frame) {
    var answer = [];

    var architect = [];
    var possible;
    for (var i = 0; i < build_frame.length; i++) {
        if (build_frame[i][3] == 0) {
            var tmp = [build_frame[i][0], build_frame[i][1], build_frame[i][2]];
            for (var j = 0; j < architect.length; j++) {
                if (architect[j][0] == tmp[0] && architect[j][1] == tmp[1] && architect[j][2] == tmp[2]) {
                    architect.splice(j, 1)
                    break;
                }
            }
            possible = isPossible(architect);
            if (!possible)  {
                architect.push(tmp);
            }
        } else if (build_frame[i][3] == 1) {
            if (build_frame[i][2] == 0) {
                possible = conOfPillar(architect, build_frame[i][0], build_frame[i][1]);
            } else if (build_frame[i][2] == 1) {
                possible = conOfSpan(architect, build_frame[i][0], build_frame[i][1]);
            }
            if (possible) architect.push([build_frame[i][0], build_frame[i][1], build_frame[i][2]]);
        }
    }

    architect.sort(function(a, b) {
        if (a[0] > b[0]) {
            return 1;
        }
        else if (a[0] < b[0]) {
            return -1;
        } 
        else {
            if (a[1] > b[1]) {
                return 1;
            }
            else if (a[1] < b[1]) {
                return -1;
            } 
            else {
                if (a[2] > b[2]) return 1;
                else return -1;
            }
        }
    });

    answer = architect;

    return answer;
}

function isPossible(architect) {
    var result;
    for (var i = 0; i < architect.length; i++) {
        if (architect[i][2] == 0) result = conOfPillar(architect, architect[i][0], architect[i][1]);
        else if (architect[i][2] == 1) result = conOfSpan(architect, architect[i][0], architect[i][1]);

        if (!result) return false;
    }
    return true;
}

function conOfPillar(architect, x, y) {
    if (y == 0) return true;

    var con;
    con = architect.find(function (item) {
        if (item[0] == x && item[1] == (y-1) && item[2] == 0) return item;
    });
    if (con != undefined) return true;

    con = architect.find(function (item) {
        if (item[0] == (x-1) && item[1] == y && item[2] == 1) return item;
    });
    if (con != undefined) return true;

    con = architect.find(function (item) {
        if (item[0] == x && item[1] == y && item[2] == 1) return item;
    });
    if (con != undefined) return true;

    return false;
}

function conOfSpan(architect, x, y) {
    var con;
    con = architect.find(function (item) {
        if (item[0] == x && item[1] == (y-1) && item[2] == 0) return item;
    });
    if (con != undefined) return true;

    con = architect.find(function (item) {
        if (item[0] == (x+1) && item[1] == (y-1) && item[2] == 0) return item;
    });
    if (con != undefined) return true;

    var left, right;
    left = architect.find(function (item){
        if (item[0] == (x-1) && item[1] == y && item[2] == 1) return item;
    });
    right = architect.find(function (item){
        if (item[0] == (x+1) && item[1] == y && item[2] == 1) return item;
    });
    if (left != undefined && right != undefined) return true;

    return false;
}
