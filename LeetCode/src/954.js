var canReorderDoubled = function(arr) {
    const numCounter = {};
    arr.forEach(num => {
        if (!numCounter[num]) {
            numCounter[num] = 0;
        }
        numCounter[num] += 1;
    });
    
    const sortednum = new Set(arr.sort((a, b) => a - b));
    for (let num of sortednum) {
        if (!numCounter[num]) { continue; }
        
        const isMinus = num < 0;
        if (isMinus && num % 2) { return false; }
        
        let next = isMinus ? num / 2 : num * 2;
        if (!numCounter[next]) { return false; }
        
        numCounter[next] -= numCounter[num];
        if (numCounter[next] < 0) { return false; }
        
        numCounter[num] = 0;
    }
    
    return true;
};
