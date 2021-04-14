var middleNode = function(head) {
    let node = head;
	const arr = [];
	while (node != null) {
		arr.push(node);
		node = node.next;
	}
	return arr[Math.floor(arr.length / 2)];
};
