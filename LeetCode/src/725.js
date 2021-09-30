var splitListToParts = function(head, k) {
	const answer = [];
    
    const N = getListLength(head);
    
    const q = Math.floor(N / k);
    const r = N % k;
    
    for (let i = 0; i < k; i++) {
        let len = i < r ? q + 1 : q;
        
        let cur = head;
        let pre = head;
        for (let j = 0; j < len && cur != null; j++) {
        	pre = cur;
            cur = cur.next;
        }
        if (pre != null) { pre.next = null; }
        
        answer.push(head);
        head = cur;
    }
    
    return answer;
}

function getListLength(head) {
    let len = 0;
    
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
    	slow = slow.next;
        fast = fast.next.next;
    	len += 1;
    }
    len = 2 * len;
    if (fast) { len += 1; }
    
    return len;
}
