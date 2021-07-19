// ============================ Step by Step ============================
var reverseKGroup = function(head, k) {
    const splitList = [];
    let cur = head;
    let h = cur;
    
    while (cur != null) {
        let tail = cur;
    	for (let i = 0; i < k; i++) {
        	if (cur == null) { break; }
            cur = cur.next;
            if (i < k-1) { tail = cur; }
        }
        if (tail) tail.next = null;
        splitList.push(h);
        h = cur;
    }
    
    // 분해된 리스트 중, 마지막 리스트의 길이 체크
    let lastListSize = 0;
    let lastListCur = splitList[splitList.length - 1];
    while (lastListCur != null) {
    	lastListCur = lastListCur.next;
        lastListSize += 1;
    }
    
    // 분해된 연결 리스트를 역순으로 정렬
    const heads = [];
    const tails = [];
    for (let i = 0; i < splitList.length; i++) {
    	if (i == splitList.length-1 && lastListSize < k) { 
            heads.push(splitList[i])
            break; 
        }
    	[heads[i], tails[i]] = reverseList(splitList[i]);
    }
    
    // 하나의 연결 리스트로 병합
    let ans = heads[0];
    for (let i = 1; i < heads.length; i++) {
        tails[i-1].next = heads[i];
    }
    return ans;
};

var reverseList = function(head) {
	let reversedList = null;
    let tail = head;
    let cur = head;
    while (cur != null) {
    	const next = cur.next;
        cur.next = reversedList;
        reversedList = cur;
        cur = next;
    }
    return [reversedList, tail];
}



// ============================ One While  ============================
var reverseKGroup_ = function(head, k) {
    let N = 0;
    let cur = head;
    while (cur != null) { N += 1; cur = cur.next; }
    
    let ans = null;
    
    cur = head;
    let ans_tail = cur;
    let numOfGroup = Math.floor(N / k);
    while(numOfGroup > 0) {
        let tmp_list = null;
        let tmp_tail = cur;
        for (let i = 0; i < k; i++) {
            const next = cur.next;
            
            cur.next = tmp_list;
            tmp_list = cur;
            cur = next;
        }
        
        if (numOfGroup == Math.floor(N / k)) {
            ans = tmp_list;
        } else {
            ans_tail.next = tmp_list;
            ans_tail = tmp_tail;
        }
        
        numOfGroup -= 1;
    }
    if (cur != null) { ans_tail.next = cur; }
    
    return ans;
};
