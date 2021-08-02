var largestIsland = function(grid) {
    const N = grid.length;
    const uf = new UnionFind(N);
    
    const zeroPoint = [];
    
    const m = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            
            if (grid[r][c] == 0) { 
                zeroPoint.push([r, c]);
                continue; 
            }
            const id = r * N + c;
            
            for (let i = 0; i < 2; i++) {
                const adjRow = r + m[i][0];
                const adjCol = c + m[i][1];
                if (adjRow >= N || adjCol >= N || grid[adjRow][adjCol] == 0) { continue; }
                
                const adjCellId = adjRow * N + adjCol;
                
                uf.union(id, adjCellId);
            }
        }
    }
    
    let ans = Math.max(...uf.sz);
    
    for (let [r, c] of zeroPoint) {
        let tmpIslandSize = 1;
        
        const roots = new Set();
        for (let i = 0; i < 4; i++) {
            const adjRow = r + m[i][0];
            const adjCol = c + m[i][1];
            
            if (adjRow < 0 || adjRow >= N || adjCol < 0 || adjCol >= N) { continue; }
            if (grid[adjRow][adjCol] == 0) { continue; }
            
            roots.add(uf.root(adjRow*N + adjCol));
        }
        
        for (let root of roots) {
            tmpIslandSize += uf.sz[root];
        }
        
        ans = Math.max(tmpIslandSize, ans);
    }

    return ans;
};

class UnionFind{
    constructor(n) {
        this.id = new Array(n*n).fill(0).map((val, idx) => idx);
        this.sz = new Array(n*n).fill(1);
    }
    
    root(i) {
        while (this.id[i] != i) { 
            this.id[i] = this.id[this.id[i]];
            i = this.id[i]; 
        }
        return i;
    }
    
    connected(p, q) {
        return this.root(p) == this.root(q);
    }

    union(p, q) {
        const i = this.root(p);
        const j = this.root(q);
        
        if (i == j) return;
        
        if (this.sz[i] > this.sz[j]) { 
            this.id[j] = i; 
            this.sz[i] += this.sz[j];
        }
        else {
            this.id[i] = j; 
            this.sz[j] += this.sz[i]; 
        }
    }
}
