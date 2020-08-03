function solution(matrix_size) {
    var answer = 0;

    const n = matrix_sixe.length;
    var m = new Array(n+1).fill().map(() => new Array(n+1).fill(0));
    var d = [];
    for (let i in matrix_size) {
        if (i == 0) {
            d.push(matrix_size[i][0]);
            d.push(matrix_size[i][1]);
            continue;
        }

        d.push(matrix_size[i][1]);
    }
    
    for (let o = 1; o < n+1; o++) {
        for (let i = 1; i < n+1-o; i++) {
            let j = i + o;
            m[i][j] = Infinity;
            for (let k = i; k < j; k++) {
                m[i][j] = Math.min(m[i][j], m[i][k]+m[k+1][j]+(d[i-1]*d[k]*d[j]));
            }
        }
    }
    return answer = m[1][n];
}
