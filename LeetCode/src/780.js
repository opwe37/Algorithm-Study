var reachingPoints = function(sx, sy, tx, ty) {
    
    while (tx && ty && (tx > sx || ty > sy)) {
        if (sx == tx && (ty - sy) % sx == 0) return true;
        if (sy == ty && (tx - sx) % sy == 0) return true;
        
        if (ty > tx) {
            ty %= tx;
        } else {
            tx %= ty;
        }
    }
    
    return false;
};
