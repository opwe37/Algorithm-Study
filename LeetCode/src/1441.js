var buildArray = function(target, n) {
    if (target[target.length-1] > n) return -1;
    
    const result = [];
    let element = 1;
    for (let t of target) {
        while (t >= element) {
            result.push('Push');
            (t != element) && result.push('Pop');
            element += 1;
        }
    }
    return result;
};
