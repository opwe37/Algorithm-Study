var candy = function(ratings) {
    const N = ratings.length;
    
    const numOfCandy = new Array(N);
  
    const leftToRight = new Array(N).fill(1);
    const rightToLeft = new Array(N).fill(1);
    
    for (let i = 1; i < N; i++) {
        if (ratings[i] > ratings[i-1]) { leftToRight[i] = leftToRight[i-1]+1; }
    }
    
    for (let i = N-2; i >= 0 ; i--) {
        if (ratings[i+1] < ratings[i]) { rightToLeft[i] = rightToLeft[i+1]+1; }
    }
    
    for (let i = 0; i < N; i++) {
        numOfCandy[i] = Math.max(leftToRight[i], rightToLeft[i]);
    }
    
    return numOfCandy.reduce((a, val) => a + val);
}; 
