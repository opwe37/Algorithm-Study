// ========================= Sort ===========================

var MedianFinder = function() {
    this.list = [];
    this.len = 0;
};

MedianFinder.prototype.addNum = function(num) {
    this.list.push(num);
    this.len += 1;
};

MedianFinder.prototype.findMedian = function() {
    let median = null;
    
    this.list.sort((a, b) => a - b);
    
    const half = Math.floor(this.len / 2);
    if (this.len % 2) {
        median = this.list[half];
    } else {
        median = (this.list[half] + this.list[half-1]) / 2;
    }
    
    return median
};


// ========================= Min/Max-Heap ===========================

var MedianFinder_heap = function() {
    this.maxHeap = [];
    this.minHeap = [];
};

MedianFinder.prototype.addNum = function(num) {
    heapPush(this.maxHeap, num);
    heapPush(this.minHeap, -heapPop(this.maxHeap));
    
    if (this.maxHeap.length < this.minHeap.length) {
        heapPush(this.maxHeap, -heapPop(this.minHeap));
    }
};


MedianFinder_heap.prototype.findMedian = function() {
    if (this.maxHeap.length == this.minHeap.length) {
        return (this.maxHeap[0] - this.minHeap[0]) / 2;
    } else {
        return this.maxHeap[0];
    }
};

var heapPush = function(arr, num, compareTo) {
    arr.push(num);
    let curIdx = arr.length-1,
        parentIdx = Math.floor((curIdx-1)/2);
    while (curIdx > 0) {
        if (arr[parentIdx] > arr[curIdx]) { break; }
        
        [arr[curIdx], arr[parentIdx]] = [arr[parentIdx], arr[curIdx]];
        curIdx = parentIdx;
        parentIdx = Math.floor((curIdx-1)/2);
    }
}

var heapPop = function(arr, compareTo) {
    if (arr.length == 1) { return arr.pop(); }
    
    const n = arr.length;
    [arr[0], arr[n-1]] = [arr[n-1], arr[0]];
    const removed = arr.pop();
    
    let curIdx = 0,
        childIdx = 2*curIdx + 1;
    while (childIdx < arr.length) {
        if (childIdx + 1 < arr.length && arr[childIdx+1] > arr[childIdx]) {
            childIdx += 1;
        }
        
        if (arr[curIdx] > arr[childIdx]) { break; }
        [arr[curIdx], arr[childIdx]] = [arr[childIdx], arr[curIdx]];
        curIdx = childIdx;
        childIdx = 2*curIdx + 1;
    }
    
    return removed;
}
