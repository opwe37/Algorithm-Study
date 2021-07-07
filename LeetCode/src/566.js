var matrixReshape = function(mat, r, c) {
    const m = mat.length,
          n = mat[0].length;
    if (m*n != r*c) { return mat; }
    
    let elements = mat.flat()
    
    const ans = Array(r).fill(0).map(val => []);
    for (let i = 0; i < elements.length; i++) {
        ans[Math.floor(i/c)].push(elements[i])
    }
    
    return ans;
};
