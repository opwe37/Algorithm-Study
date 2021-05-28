var videoStitching = function(clips, time) {
    clips.sort((a, b) => a[0] - b[0]);
    
    let ans = 0;
    let curr = [0, 0];
    let tmp = [0, 0];
    for (let [start, end] of clips) {
        if (start > curr[1]) {
            curr = tmp.slice();
            ans += 1;
        }
        
        if (start > curr[1]) { return -1; }
        
        if (end > tmp[1]) {
            tmp = [start, end];
            if (end >= time) { return ans += 1;}
        }
    }
    return -1;
};
