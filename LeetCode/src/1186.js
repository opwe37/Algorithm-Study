/**
 * @param {number[]} arr
 * @return {number}
 */
var maximumSum = function(arr) {
    if (arr.length == 0) return 0;

    const noDeletion = Array(arr.length);
    noDeletion[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        noDeletion[i] = Math.max(arr[i], arr[i] + noDeletion[i-1])
    }
    
    const oneDeletion = Array(arr.length);
    oneDeletion[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
        oneDeletion[i] = Math.max(noDeletion[i], noDeletion[i-1], arr[i] + oneDeletion[i-1])
    }
    
    
    return Math.max.apply(null, oneDeletion);
};
