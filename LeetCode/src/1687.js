var boxDelivering = function(boxes, portsCount, maxBoxes, maxWeight) {    
    let trip_count_dp = new Array(boxes.length).fill(Infinity);
    trip_count_dp[0] = 0;
    
    let ship_weight = 0,
        ship_boxes = 0,
        diff = 0,
        start = 0;
    for (let i = 0; i < boxes.length; i++) {
        ship_weight += boxes[i][1];
        ship_boxes += 1;
        if (i > 0 && boxes[i][0] != boxes[i-1][0])  diff += 1;
        
        while (start < i && (ship_weight > maxWeight || ship_boxes > maxBoxes || trip_count_dp[start] == trip_count_dp[start-1])) {
            ship_weight -= boxes[start][1];
            ship_boxes -= 1;
            if (boxes[start][0] != boxes[start+1][0])  diff -= 1;
            start += 1
        }
        
        trip_count_dp[i] = start == 0 ? diff + 2 : trip_count_dp[start-1] + diff + 2;
    }
    
    return trip_count_dp[boxes.length-1];
};
