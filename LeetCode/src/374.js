var guessNumber = function(n) {
    let low = 0, high = n;
    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        if (guess(mid) == -1) {
            high = mid - 1;
        } else if (guess(mid) == 1) {
            low = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
};
