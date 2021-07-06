var minSetSize = function(arr) {
    const N = arr.length;
    
    const freq = new Map();
    for (let val of arr) {
        if (!freq.has(val)) { freq.set(val, 0); }
        freq.set(val, freq.get(val)+1);
    }
    
    const list = Array.from(freq.entries());
    list.sort((a, b) => b[1] - a[1]);
    
    let size = N;
    let i = 0;
    while (size > (N/2)) {
        size -= list[i][1];
        i += 1;
    }
    
    return i;
};
