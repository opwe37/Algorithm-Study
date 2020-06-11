var count = 0;
function solution(board, moves) {
    var answer = 0;
    var bucket = [];

    for (let pos of moves) {
      let pickedItem = pickUpItem(board, pos);
      addItemToBucket(bucket, pickedItem);
    }
    answer = count*2;
    return answer;  
}

function addItemToBucket(bucket, item) {
  if (item == 0) return bucket;

  if (bucket.length == 0) {
    bucket.push(item);
  } else {
    let lastIdx = bucket.length - 1;
    if (bucket[lastIdx] == item) {
      bucket.pop();
      count++;
    } else {
      bucket.push(item);
    }
  }
  return bucket;
}

function pickUpItem(board, position) {
  var pickedItem = 0;
  for (let i = 0; i < board.length; i++) {
    if (board[i][position-1] == 0) continue;

    pickedItem = board[i][position-1];
    board[i][position-1] = 0;
    break;
  }
  return pickedItem;
}
