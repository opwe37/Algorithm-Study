function solution(stones, k) {
    var answer = 0;
    answer = BinarySearch(stones, k, 1, 2000000000);
    return answer;  
}

function BinarySearch(list, k, min, max) {
  if (min == max) return min;

  var mid = Math.floor((min+max)/2);
  var count = 0;
  for (let l of list) {
    if (count == k) break;
    let val = l - mid;
    val <= 0 ? count++ : count=0;
  }

  if (count == k) {
    return BinarySearch(list, k, min, mid)
  } else {
    return BinarySearch(list, k, mid+1, max)
  }
}

// using - sliding window method : efficiency testcase 13 not pass
// function solution(stones, k) {
//   var answer = Infinity;
//   var deque = [];
//   for (let i = 0; i < stones.length; i++) {
//     if (deque.length == 0) {deque.push(i); continue;}
//     if (i >= k) {
//       if (answer > stones[deque[0]]) answer = stones[deque[0]];
//       while (deque.length != 0 && deque[0] <= i-k) {
//         deque.shift();
//       }
//     }
//     while(deque.length != 0 && stones[i] >= stones[deque[deque.length-1]]) {
//       deque.pop();
//     }
//     deque.push(i);
//   }
//   if (answer > stones[deque[0]]) answer = stones[deque[0]];
//   return answer;
// }
