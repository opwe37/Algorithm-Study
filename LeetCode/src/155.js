/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = [];
    this.size = 0;
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    if (this.size == 0) {
        this.stack.push({val: val, min: val});
    } else {
        const min = this.stack[this.size-1].min > val ? val : this.stack[this.size-1].min;
        this.stack.push({val: val, min: min})
    }
    
    this.size += 1;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop();
    this.size -= 1;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.size-1].val;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.stack[this.size-1].min;
};
