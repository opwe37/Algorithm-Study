var numberOfBoomerangs = function(points) {
    let ans = 0;
   
    for (let i = 0; i < points.length; i++) {
        const [x, y] = points[i];
        const dist = new Map();
        
        for (let j = 0; j < points.length; j++) {
            if (i === j) { continue; }
            
            const d = Math.sqrt(Math.pow((x-points[j][0]), 2) + Math.pow((y-points[j][1]), 2));
            if (!dist.has(d)) { dist.set(d, 0); }
            
            let curCount = dist.get(d);
            dist.set(d, curCount + 1);
        }
        
        for (let val of dist.values()) {
            if (val < 1) { continue; }
            ans += val * (val-1);
        }
    }
    
    return ans;
};
