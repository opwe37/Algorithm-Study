// 정확도 테스트 통과 / 효율성 테스트 미통과(시간초과)

function solution(food_times, k) {
  var answer = 0;

  var food_idx = 0;
  for (let i = 0; i < k; i++) {
    // currnet food
    if (food_times[food_idx] == 0) {
      for (let j = 0; j < k; j++) {
        food_idx++;
        if (food_idx >= food_times.length) food_idx = 0;
        if (food_times[food_idx] != 0) break;

        if (j == k-1) return -1;
      }
    }
    food_times[food_idx]--;

    // next food
    food_idx++;
    if (food_idx >= food_times.length) food_idx = 0;
  }

  if (food_times[food_idx] == 0) {
    for (let j = 0; j < k; j++) {
        food_idx++;
        if (food_idx >= food_times.length) food_idx = 0;
        if (food_times[food_idx] != 0) break;

        if (j == k-1) return -1;
      }
  }
  answer = food_idx + 1;

  return answer;
}
