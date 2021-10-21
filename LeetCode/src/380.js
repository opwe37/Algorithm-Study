var RandomizedSet = function() {
    this.arr = []
    this.table = new Map();
    this.lastIndex = 0;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.table.has(val)) { return false; }
    
    if (this.lastIndex == this.arr.length) {
        this.arr.push(val);
    } else {
        this.arr[this.lastIndex] = val;
    }
    
    this.table.set(val, this.lastIndex);
    this.lastIndex = this.table.size;
    
    return true;
};

/** 
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.table.has(val)) { return false; }
    
    const idx = this.table.get(val);
    
    if (this.table.size) {
        this.table.set(this.arr[this.lastIndex-1], idx);
        [this.arr[idx], this.arr[this.lastIndex-1]] = [this.arr[this.lastIndex-1], this.arr[idx]];
    }
    
    this.table.delete(val);
    this.lastIndex = this.table.size;
    
    return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    const randIdx = Math.floor(Math.random() * this.table.size);
    return this.arr[randIdx];
};

/** 
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
