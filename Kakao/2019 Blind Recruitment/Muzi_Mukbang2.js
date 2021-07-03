function solution(food_times, k) {
  var answer = 0;

  var foods = [];
  for (let i = 0; i < food_times.length; i++) {
    foods.push(new food(i+1, food_times[i]));
  }
  var sortedFoods = sort_time(foods);
  var spendedTime = 0;
  for (let i = 0; i < sortedFoods.length; i++) {
    let time = 0;
    if (i == 0) {
      time = sortedFoods[i].time * food_times.length;
    } else {
      time = (sortedFoods[i].time - sortedFoods[i-1].time) * (food_times.length-i);
    }
    spendedTime = spendedTime + time;
    if (spendedTime > k) {
      var leftedFoods = sortedFoods.slice(i);
      spendedTime -= time;
      break;
    }
  }

  if (leftedFoods == undefined) return -1
  var resortFoods = sort_idx(leftedFoods);
  answer = resortFoods[(k-spendedTime)%resortFoods.length].idx;

  return answer;
}

var food = class {
  constructor(idx, time) {
    this.idx = idx;
    this.time = time;
  }
}

function sort_idx(foods) {
  var result = foods.slice();
  result.sort(function(a, b) {
    if (b.idx < a.idx) return 1;
    else return -1;
  })
  return result;
}

function sort_time(foods) {
  var result = foods.slice();
  result.sort(function(a,b) {
    if (b.time < a.time) return 1;
    else if (b.time == a.time) return 0;
    else return -1;
  })
  return result;
}
