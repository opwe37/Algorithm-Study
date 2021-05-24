var racecar = function(target) {
    let queue = [[0, 1, 0]];
    while (true) {
        const [pos, speed, ins] = queue.shift();
        if (pos == target) return ins;
        
        if (pos+speed > target && speed > 0 || pos+speed < target && speed < 0) {
            queue.push([pos, speed > 0 ? -1 : 1, ins+1]);
        }
        queue.push([pos+speed, speed*2, ins+1]);
    }
    
    return -1;
};
