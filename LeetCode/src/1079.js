var numTilePossibilities = function(tiles) {
    const letters = new Map();
    for (let i = 0; i < tiles.length; i++) {
        if (!letters.has(tiles[i])) {
            letters.set(tiles[i], 0);
        }
        letters.set(tiles[i], letters.get(tiles[i]) + 1);
    }
    
    let ans = 0;
    for (let i = 1; i <= tiles.length; i++) {
        ans += getPerms(letters, '', i);
    }
    
    return ans;
};

function getPerms(map, prefix, remaining) {
    if (remaining == 0) {
        return 1;
    }
    
    let count = 0;
    for (let [key, val] of map) {
        if (val > 0) {
            map.set(key, val-1);
            count += getPerms(map, prefix + key, remaining-1);
            map.set(key, val);
        }
    }
    return count;
}
