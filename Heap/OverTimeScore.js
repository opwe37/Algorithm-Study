function solution(n, works) {
    var answer = 0;

    var h = new heap();
    for (let work of works) {
      h.insert(work);
    }

    for (let i = 0; i < n; i++) {
        let val = h.pop_maxVal() - 1;
        if (val < 0) val = 0; 
        h.insert(val);
    }

    for (let t of h.memory) {
        answer += Math.pow(t, 2)
    }

    return answer;
}

class heap {
    constructor() {
        this.memory = [];
    }

    insert(val) {
        this.memory.push(val);

        let cur_idx = this.memory.length-1
          , parent_idx = Math.floor((cur_idx-1)/2);

        while (this.memory[parent_idx] < this.memory[cur_idx]) {
            [this.memory[cur_idx], this.memory[parent_idx]] = [this.memory[parent_idx], this.memory[cur_idx]];

            cur_idx = parent_idx;
            parent_idx = Math.floor((cur_idx-1)/2);
        }
    }

    pop_maxVal() {
        let last_idx = this.memory.length - 1;

        var tmp = this.memory[0];
        this.memory[0] = this.memory[last_idx];
        this.memory[last_idx] = tmp;

        let returnVal = this.memory.pop();

        let cur_idx = 0;

        while (cur_idx < last_idx) {
            let left_child = (cur_idx * 2)+1
              , right_child = (cur_idx * 2)+2;
            
            if (left_child >= last_idx) break;
            else if (right_child >= last_idx) {
                if (this.memory[left_child] > this.memory[cur_idx]) {
                    [this.memory[cur_idx], this.memory[left_child]] = [this.memory[left_child], this.memory[cur_idx]];

                    cur_idx = left_child;
                } else {
                    break;
                }
            } else {
                let large = this.memory[left_child] > this.memory[right_child] ? left_child : right_child;

                if (this.memory[large] > this.memory[cur_idx]) {
                    [this.memory[large], this.memory[cur_idx]] = [this.memory[large], this.memory[cur_idx]];

                    cur_idx = large;
                } else {
                    break;
                }
            }
        }
        return returnVal;
    }
}
