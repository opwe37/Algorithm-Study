var minFlipsMonoIncr = function(s) {
    const zeroCount = s.split('').reduce((acc, b) => b == 0 ? acc + 1 : acc, 0);
    const N = s.length;
    
    let answer = zeroCount;
    
    let one2Zero = 0;
    for (let splitPoint = 0; splitPoint < N; splitPoint++) {
        if (s[splitPoint] == '1') { one2Zero += 1; }
        
        const leftZeroCount = splitPoint - one2Zero + 1;
        const zero2One = zeroCount - leftZeroCount;
        
        const totalFlipCount = one2Zero + zero2One;
        
        answer = Math.min(answer, totalFlipCount);
    }
    
    return answer;
};
