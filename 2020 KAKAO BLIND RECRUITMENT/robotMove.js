/*  로봇이 (N, N)까지 이동할 수 있는 최소시간
    - 필드 상태(board) : 0(이동 가능), 1(이동 불가능)로 이루어짐
    - 로봇 이동 가능 경로 : 상하좌우 + 회전(90도)
    - 회전 가능 상태 : 회전하는 방향에 벽(1)이 없어야 함
    - 로봇의 한 움직임 마다 1초 경과
*/

function solution(board) {
    var answer = 0;

    var robot = [[1, 1],[1, 2]];

    return answer;
}

/* dir : 0 or 1 (0 = horizontal / 1 = vertical)
   position of Robot = p 좌표를 기준으로 if dir == 0 : 우측으로 1만큼 공간 차지
                                        dir == 1 : 아래쪽으로 1만큼 공간 차지
*/
var Robot = class {
    constructor() {
        this.dir = 0;
        this.p = [1, 1];
    }
}

var move_row = [1, -1, 0, 0]; // up, down, left, right
var move_col = [0, 0, -1, 1];

var turn_row = [[0, -1, -1, 0], [0, 1, 0, 1]]; // turn[0] dir == horizontal / turn[1] dir == vertical
var turn_col = [[0, 0, 1, 1], [0, -1, 0, 0]];

function bfs(robot, board) {
    var fifo = [[robot, 0]];     // bfs를 위한 저장 공간
    var memory = [[robot, 0]];   // 해당 위치에 간적이 있었는지 체크 용도

    while(1) {
        if (fifo.length == 0) break;

        var position = fifo.shift();
        // position 에서 가능한 움직임 찾아서 fifo에 저장
        var nextPosition;
        // memory에는 저장
        var check = memory.find(function (e) {
            if (JSON.stringify(e[0]) == JSON.stringify(nextPosition[0])) return e;
        });
        if (check == undefined) {
            fifo.push([nextPosition[0], nextPosition[1]+1]);
            memory.push([nextPosition[0], nextPosition[1]+1]);
        }
    }
}
