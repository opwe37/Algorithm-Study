var findMinMoves = function(machines) {
    const _sum = sum(machines);
    const [q, d] = [_sum / machines.length, _sum % machines.length];
    
    if (d) return -1;
    
    let result = 0,
        acc = 0;
    machines.forEach(val => {
        const sub = val - q;
        acc += sub;
        result = Math.max(result, Math.abs(acc), sub);
    });
    
    return result;
};

var sum = function(arr) {
    return arr.reduce((a, b) => a + b);
}
