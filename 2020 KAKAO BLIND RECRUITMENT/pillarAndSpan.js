function solution(n, build_frame) {
    var answer = [];

    for (var i = 0; i < build_frame.length; i++) {
        if (build_frame[i][3] == 1) {
            if (isPossible(answer, build_frame[i])) {
                answer.push([build_frame[i][0], build_frame[i][1], build_frame[i][2]]);
            }
        }
        else {
            if (removeArchitect(answer, build_frame[i])) {
                console.log(build_frame[i])
                var index;
                for (var j = 0; j < answer.length; j++) {
                    if (answer[j][0] == build_frame[i][0] && answer[j][1] == build_frame[i][1] && answer[j][2] == build_frame[i][2]) {
                        index = j; break;
                    }
                }
                answer.splice(index, 1);
            }
        }
    }

    answer.sort(function(a, b) {
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
    })

    return answer;
}

function isPossible(architecture, build_frame) {
    var frameType = build_frame[2];
    var p = { x: build_frame[0],
                    y: build_frame[1] };

    var possible = false;
    if (frameType == 0) {
        // 기둥
        if (p.y == 0) possible = true;
        if (!possible) {
            var con1 = architecture.find(function(e){
                if (e[0] == p.x && e[1] == (p.y-1) && e[2] == 0) return e;
            });
            var con2_1 = architecture.find(function(e){
                if (e[0] == (p.x-1) && e[1] == p.y && e[2] == 1) return e;
            });
            var con2_2 = architecture.find(function(e){
                if (e[0] == p.x && e[1] == p.y && e[2] == 1) return e;
            });

            if (con1 != undefined) possible = true;
            else if (con2_1 != undefined || con2_2 != undefined) possible = true;
        }
    } else if (frameType == 1) {
        if (p.y != 0) {
            var con1_1 = architecture.find(function(e) {
                if (e[0] == p.x && e[1] == (p.y-1) && e[2] == 0) return e;
            });
            var con1_2 = architecture.find(function(e) {
                if (e[0] == (p.x+1) && e[1] == (p.y-1) && e[2] == 0) return e;
            });
    
            var con2_1 = architecture.find(function(e){
                if (e[0] == (p.x-1) && e[1] == p.y && e[2] == 1) return e;
            });
            var con2_2 = architecture.find(function(e){
                if (e[0] == (p.x+1) && e[1] == p.y && e[2] == 1) return e;
            });
    
            if (con1_1 != undefined || con1_2 != undefined) possible = true;
            else if (con2_1 != undefined && con2_2 != undefined) possible = true;
        }
    }
    return possible;
}

function removeArchitect(map, build_frame){
    var frameType = build_frame[2];
    var p = { x: build_frame[0],
              y: build_frame[1] };
    
    var possible = true;
    var target = map.find(function(e){
        if (e[0] == p.x && e[1] == p.y && e[2] == frameType) return e;
    });

    var tmpMap = JSON.parse(JSON.stringify(map));
    var index;
    for (var i = 0; i < map.length; i++) {
        if (map[i][0] == p.x && map[i][1] == p.y && map[i][2] == frameType) index = i; break;
    }
    tmpMap.splice(index, 1);
    if (frameType == 0) {
        var connect = new Array(3);
        connect[0] = tmpMap.find(function(e){
            if (e[0] == p.x && e[1] == (p.y+1) && e[2] == 0) return e;
        });
        connect[1] = tmpMap.find(function(e){
            if (e[0] == p.x && e[1] == (p.y+1) && e[2] == 1) return e;
        });
        connect[2] = tmpMap.find(function(e){
            if (e[0] == (p.x-1) && e[1] == (p.y+1) && e[2] == 1) return e;
        });
        for (var i = 0; i < 3; i++) {
            if (connect[i] != undefined) {
                if (!isPossible(tmpMap, connect[i])) {
                    possible = false;
                    break;
                }
            }
        }
    } else if (frameType == 1) {
        var connect = new Array(4);
        connect[0] = tmpMap.find(function(e){
            if (e[0] == (p.x-1) && e[1] == p.y && e[2] == 1) return e;
        });
        connect[1] = tmpMap.find(function(e){
            if (e[0] == p.x && e[1] == p.y && e[2] == 0) return e;
        });
        connect[2] = tmpMap.find(function(e){
            if (e[0] == (p.x+1) && e[1] == p.y && e[2] == 0) return e;
        });
        connect[3] = tmpMap.find(function(e){
            if (e[0] == (p.x+1) && e[1] == p.y && e[2] == 1) return e;
        });
        for (var i = 0; i < 4; i++) {
            if (connect[i] != undefined) {
                if (!isPossible(tmpMap, connect[i])) {
                    possible = false;
                    break;
                }
            }
        }
    }

    return possible;
}
