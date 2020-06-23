// Approach 1. Disjoin-Set / Unoin-Find
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
