var bestRotation = function(nums) {
    const N = nums.length;
    const bad = new Array(N).fill(0);
    for (let i = 0; i < N; i++) {
        const left = (i - nums[i] + 1 + N) % N, // 인덱스를 A[i-1]로 만드는 k
              right = (i + 1) % N; // 인덱스 N-1로 만드는 k 값
        bad[left] -= 1;
        bad[right] += 1;
        if (left > right) {
            bad[0] -= 1;
        }
    }
    
    let best = N-bad[0];
    let answer = 0, cur = best;
    for (let i = 1; i < N; i++) {
        cur += bad[i];
        if (best < cur) {
            answer = i;
            best = cur;
        }
    }
    
    return answer;
};
