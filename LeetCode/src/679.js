var judgePoint24 = function(cards) {
    const perms = getPerms(cards);
    
    for (let perm of perms) {
        const results = calcAllCase(perm, 0, 3);
        for (let res of results) {
            if (Math.abs(24 - res) < 10e-14) { return true; }
        }
    }
    return false;
};

var getPerms = function(list) {
    if (list.length == 0) {
        return [[]];
    }
    
    const ans = [];
    
    for (let i = 0; i < list.length; i++) {
        const before = list.slice(0, i);
        const after = list.slice(i+1);
        const perms = getPerms(before.concat(after));
        for (let perm of perms) {
            ans.push([list[i], ...perm]);
        }
    }
    
    return ans;
}

var calcAllCase = function(nums, left, right) {
    if (left == right) { return [nums[left]]; }
    
    const ops = (a, b) => [a+b, a-b, a*b, b ? a/b : Infinity];
    
    const ans = [];
    for (let pivot = left; pivot < right; pivot++) {
        const lefts = calcAllCase(nums, left, pivot);
        const rights = calcAllCase(nums, pivot+1, right);
        for (let l of lefts) {
            for (let r of rights) {
                ans.push(...ops(l, r));
            }
        }
    }
    return ans;
}
