var getLastMoment = function(n, left, right) {
    const left_max_dist = Math.max.apply(null, left);
    const right_min_dist = Math.min.apply(null, right);
    return left_max_dist > n - right_min_dist ? left_max_dist : n - right_min_dist;
};
