
var RandomizedSet = function() {
    this.arr = []
    this.table = new Set();
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.table.has(val)) { return false; }
    
    this.arr.push(val);
    this.table.add(val);
    
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.table.has(val)) { return false; }
    
    this.table.delete(val);
    this.arr = Array.from(this.table);
    
    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const randIdx = Math.floor(Math.random() * this.arr.length);
    
    return this.arr[randIdx];
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
