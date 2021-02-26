var FreqStack = function() {
    this.map_val_freq = new Map()
    this.map_freq_val = new Map()
    this.max_freq = 0
};

/** 
 * @param {number} x
 * @return {void}
 */
FreqStack.prototype.push = function(x) {
    const cur_freq = this.map_val_freq.has(x) ? this.map_val_freq.get(x) : 0;
    
    if (this.map_freq_val.has(cur_freq + 1)) {
        this.map_freq_val.get(cur_freq + 1).push(x);
    } else {
        this.map_freq_val.set(cur_freq + 1, [x]);
    }

    this.map_val_freq.set(x, cur_freq + 1);
    this.max_freq = Math.max(cur_freq + 1, this.max_freq);
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function() {
    const result = this.map_freq_val.get(this.max_freq).pop();
  
    this.map_val_freq.set(result, this.map_val_freq.get(result) - 1);
  
    if (this.map_freq_val.get(this.max_freq).length == 0) {
        this.max_freq -= 1;
    }
  
    return result;
};
