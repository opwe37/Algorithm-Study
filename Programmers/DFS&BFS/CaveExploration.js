function solution(n, path, order) {
    var answer = false;

    var constraint = new Map();
    order.forEach(val => {
        constraint.set(val[1], val[0]);
    });

    var cave = new Array(n).fill(0).map(val => new Array());
    path.forEach(val => {
        cave[val[0]].push(val[1]);
        cave[val[1]].push(val[0]);
    });

    var visited = new Array(n).fill(false);
    var queue = new Queue();

    var un_entered = new Array(n).fill(-1);

    queue.enqueue(new node(0));

    while(queue.head != null) {
        let po = queue.dequeue().value;
        if (constraint.has(po) && visited[constraint.get(po)] == false) {
            un_entered[constraint.get(po)] = po;
            continue;
        }
        if (visited[po]) continue;

        visited[po] = true;
        if (un_entered[po] != -1) queue.enqueue(new node(un_entered[po]));
        if (cave[po].length != 0) {
            cave[po].forEach(val => queue.enqueue(new node(val)));
        }
    }

    if (visited.every(val => val == true)) answer = true;
    
    return answer;
}

class node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }

    setNext(n) {
        this.next = n;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    enqueue(node) {
        if (this.head == null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
    }

    dequeue() {
        if (this.head == null) return -1;

        let returnNode = this.head;
        if (this.head != this.tail) this.head = this.head.next;
        else {
            this.head = null;
            this.tail = null;
        }
        return returnNode;
    }
}
