// Using Parmetric Search
function solution(n, cores) {
    var answer = 0;

    if (cores.length >= n) {
      return n;
    }
    
    const minTime = Math.min.apply(null, cores);
    var left = Math.floor((minTime * n) / cores.length);
      , right = minTime * n;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        let numberOfCoverdJob = 0;
        let availableCore = 0;
        for (let core of cores) {
            numberOfCoverdJob += (Math.floor(mid/core)+1);
            if (mid % core == 0) {
                numberOfCoverdJob--;
                availableCore++;
            }
        }

        if (numberOfCoverdJob >= n) {
            right = mid - 1;
        } else if (numberOfCoverdJob + availableCore < n) {
            left = mid + 1;
        } else {
            for (let i = 0; i < cores.length; i++) {
                if (mid % cores[i] == 0) numberOfCoverdJob++;
                if (numberOfCoverdJob == n) return i+1;
            }
        }
    }

    return answer;
}

// Simply & Intutive Approach 
// But, Inefficiency Performance!!!
function simply_solution(n, cores) {
     var answer = 0;

     var core = [];
     for (let i of cores) {
         core.push({precessTime: i, t: i});
     }

     while (n != 0) {
         for (let i = 0; i < core.length; i++) {
             if (core[i].t == core[i].precessTime) {
                 n--;
                 core[i].t = 0;
                 answer = i+1;
                 if (n == 0) break;
             }
             core[i].t = core[i].t + 1;
         }
     }

     return answer;
}
