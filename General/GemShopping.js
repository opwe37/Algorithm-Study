function solution(gems) {
    var answer = Infinity;

    const kind = new Set(gems);
    if (kind.size == 1) return [1, 1]
    
    var numOfEachGemInSlider = new Map();
    var slider = new linkedList();

    var start = 0;
    var tmp_start = 0;

    for (let gem of gems) {
        if (numOfEachGemInSlider.has(gem))
            numOfEachGemInSlider.set(gem, numOfEachGemInSlider.get(gem)+1);
        else
            numOfEachGemInSlider.set(gem, 1);

        slider.addToTail(gem);

        while(true) {
            let f = slider.getHead();
            if (numOfEachGemInSlider.get(f) > 1) {
                numOfEachGemInSlider.set(f, numOfEachGemInSlider.get(f)-1);
                slider.removeHead();
                tmp_start += 1;
            } else {
                break;
            }
        }
        if (kind.size == numOfEachGemInSlider.size && slider.size < answer) {
            answer = slider.size;
            start = tmp_start;
        }
    }

    return answer = [start+1, start+answer];
}

class node {
    constructor(gem) {
        this.gem = gem;
        this.next = null;
    }
}

class linkedList {
    constructor(node) {
        this.list = {};
        this.size = 0;
        this.list.head = null;
        this.list.tail = null;
    }

    addToTail(val) {
        var newNode = new node(val);
        if (!this.list.head) {
            this.list.head = newNode;
            this.list.tail = newNode;
        } else {
            this.list.tail.next = newNode;
            this.list.tail = newNode;
        }
        this.size++;
    }

    removeHead() {
        let updateHead = this.list.head.next;
        this.list.head = updateHead;
        this.size--;
    }

    getHead() {
        return this.list.head.gem;
    }
}
