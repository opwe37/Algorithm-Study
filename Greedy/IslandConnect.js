// Using Kruskal's Algorithm
function solution(n, costs) {
    var answer = 0;
    
    costs.sort((a, b) => a[2] - b[2]);
    var arr = new A(n);
    costs.forEach(val => {
        if (arr.find(val[0]) == arr.find(val[1])) return;
        arr.merge(val[0], val[1]);
        answer += val[2];
    });

    console.log(arr.root)
    
    return answer;
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
