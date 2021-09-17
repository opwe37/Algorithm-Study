var spiralOrder = function(matrix) {
    let answer = [];
    
    const N = matrix.length;
    const M = matrix[0].length;
    
    let startRow = 0,
        endRow = N - 1,
        startCol = 0,
        endCol = M -1;
    while (startRow <= endRow && startCol <= endCol) {
        const outline = searchOutline(matrix, startRow, endRow, startCol, endCol);

        answer = answer.concat(outline.slice());
        
        startRow += 1;
        endRow -= 1;
        startCol += 1;
        endCol -= 1;
    }
    
    return answer;
};

var searchOutline = function(matrix, startRow, endRow, startCol, endCol) {
	let result = [];
    
    // 상단 탐색
	for (let col = startCol; col <= endCol; col++) {
    	result.push(matrix[startRow][col]);
    }
    
    // 우측 탐색
    for (let row = startRow+1; row <= endRow; row++) {
        result.push(matrix[row][endCol]);
    }   
    
    // 하단 탐색
    if (endRow > startRow) {
      for (let col = endCol-1; col >= startCol; col--) {
          result.push(matrix[endRow][col]);
      }
    }
    
    // 좌측 탐색
    if (endCol > startCol) {
    	for (let row = endRow-1; row > startRow; row--) {
          result.push(matrix[row][startCol]);
      }
    }
    
    return result;
}
