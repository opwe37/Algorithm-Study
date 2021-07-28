function solution(n, k, cmd) {
    var answer = '';
    
    const nodes = {0: [null, 1]};
    for (let i = 1; i < n; i++) {
        if (i == n-1) { nodes[i] = [i-1, null]; }
        else { nodes[i] = [i-1, i+1]; }
    }
    const deleteStack = [];
    
    let cursor = k;
    cmd.forEach(c => {
        if (c[0] == 'D') {
            let x = Number(c.slice(2));
            while (x > 0 && nodes[cursor][1] != null) {
                cursor = nodes[cursor][1];
                x -= 1;
            }
        } else if (c[0] == 'U') {
            let x = Number(c.slice(2));
            while (x > 0 && nodes[cursor][0] != null) {
                cursor = nodes[cursor][0];
                x -= 1;
            }
        } else if (c[0] == 'C') {
            const next = nodes[cursor][1];
            const prev = nodes[cursor][0];
            
            if (prev != null) {
                nodes[prev][1] = next;
            }
            if (next != null) {
                nodes[next][0] = prev;
            }
            
            deleteStack.push([cursor, nodes[cursor]]);
            nodes[cursor] = null;
            
            cursor = next == null ? prev : next;
        } else {
            const [element, node] = deleteStack.pop();
            const [preNode, nextNode] = node;
            
            nodes[element] = node;
            if (preNode != null) {
                nodes[preNode][1] = element;
            }
            if (nextNode != null) {
                nodes[nextNode][0] = element;
            }
        }
    });
    
    for (let i = 0; i < n; i++) {
        if (nodes[i] == null) { answer += 'X' }
        else { answer += 'O' }
    }
    
    return answer;
}
