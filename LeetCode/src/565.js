var arrayNesting = function(nums) {
  let answer = 0;
  
  const visited = Array(nums.length).fill(false);
  for (let i = 0; i < nums.length; i++) {
    if (visited[i]) { continue; }

    visited[i] = true;
    let next = nums[i];
    let count = 1;
    while (!visited[next]) {
        count += 1;
        visited[next] = true;
        next = nums[next];
    }
    answer = Math.max(answer, count);
  }

  return answer;
};
