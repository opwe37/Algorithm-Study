var rectangleArea = function(rectangles) {
    const events = [];
    for (const [x1, y1, x2, y2] of rectangles) {
        events.push([x1, 0, y1, y2]);
        events.push([x2, 1, y1, y2]);
    }
    
    events.sort((a, b) => a[0] - b[0]);
    
    let ans = 0n;
  
    const active = [];
    let prevX = events[0][0];
    for (const [x, type, y1, y2] of events) {
        let topY = 0;
        let recCount = 0n;
        for (const [ay1, ay2] of active) {
            topY = Math.max(topY, ay1);
            recCount += BigInt(Math.max(ay2 - topY, 0));
            topY = Math.max(topY, ay2);
        }
        
        ans += recCount * BigInt(x - prevX); // 동일 위치에 대한 값은 계산 안되도록
        
        if (type) {
            for (let i = 0; i < active.length; i++) {
                if (active[i][0] == y1 && active[i][1] == y2) { active.splice(i, 1); break; }
            }
        } else {
            active.push([y1, y2]);
            active.sort((a, b) => a[0] - b[0]);
        }
        
        prevX = x;
    }
    
    return Number(ans % 1000000007n);
};
