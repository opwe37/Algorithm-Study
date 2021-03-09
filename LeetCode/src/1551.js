var minOperations = function(n) {
    const num_of_half = Math.floor((n-1) / 2);
    const result = (num_of_half + 1) * num_of_half
    return (n & 1) ? result : (result + num_of_half);
};
