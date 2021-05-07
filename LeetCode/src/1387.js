var getKth_1 = function(lo, hi, k) {
    function power(n) {
        let steps = 0;
        let tmp_n = n;
        while (tmp_n != 1) {
            if (tmp_n & 1) {
                tmp_n = 3 * tmp_n + 1;
            } else {
                tmp_n = tmp_n / 2;
            }
            steps += 1;
        }
        return steps;
    }
    
    const arr = [];
    for (let i = lo; i <= hi; i++) {
        arr.push({val: i, power: power(i)});
    }
    arr.sort((a, b) => a.power - b.power)
    return arr[k-1].val
};

var getKth_2 = function(lo, hi, k) {
    let m = new Map();
    m.set(1, 0)
    function power(n) {
        if (m.has(n)) return m.get(n);

        let steps = 1;
        if (n & 1) {
            steps += power(3 * n + 1);
        } else {
            steps += power(n / 2);
        }
        m.set(n, steps);
        return steps;
    }
    
    const arr = [];
    for (let i = lo; i <= hi; i++) {
        arr.push({val: i, power: power(i)});
    }
    arr.sort((a, b) => a.power - b.power)
    return arr[k-1].val
};
