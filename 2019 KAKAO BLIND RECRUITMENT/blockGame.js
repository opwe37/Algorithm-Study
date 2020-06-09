function solution(board) {
    var answer = 0;

    var N = board[0].length;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (board[j][i] == 0) continue;

            if (isType1(board, i, j)) {
              let chkResult_1 = checkDeletePossible(board, j+1, i+1);
              let chkResult_2 = checkDeletePossible(board, j+1, i+2);
              if (chkResult_1 && chkResult_2) {
                  board[j][i] = 0;
                  board[j+1][i] = 0;
                  board[j+1][i+1] = 0;
                  board[j+1][i+2] = 0;
                  answer++;

                  i = -1;
              }
            } else if (isType2(board, i, j)) {
              let chkResult = checkDeletePossible(board, j, i);
              if (chkResult) {
                board[j][i] = 0;
                board[j][i+1] = 0;
                board[j-1][i+1] = 0;
                board[j-2][i+1] = 0;
                answer++;

                i = -1;
              }
            } else if (isType3(board, i, j)) {
                let chkResult_1 = checkDeletePossible(board, j, i+1);
                let chkResult_2 = checkDeletePossible(board, j, i);
                if (chkResult_1 && chkResult_2) {
                    board[j][i] = 0;
                    board[j][i+1] = 0;
                    board[j][i+2] = 0;
                    board[j-1][i+2] = 0;
                    answer++;

                    i = -1;
                }
            } else if (isType4(board, i, j)) {
                let chkResult = checkDeletePossible(board, j+2, i+1);
                if (chkResult) {
                    board[j][i] = 0;
                    board[j+1][i] = 0;
                    board[j+2][i] = 0;
                    board[j+2][i+1] = 0;
                    answer++;

                    i = -1;
                }
            } else if (isType5(board, i, j)) {
                let chkResult_1 = checkDeletePossible(board, j, i+2);
                let chkResult_2 = checkDeletePossible(board, j, i);
                if (chkResult_1 && chkResult_2) {
                    board[j][i] = 0;
                    board[j][i+1] = 0;
                    board[j][i+2] = 0;
                    board[j-1][i+1] = 0;
                    answer++;

                    i = -1;
                }
            }
        }
    }

    return answer;
}

function checkDeletePossible(board, row, col) {
    for (let i = row-1; i >= 0; i--) {
      if (board[i][col] != 0) return false;
    }
    return true;
}

function isType1(board, x, y) {
  let numOfBlock = board[y][x];
  if (y+1 >= board[0].length || x+2 >= board[0].length) return false;
  return board[y+1][x] == numOfBlock && board[y+1][x+1] == numOfBlock && board[y+1][x+2] == numOfBlock;
}

function isType2(board, x, y) {
  let numOfBlock = board[y][x];
  if (x+1 >= board[0].length || y-2 < 0) return false;
  return board[y][x+1] == numOfBlock && board[y-1][x+1] == numOfBlock && board[y-2][x+1] == numOfBlock;
}

function isType3(board, x, y) {
  let numOfBlock = board[y][x];
  if (x+2 >= board[0].length || y-1 < 0) return false;
  return board[y][x+1] == numOfBlock && board[y][x+2] == numOfBlock && board[y-1][x+2] == numOfBlock;
}

function isType4(board, x, y) {
  let numOfBlock = board[y][x];
  if (x+1 >= board[0].length || y+2 >= board[0].length) return false;
  return board[y+1][x] == numOfBlock && board[y+2][x] == numOfBlock && board[y+2][x+1] == numOfBlock;
}

function isType5(board, x, y) {
  let numOfBlock = board[y][x];
  if (x+2 >= board[0].length || y-1 < 0) return false;
  return board[y][x+1] == numOfBlock && board[y][x+2] == numOfBlock && board[y-1][x+1] == numOfBlock;
}
