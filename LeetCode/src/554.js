var leastBricks = function(wall) {
    const map = {};
    
    wall.forEach(row => {
        row.slice(0, -1).reduce((width, brick) => {
            const length = width + brick;
            map[length] = map[length] + 1 || 1;
            
            return length;
        }, 0);
    })
    
    return wall.length - Math.max(...Object.values(map), 0);
};
