var slowestKey = function(releaseTimes, keysPressed) {
    let maxDuration = releaseTimes[0];
    let index = 0;
    
    for (let i = 1; i < releaseTimes.length; i++) {
        const duration = releaseTimes[i] - releaseTimes[i-1];
        if (maxDuration < duration) {
            maxDuration = duration;
            index = i;
        } else if (maxDuration == duration && keysPressed[index] < keysPressed[i]) {
            index = i;
        }
    }
    
    return keysPressed[index];
};
