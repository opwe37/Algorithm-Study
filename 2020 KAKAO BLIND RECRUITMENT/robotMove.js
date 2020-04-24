function solution(board) {
    var answer = 0;
    answer = BFS(board);
    return answer;
}

var MuziRobot = class {
    constructor() {
        this.dir = 0;
        this.loc = {
            x: 1,
            y: 1
        }
    }

    dirUpdate(newDir) { this.dir = newDir; }
    locUpdate(x, y) { this.loc.x = x; this.loc.y = y; }
}

var move_row = [-1, 1, 0, 0];
var move_col = [0, 0, -1, 1];

var turn_row = [[-1, 0, -1, 0], [1, 1, 0, 0]];
var turn_col = [[0, 0, 1, 1], [-1, 0, -1, 0]];

function isTurn(board, s, i) {
    var location = [s.loc.x-1, s.loc.y-1];
    var board_s;
    if (s.dir == 0) {
        switch(i) {
            case 0:
                board_s = board[location[0]-1][location[1]+1];
                break;
            case 1:
                board_s = board[location[0]+1][location[1]+1];
                break;
            case 2:
                board_s = board[location[0]-1][location[1]];
                break;
            case 3:
                board_s = board[location[0]+1][location[1]];
                break;
        }
    } else if (s.dir == 1) {
        switch(i) {
            case 0:
                board_s = board[location[0]][location[1]-1];
                break;
            case 1:
                board_s = board[location[0]][location[1]+1];
                break;
            case 2:
                board_s = board[location[0]+1][location[1]-1];
                break;
            case 3:
                board_s = board[location[0]+1][location[1]+1];
                break;
        }
    }

    if (board_s == 1) return false;
    return true;
}

function isMove(board, s) {
    var boardLength = board.length;

    var loc1 = [s.loc.x, s.loc.y];
    if (loc1[0] <= 0 || loc1[0] > boardLength || loc1[1] <= 0 || loc1[1] > boardLength) return false;

    var loc2;
    if (s.dir == 0) {
        loc2 = [loc1[0], loc1[1]+1];
    } else {
        loc2 = [loc1[0]+1, loc1[1]];
    }
    if (loc2[0] <= 0 || loc2[0] > boardLength || loc2[1] <= 0 || loc2[1] > boardLength) return false;

    var board1 = board[loc1[0]-1][loc1[1]-1];
    var board2 = board[loc2[0]-1][loc2[1]-1];
    if (board1 == 1 || board2 == 1) return false;

    return true;
}

function checkEnd(robot, board) {
    var position;
    if (robot.dir == 0) {
        position = [robot.loc.x, robot.loc.y+1];
    } else {
        position = [robot.loc.x+1, robot.loc.y];
    }

    if (board.length == position[0] && board.length == position[1]) return true;
    return false;
}

function BFS(board) {
    var fifo_arr = new Array();
    fifo_arr.push([new MuziRobot(), 0]);

    var dp_memory = new Map();

    while(1) {
        if (fifo_arr.length == 0) break;

        var target = fifo_arr.shift();
        if (checkEnd(target[0], board)) return target[1];

        for (var i = 0; i < 4; i++) {
            var nextLoc = new MuziRobot();
            var nextRow = target[0].loc.x + move_row[i];
            var nextCol = target[0].loc.y + move_col[i];

            nextLoc.dirUpdate(target[0].dir);
            nextLoc.locUpdate(nextRow, nextCol);

            if (isMove(board, nextLoc)) {
                var tmp = dp_memory.get(JSON.stringify(nextLoc))
                if (tmp == undefined) {
                    fifo_arr.push([nextLoc, target[1]+1]);
                    dp_memory.set(JSON.stringify(nextLoc), target[1]+1);
                }
            }
        }

        for (var i = 0; i < 4; i++) {
            var nextLoc = new MuziRobot();
            var nextDir = target[0].dir ^ 1;
            var nextRow = target[0].loc.x + turn_row[target[0].dir][i];
            var nextCol = target[0].loc.y + turn_col[target[0].dir][i];

            nextLoc.dirUpdate(nextDir);
            nextLoc.locUpdate(nextRow, nextCol);
            
            if (isMove(board, nextLoc)) {
                if (!isTurn(board, target[0], i)) continue;
                var tmp = dp_memory.get(JSON.stringify(nextLoc))

                if (tmp == undefined) {
                    fifo_arr.push([nextLoc, target[1]+1]);
                    dp_memory.set(JSON.stringify(nextLoc), target[1]+1);
                }
            }
        }
    }
}
