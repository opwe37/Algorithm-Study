var minCostClimbingStairs = function(cost) {
    cost[1] = Math.min(cost[0]+cost[1], cost[1]);
    
    for (let i = 2; i < cost.length; i++) {
        cost[i] = Math.min(cost[i-1], cost[i-2]) + cost[i];
    }
    
    return Math.min(cost[cost.length - 1], cost[cost.length - 2]);
};
