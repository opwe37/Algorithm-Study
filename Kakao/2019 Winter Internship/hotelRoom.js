// Method 1. Simple Approach (Not Efficiency)
function solution1(k, room_number) {
  var answer = [];
  var room_condition = new Array(k).fill(0);
  for (let wish of room_number) {
    if (room_condition[wish-1] == 0) {
      room_condition[wish-1] = 1;
      answer.push(wish);
      continue;
    } else {
      let emptyRoom = findeEmptyRoom(room_condition.slice(wish)) + wish;
      room_condition[emptyRoom] = 1;
      answer.push(emptyRoom+1);
    }
  }
  return answer;
}

function findeEmptyRoom(rooms) {
  return rooms.findIndex(e => e == 0);
}

// Method 2. Using Map, Recursive Approach
function solution2(k, room_number) {
  var answer = [];

  var assignRoom = new Map();
  function findEmpty(k, room) {
    if (!assignRoom.has(room)) {
      room == k ? assignRoom.set(room, 1) : assignRoom.set(room, room+1);
      return room;
    }
    assignRoom.set(room, findEmpty(k, assignRoom.get(room)));
    return assignRoom.get(room);
  }

  answer = room_number.map(e => findEmpty(k, e));

  return answer;
}
