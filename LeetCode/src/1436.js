var destCity = function(paths) {
    const city = new Map()
    paths.forEach(path => {
        if (!city.has(path[0])) {
            city.set(path[0], 0);
        }
        
        if (!city.has(path[1])) {
            city.set(path[1], 0);
        }
        
        city.set(path[0], 1)
    });
    
    let result = ''
    for (let [key, val] of city.entries()) {
        if (val != 0) continue;
        
        result = key;
        break;
    }
    return result;
};
