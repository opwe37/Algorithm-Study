var findLucky = function(arr) {
    arr.sort((a, b) => b - a);

    let val = arr[0], freq = 1;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] != val) {
            if (freq == val) return val;
            val = arr[i];
            freq = 0;
        }
        freq +=1;
    }
    if (freq == val) return val;
    
    return -1;
};
