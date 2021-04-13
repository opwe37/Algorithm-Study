var maxAbsValExpr = function(arr1, arr2) {
    let answer = 0;
    
    function helper(sign1, sign2) {
        let max = -Infinity;
        let min = Infinity;
        for (let i in arr1) {
            const val = arr1[i] + arr2[i] * sign1 + Number(i) * sign2;
            max = Math.max(max, val);
            min = Math.min(min, val);
        }
        return Math.abs(max - min);
    }
    
    answer = Math.max(helper(1, 1), helper(1, -1), helper(-1, 1), helper(-1, -1));
    return answer;
};
