function solution(n, edge) {
  var answer = 0;
  var edges = Array(n).fill(0).map(x => new Array(n).fill(0));
  for (let [row, column] of edge) {
    edges[row-1][column-1] = 1;
    edges[column-1][row-1] = 1;
  }

  var isVisit = new Array(n).fill(false);
  var possibleNode = [0];
  isVisit[0] = true;
  
  while (possibleNode.length != 0) {
    let loop = possibleNode.length;
    for (let i = 0; i < loop; i++) {
      let node = possibleNode.shift();
      for (let col = 0; col < n; col++) {
        if (edges[node][col] == 0 || isVisit[col]) continue;

        possibleNode.push(col);
        isVisit[col] = true;
      }
    }
    answer = loop;
  }

  return answer;
}
