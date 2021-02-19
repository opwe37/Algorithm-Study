/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
 
var matrixRankTransform = function(matrix) {
    const m = matrix.length, 
          n = matrix[0].length;
    const values_site = new Map();
    matrix.forEach((row, i) => row.forEach((value, j) => {
        if (values_site.has(value)) {
            values_site.get(value).push({row: i, col: j});
        } else {
            values_site.set(value, [{row: i, col: j}]);
        }
    }));
    const sorted_keys = Array.from(values_site.keys()).sort((a, b) => a - b);
    
    const ranks = Array(m).fill(0).map(val => Array(n).fill(0));
    
    const max_rank_by_row = Array(m).fill(0),
          max_rank_by_col = Array(n).fill(0);
    for(let val of sorted_keys) {
        const same_val_sites = values_site.get(val);
        
        const ds = Array(m + n).fill(0).map(_ => -1);
        same_val_sites.forEach((site, i) => {
            const pi = find(ds, site.row),
                  pj = find(ds, m + site.col);
            if (pi != pj) {
                ds[pi] = Math.min(ds[pi], ds[pj], -Math.max(max_rank_by_row[site.row], max_rank_by_col[site.col])-1);
                ds[pj] = pi;
            }
        });
        
        same_val_sites.forEach(site => {
            ranks[site.row][site.col] = -ds[find(ds, site.row)];
            max_rank_by_row[site.row] = ranks[site.row][site.col];
            max_rank_by_col[site.col] = ranks[site.row][site.col];
        })
    }
    
    return ranks;
};

function find(arr, i) {
    return arr[i] < 0 ? i : arr[i] = find(arr, arr[i]);
}
