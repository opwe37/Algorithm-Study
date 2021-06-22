var getMaximumConsecutive = function(coins) {
    coins = coins.sort((a, b) => a - b);
    
    let left = 0, right = 0;
    for (let i = 0; i < coins.length; i++) {
        if (coins[i] <= right+1) {
            right += coins[i];
        } else {
            break;
        }
    }
    
    return right+1;
};
