var getRow = function(rowIndex) {
    if (rowIndex == 0) return [1];
    
    const result = [1];
    const pre_row = getRow(rowIndex-1);
    for (let i = 1; i < rowIndex; i++) {
        result.push(pre_row[i-1] + pre_row[i]);
    }
    result.push(1);
    
    return result;
};
