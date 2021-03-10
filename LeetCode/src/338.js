var countBits = function(num) {
    if (num == 0 || num == 1){
        return num == 0 ? [0] : [0, 1];
    }
    
    const result = [0, 1];
    i = 2;
    next_i = i * 2;
    while (i <= num) {
        if (i == next_i) {
            next_i = i * 2;
            result.push(1);
        } else {
            result.push(1 + result[i - (next_i/2)])
        }
        
        i += 1;
    }
    return result
};
