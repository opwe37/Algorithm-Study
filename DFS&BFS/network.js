// Approach 1. BFS
function solution(n, computers) {
    var answer = 0;
    
    var computer = new Map();
    for (let i = 0; i < n; i++) {computer.set(i, i)}

    var queue = [];
    for (let i = 0; i < n; i++) {
      if (!computer.has(i)) continue;

      queue.push(computer.get(i));
      computer.delete(i);
      while (queue.length != 0) {
        let tmp = queue.shift();
        for (let j = 0; j < n; j++) {
          if (computers[tmp][j] == 0) continue;

          if (computer.has(j)) {queue.push(computer.get(j)); computer.delete(j)}
        }
      }
      answer++;
    }
    return answer;
}

// Other Approach. Disjoin-Set / Unoin-Find
function solution(n, computers) {
    var answer = 0;
    var network = [];
    for (let i = 0; i < n; i++) {
      for (let j = i+1; j < n; j++) {
        if (computers[i][j] == 1) network.push([i, j]);
      }
    }

    var uion = new A(n);
    network.some(val => {
      if (uion.find(val[0]) == uion.find(val[1])) return false;
      uion.merge(val[0], val[1]);
    });
    for (let i = 0; i < n; i++) {uion.find(i)}

    var map = new Set(uion.root);

    return answer = map.size;
}

class A {
  constructor(n) {
    this.root = new Array(n).fill(0);
    this.root.forEach((val, i) => this.root[i] = i);
  }

  find(n) {
    if (this.root[n] == n) return n;
    return this.root[n] = this.find(this.root[n]);
  }
  merge(a, b) {
    this.root[this.find(a)] = this.root[b];
  }
}
