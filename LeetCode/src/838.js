var pushDominoes = function(dominoes) {
    const indexes = [];
    dominoes.split('').forEach((val, idx) => {
        if (val != '.') { indexes.push(idx); }
    });
    
    const ans = Array(dominoes.length).fill('.');
    
    for (let i = 0; i < indexes.length; i++) {
        const cur = dominoes[indexes[i]];
        const next = i+1 < indexes.length ? dominoes[indexes[i+1]] : null;
        ans[indexes[i]] = cur;
      
        if (cur == 'R' && next == 'L') {
            ans[indexes[i+1]] = next;
            let j = indexes[i]+1;
            let k = indexes[i+1]-1;
            
            while (j < k) {
                ans[j] = 'R';
                ans[k] = 'L';
                j += 1;
                k -= 1;
            }
            
            i += 1;
        } else if (cur == 'L') {
            let j = indexes[i] - 1;
            while (j >= 0 && dominoes[j] == '.') { 
              ans[j] = 'L'; 
              j -= 1; 
            }
        } else if (cur == 'R') {
            let j = indexes[i] + 1;
            while (j < dominoes.length && dominoes[j] == '.') { 
              ans[j] = 'R'; 
              j += 1; 
            }
        }
    }
    
    return ans.join('');
};


// ===================================================================
var pushDominoes_calcForce = function(dominoes) {
    const N = dominoes.length;
    const LForces = Array(N);
    const RForces = Array(N);
    
    let force = dominoes[N-1] == 'L' ? (-1 * N) : 0;
    for (let i = N-1; i >= 0; i--) {
        if (dominoes[i] == 'L') {
            force = (-1 * N);
        } else if (dominoes[i] == 'R') {
            force = 0;
        }
        LForces[i] = force;
        force = Math.min(0, force + 1);
    }
    
    force = dominoes[0] == 'R' ? N : 0;
    for (let i = 0; i < N; i++) {
        if (dominoes[i] == 'R') {
            force = N;
        } else if (dominoes[i] == 'L') {
            force = 0;
        }
        RForces[i] = force;
        force = Math.max(0, force - 1);
    }
    
    let ans = '';
    for (let i = 0; i < N; i++) {
        const sum = LForces[i] + RForces[i];
        if (sum > 0) { ans += 'R'; }
        else if (sum < 0) { ans += 'L'; }
        else { ans += '.'; }
    }
    return ans;
};
