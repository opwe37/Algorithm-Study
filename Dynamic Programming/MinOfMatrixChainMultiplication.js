function solution(matrix_size) {
    var answer = 0;

    const n = matrix_sixe.length;
    var m = new Array(n+1).fill().map(() => new Array(n+1).fill(0));
    var dims = [];
    for (let i in matrix_size) {
        if (i == 0) {
            dims.push(matrix_size[i][0]);
            dims.push(matrix_size[i][1]);
            continue;
        }

        dims.push(matrix_size[i][1]);
    }
    
    for (let len = 2; len < n+1; len++) {
        for (let i = 1; i <= n+1-len; i++) {
            let j = i + len -1;
            m[i][j] = Infinity;
            for (let k = i; k < j; k++) {
                m[i][j] = Math.min(m[i][j], m[i][k]+m[k+1][j]+(dims[i-1]*dims[k]*dims[j]));
            }
        }
    }
    return answer = m[1][n];
}
